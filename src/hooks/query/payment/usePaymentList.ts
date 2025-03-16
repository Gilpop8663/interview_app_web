import { GET_PAYMENT_LIST } from "@/gql/query/payment";
import { Payment } from "@/types/payment";
import { useSuspenseQuery } from "@apollo/client";

interface PaymentListResult {
  getPaymentList: {
    ok: boolean;
    error: null | string;
    paymentList: Payment[];
  };
}

export const usePaymentList = () => {
  const { data } = useSuspenseQuery<PaymentListResult>(GET_PAYMENT_LIST, {
    fetchPolicy: "cache-first",
  });

  return { payments: data.getPaymentList.paymentList };
};
