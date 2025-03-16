import { GET_ORDER_DETAIL } from "@/gql/query/order";
import { Order } from "@/types/order";
import { useSuspenseQuery } from "@apollo/client";

interface OrderDetailResult {
  getOrderDetail: {
    ok: boolean;
    error: null | string;
    order: Order;
  };
}

export const useOrderDetail = (input: { orderId: number }) => {
  const { data } = useSuspenseQuery<OrderDetailResult>(GET_ORDER_DETAIL, {
    variables: { input },
    fetchPolicy: "cache-first",
  });

  return { order: data.getOrderDetail.order };
};
