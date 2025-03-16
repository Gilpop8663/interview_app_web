import { GET_PAYMENT_DETAIL } from "@/gql/query/payment";
import { Payment } from "@/types/payment";
import { useSuspenseQuery } from "@apollo/client";

interface PaymentDetailResult {
  getPaymentDetail: {
    ok: boolean;
    error: null | string;
    payment: Payment;
  };
}

export const usePaymentDetail = (input: { paymentId: number }) => {
  const { data } = useSuspenseQuery<PaymentDetailResult>(GET_PAYMENT_DETAIL, {
    variables: { input },
    fetchPolicy: "cache-first",
  });

  return { payment: data.getPaymentDetail.payment };
};
