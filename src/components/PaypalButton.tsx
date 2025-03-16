import { useEffect, useRef, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useProductDetail } from '@/hooks/query/product/useProductDetail';
import { showToast } from '@/lib/toast';
import { useTranslation } from 'react-i18next';
import { useCreatePaypalOrder } from '@/hooks/mutation/order/useCreatePaypalOrder';
import { useCapturePaypalOrder } from '@/hooks/mutation/order/useCapturePaypalOrder';
import { useCreatePayment } from '@/hooks/mutation/payment/useCreatePayment';
import { useUpdateSubscriptionType } from '@/hooks/mutation/user/useUpdateSubscriptionType';
import { useUpdatePaymentStatus } from '@/hooks/mutation/payment/useUpdatePaymentStatus';
import { useUpdateOrderStatus } from '@/hooks/mutation/order/useUpdateOrderStatus';
import usePriceFormatter from '@/hooks/usePriceFormatter';

function PaypalButton() {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [paypalKey, setPaypalKey] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<'MONTHLY' | 'YEARLY'>(
    'MONTHLY'
  );
  const { handleCreatePaypalOrder } = useCreatePaypalOrder();
  const { handleCapturePaypalOrder } = useCapturePaypalOrder();
  const { handleCreatePayment } = useCreatePayment();
  const { updateSubscriptionType } = useUpdateSubscriptionType();
  const { handleUpdatePaymentStatus } = useUpdatePaymentStatus();
  const { handleUpdateOrderStatus } = useUpdateOrderStatus();
  const { formatPrice } = usePriceFormatter();

  const monthlyProductId =
    Number(process.env.VITE_PREMIUM_DOLLAR_MONTHLY_PRODUCT_ID) || 1;
  const yearlyProductId =
    Number(process.env.VITE_PREMIUM_DOLLAR_YEARLY_PRODUCT_ID) || 2;

  const { product: monthlyProduct } = useProductDetail({
    productId: monthlyProductId,
  });
  const { product: yearlyProduct } = useProductDetail({
    productId: yearlyProductId,
  });

  const selectedProduct =
    selectedPlan === 'MONTHLY' ? monthlyProduct : yearlyProduct;
  const selectedPrice = selectedProduct.price;

  const monthlyPriceUSD = monthlyProduct.price;
  const yearlyPriceUSD = yearlyProduct.price;

  // 상태 변수 추가
  const orderIdRef = useRef<number | null>(null);
  const paymentIdRef = useRef<number | null>(null);

  const initialOptions = {
    clientId: process.env.VITE_PAYPAL_CLIENT_ID,
    enableFunding: 'venmo',
    disableFunding: '',
    buyerCountry: 'US',
    currency: 'USD',
    dataPageType: 'product-details',
    components: 'buttons',
    dataSdkIntegrationSource: 'developer-studio',
  };

  const handlePaymentSubmit = async () => {
    try {
      const orderResult = await handleCreatePaypalOrder({
        productId: selectedProduct.id, // 선택된 상품 ID 사용
        totalAmount: selectedPrice, // 선택된 가격 사용
        currency: 'USD',
      });

      const data = orderResult.data?.createPaypalOrder;

      const paypalOrderId = data?.orderData.id;
      const orderId = data?.orderId;

      if (!paypalOrderId || !orderId) {
        throw Error('결제 실패');
      }

      const paymentResult = await handleCreatePayment({
        orderId,
        amount: selectedPrice,
        currency: 'USD',
        transactionId: paypalOrderId,
      });

      const paymentId = paymentResult.data?.createPayment.paymentId;

      if (!paymentId) {
        showToast(t('payment.paymentFailed'), 'error');
        return '0';
      }

      orderIdRef.current = orderId;
      paymentIdRef.current = paymentId;

      return paypalOrderId;
    } catch (error) {
      console.error(error);
      showToast(t('payment.orderFailed'), 'error');
      return '0';
    }
  };

  const handleApprove = async (data: { orderID: string }) => {
    try {
      const result = await handleCapturePaypalOrder({
        orderId: data.orderID,
      });

      const orderData = result.data?.capturePaypalOrder.orderData;

      if (!orderData) {
        throw new Error('결제 실패');
      }

      const transactionId = orderData.id;

      if (!paymentIdRef.current || !orderIdRef.current) return;

      handleUpdateOrderStatus({
        orderId: orderIdRef.current,
        status: 'COMPLETED',
      });
      handleUpdatePaymentStatus({
        paymentId: paymentIdRef.current,
        status: 'COMPLETED',
        transactionId,
      });

      // 선택된 옵션에 따라 구독 기간 설정
      updateSubscriptionType({
        subscriptionType: 'PREMIUM',
        subscriptionPeriod: selectedPlan, // "MONTHLY" 또는 "YEARLY"
      });
    } catch (error) {
      console.error(error);
      showToast(t('payment.paymentFailed'), 'error');

      if (!paymentIdRef.current) return;

      handleUpdatePaymentStatus({
        paymentId: paymentIdRef.current,
        status: 'FAILED',
        transactionId: '',
      });
      return;
    }
  };

  useEffect(() => {
    setPaypalKey((prevKey) => prevKey + 1); // 키를 변경하여 버튼 강제 재렌더링
  }, [selectedPlan, selectedProduct, selectedPrice]);

  return (
    <div>
      <p className="text-2xl font-bold mb-6">{formatPrice(selectedPrice)}</p>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedPlan('MONTHLY')}
          className={`flex-1 py-2 px-4 rounded-lg border ${
            selectedPlan === 'MONTHLY'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700'
          }`}
        >
          {t('payment.monthlyPlan')} {/* "Monthly Plan" */}
          <p className="text-sm mt-1">${monthlyPriceUSD}/month</p>{' '}
          {/* 99.99 USD */}
        </button>
        <button
          onClick={() => setSelectedPlan('YEARLY')}
          className={`flex-1 py-2 px-4 rounded-lg border ${
            selectedPlan === 'YEARLY'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700'
          }`}
        >
          {t('payment.yearlyPlan')} {/* "Annual Plan" */}
          <p className="text-sm mt-1">${yearlyPriceUSD}/year</p>{' '}
          {/* 899.99 USD */}
          <p
            className={`text-xs  mt-1 ${
              selectedPlan === 'YEARLY' ? 'text-white' : 'text-green-600'
            }`}
          >
            {t('payment.saveMessage')}
          </p>{' '}
          {/* "Save $300 with annual billing!" */}
        </button>
      </div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          key={paypalKey}
          style={{
            shape: 'rect',
            layout: 'vertical',
            color: 'gold',
            label: 'paypal',
          }}
          createOrder={handlePaymentSubmit}
          onApprove={handleApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PaypalButton;
