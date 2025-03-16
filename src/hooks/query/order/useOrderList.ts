import { useSuspenseQuery } from "@apollo/client";
import { GET_ORDER_LIST } from "@/gql/query/order";
import { Order } from "@/types/order";

interface OrderListResult {
  getOrderList: {
    ok: boolean;
    error: null | string;
    orderList: Order[];
  };
}

export const useOrderList = () => {
  const { data } = useSuspenseQuery<OrderListResult>(GET_ORDER_LIST, {
    fetchPolicy: "cache-first",
  });

  return { orders: data.getOrderList.orderList };
};
