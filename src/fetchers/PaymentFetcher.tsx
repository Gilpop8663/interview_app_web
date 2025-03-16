import Layout from '@/components/Layout';
import PricingComparison from '@/components/PricingComparison';
import { useMyProfile } from '@/hooks/query/useMyProfile';
import { ChangeEvent, FormEvent, useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import { useCreatePayment } from '@/hooks/mutation/payment/useCreatePayment';
import { useCreateOrder } from '@/hooks/mutation/order/useCreateOrder';
import { useProductDetail } from '@/hooks/query/product/useProductDetail';
import { useCompletePayment } from '@/hooks/mutation/payment/useCompletePayment';
import { useUpdateSubscriptionType } from '@/hooks/mutation/user/useUpdateSubscriptionType';
import { useUpdatePaymentStatus } from '@/hooks/mutation/payment/useUpdatePaymentStatus';
import { showToast } from '@/lib/toast';
import { useTranslation } from 'react-i18next';
import usePriceFormatter from '@/hooks/usePriceFormatter';
import PaypalButton from '@/components/PaypalButton';

export default function PaymentFetcher() {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'MONTHLY' | 'YEARLY'>(
    'MONTHLY'
  );
  const { currentLanguage, formatPrice } = usePriceFormatter();
  const isKorean = currentLanguage === 'ko';

  const MONTHLY_PRODUCT_ID = isKorean
    ? process.env.VITE_PREMIUM_MONTHLY_PRODUCT_ID
    : process.env.VITE_PREMIUM_DOLLAR_MONTHLY_PRODUCT_ID;

  const YEARLY_PRODUCT_ID = isKorean
    ? process.env.VITE_PREMIUM_YEARLY_PRODUCT_ID
    : process.env.VITE_PREMIUM_DOLLAR_YEARLY_PRODUCT_ID;

  const { handleCreatePayment } = useCreatePayment();
  const { handleCreateOrder } = useCreateOrder();
  const monthlyProductId = Number(MONTHLY_PRODUCT_ID) || 1;
  const yearlyProductId = Number(YEARLY_PRODUCT_ID) || 2;

  const { product: monthlyProduct } = useProductDetail({
    productId: monthlyProductId,
  });
  const { product: yearlyProduct } = useProductDetail({
    productId: yearlyProductId,
  });

  const { handleCompletePayment } = useCompletePayment();
  const { updateSubscriptionType } = useUpdateSubscriptionType();
  const { handleUpdatePaymentStatus } = useUpdatePaymentStatus();

  const monthlyPrice = monthlyProduct.price; // 월간 가격
  const yearlyPrice = yearlyProduct.price;
  const selectedProduct =
    selectedPlan === 'MONTHLY' ? monthlyProduct : yearlyProduct;
  const selectedPrice = selectedProduct.price;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const input = value.replace(/[^0-9]/g, '');

    let formattedNumber = '';
    if (input.length > 0) {
      formattedNumber += input.slice(0, 3);
    }
    if (input.length >= 4) {
      formattedNumber += '-' + input.slice(3, 7);
    }
    if (input.length >= 8) {
      formattedNumber += '-' + input.slice(7, 11);
    }

    setPhoneNumber(formattedNumber);
  };

  const { user } = useMyProfile();

  const handlePaymentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsProcessing(true);
    const orderResult = await handleCreateOrder({
      productId: selectedProduct.id,
      totalAmount: selectedProduct.price,
      currency: 'KRW',
    });

    const orderId = orderResult.data?.createOrder.orderId;

    if (!orderId) {
      showToast(t('payment.orderFailed'), 'error');
      setIsProcessing(false);
      return;
    }

    const paymentResult = await handleCreatePayment({
      orderId,
      amount: selectedPrice,
      currency: 'KRW',
    });

    const paymentId = paymentResult.data?.createPayment.paymentId;

    if (!paymentId) {
      showToast(t('payment.paymentFailed'), 'error');
      setIsProcessing(false);
      return;
    }

    const response = await PortOne.requestPayment({
      storeId: process.env.VITE_PORT_STORE_ID || '',
      channelKey: process.env.VITE_PORT_CHANNEL_KEY || '',
      paymentId: `${paymentId}`,
      orderName: selectedProduct.name,
      totalAmount: selectedPrice,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      customer: {
        email: user.email,
        phoneNumber: phoneNumber,
      },
    });

    const transactionId = response?.txId;

    if (!transactionId) {
      setIsProcessing(false);
      showToast(response?.message || t('payment.paymentFailed'), 'error');
      return;
    }

    if (response && response.code) {
      setIsProcessing(false);
      handleUpdatePaymentStatus({ paymentId, status: 'FAILED', transactionId });
      return;
    }

    const result = await handleCompletePayment({
      orderId,
      paymentId,
      transactionId,
    });

    if (result.data?.completePayment.ok) {
      updateSubscriptionType({
        subscriptionType: 'PREMIUM',
        subscriptionPeriod: selectedPlan,
      });
      return;
    }

    setIsProcessing(false);
  };

  return (
    <Layout>
      <PricingComparison
        isLoggedIn
        monthlyPrice={monthlyPrice}
        yearlyPrice={yearlyPrice}
      />

      <div className="container mx-auto px-4 py-8">
        {isKorean ? (
          <form
            onSubmit={handlePaymentSubmit}
            className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 border"
          >
            <h2 className="text-xl font-semibold mb-4">
              {t('payment.paymentInfo')}
            </h2>

            {/* 결제 옵션 선택 */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setSelectedPlan('MONTHLY')}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  selectedPlan === 'MONTHLY'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                월간 결제
                <p className="text-sm mt-1">{formatPrice(monthlyPrice)}</p>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('YEARLY')}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  selectedPlan === 'YEARLY'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                연간 결제
                <p className="text-sm mt-1">{formatPrice(yearlyPrice)}</p>
              </button>
            </div>

            {/* 휴대폰 번호 입력 */}
            <div className="mb-4 w-full">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h1 className="text-xl font-bold mb-2 w-56 ">
                  {t('payment.enterPhoneNumber')}
                </h1>
                <span className="text-xs mb-4">
                  {t('payment.phoneNumberInfo')}
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                  className="border border-gray-300 p-2 rounded-lg w-full mt-4"
                  minLength={13}
                  maxLength={13}
                  required
                />
              </div>
            </div>

            {/* 결제 버튼 */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? t('payment.processing') : t('payment.payButton')}
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-4">
              {t('payment.paymentInfo')}
            </h2>
            <p className="mb-4">{t('payment.lifetimePremium')}</p>

            <PaypalButton />
          </div>
        )}
      </div>
    </Layout>
  );
}
