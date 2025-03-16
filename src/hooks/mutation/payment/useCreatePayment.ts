import { CREATE_PAYMENT } from "@/gql/mutation/payment";
import { CurrencyStatus } from "@/types/payment";
import { useMutation } from "@apollo/client";

interface CreatePaymentInput {
  orderId: number;
  amount: number;
  transactionId?: string;
  currency: CurrencyStatus;
}

interface Result {
  createPayment: {
    ok: boolean;
    error: null | string;
    paymentId: number;
  };
}

export const useCreatePayment = () => {
  const [createPaymentMutation] = useMutation<Result>(CREATE_PAYMENT);

  const handleCreatePayment = async (input: CreatePaymentInput) => {
    const result = createPaymentMutation({
      variables: { input },
    });

    return result;
  };

  return { handleCreatePayment };
};
