import { CREATE_ORDER } from "@/gql/mutation/order";
import { CurrencyStatus } from "@/types/payment";
import { useMutation } from "@apollo/client";

interface Props {
  productId: number;
  totalAmount: number;
  currency: CurrencyStatus;
}

interface Result {
  createOrder: {
    ok: boolean;
    error: null | string;
    orderId: number;
  };
}

export const useCreateOrder = () => {
  const [createOrderMutation] = useMutation<Result>(CREATE_ORDER);

  const handleCreateOrder = async (input: Props) => {
    const result = createOrderMutation({
      variables: { input },
    });

    return result;
  };

  return { handleCreateOrder };
};
