import { CREATE_PAYPAL_ORDER } from "@/gql/mutation/order";
import { CurrencyStatus } from "@/types/payment";
import { useMutation } from "@apollo/client";

interface Props {
  productId: number;
  totalAmount: number;
  currency: CurrencyStatus;
}

interface Result {
  createPaypalOrder: {
    ok: boolean;
    error: null | string;
    orderData: PaypalOrderData;
    orderId: number;
  };
}

// Link 타입 인터페이스 정의
interface Link {
  href: string;
  rel: string;
  method: string;
}

// PaypalOrderData 타입 인터페이스 정의
interface PaypalOrderData {
  id: string;
  status: string;
  payment_source?: {
    paypal: object; // 구체적인 구조를 정의할 수 있습니다.
  };
  links: Link[];
}

export const useCreatePaypalOrder = () => {
  const [createOrderMutation] = useMutation<Result>(CREATE_PAYPAL_ORDER);

  const handleCreatePaypalOrder = async (input: Props) => {
    const result = createOrderMutation({
      variables: { input },
    });

    return result;
  };

  return { handleCreatePaypalOrder };
};
