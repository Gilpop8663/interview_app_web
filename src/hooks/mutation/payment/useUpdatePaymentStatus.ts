import { UPDATE_PAYMENT_STATUS } from "@/gql/mutation/payment";
import { PaymentStatus } from "@/types/payment";
import { useMutation } from "@apollo/client";

interface UpdatePaymentStatusInput {
  paymentId: number;
  status: PaymentStatus;
  transactionId: string;
}

interface Result {
  updatePaymentStatus: {
    ok: boolean;
    error: null | string;
  };
}

export const useUpdatePaymentStatus = () => {
  const [updatePaymentStatusMutation] = useMutation<Result>(
    UPDATE_PAYMENT_STATUS,
  );

  const handleUpdatePaymentStatus = async (input: UpdatePaymentStatusInput) => {
    const result = updatePaymentStatusMutation({
      variables: { input },
    });

    return result;
  };

  return { handleUpdatePaymentStatus };
};
