import { CAPTURE_PAYPAL_ORDER } from "@/gql/mutation/order";
import { useMutation } from "@apollo/client";

interface Props {
  orderId: string;
}

interface Result {
  capturePaypalOrder: {
    ok: boolean;
    error: null | string;
    orderData: PaypalOrderData;
  };
}

// Link 인터페이스 정의
interface Link {
  href: string;
  rel: string;
  method: string;
}

// Name 인터페이스 정의
interface Name {
  given_name: string;
  surname: string;
}

// Address 인터페이스 정의
interface Address {
  address_line_1: string;
  address_line_2?: string; // 선택적 필드
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

// Shipping 인터페이스 정의
interface Shipping {
  address: Address;
}

// Amount 인터페이스 정의
interface Amount {
  currency_code: string;
  value: string;
}

// SellerProtection 인터페이스 정의
interface SellerProtection {
  status: string;
  dispute_categories: string[];
}

// SellerReceivableBreakdown 인터페이스 정의
interface SellerReceivableBreakdown {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
}

// Capture 인터페이스 정의
interface Capture {
  id: string;
  status: string;
  amount: Amount;
  seller_protection: SellerProtection;
  final_capture: boolean;
  disbursement_mode: string;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  create_time: string;
  update_time: string;
  links: Link[];
}

// Payments 인터페이스 정의
interface Payments {
  captures: Capture[];
}

// PaymentSource 인터페이스 정의
interface PaymentSource {
  paypal: PaypalDetails;
}

// PaypalDetails 인터페이스 정의
interface PaypalDetails {
  name: Name;
  email_address: string;
  account_id: string;
}

// PurchaseUnit 인터페이스 정의
interface PurchaseUnit {
  reference_id: string;
  shipping: Shipping;
  payments: Payments;
}

// Payer 인터페이스 정의
interface Payer {
  name: Name;
  email_address: string;
  payer_id: string;
}

// PaypalOrderData 인터페이스 정의
interface PaypalOrderData {
  id: string;
  status: string;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  links: Link[];
}

export const useCapturePaypalOrder = () => {
  const [capturePaypalOrderMutation] =
    useMutation<Result>(CAPTURE_PAYPAL_ORDER);

  const handleCapturePaypalOrder = async (input: Props) => {
    const result = capturePaypalOrderMutation({
      variables: { input },
    });

    return result;
  };

  return { handleCapturePaypalOrder };
};
