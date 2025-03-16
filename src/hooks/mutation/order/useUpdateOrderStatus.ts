import { UPDATE_ORDER_STATUS } from "@/gql/mutation/order";
import { OrderStatus } from "@/types/order";
import { useMutation } from "@apollo/client";

interface Props {
  orderId: number;
  status: OrderStatus;
}

interface Result {
  updateOrderStatus: {
    ok: boolean;
    error: null | string;
  };
}

export const useUpdateOrderStatus = () => {
  const [updateOrderStatusMutation] = useMutation<Result>(UPDATE_ORDER_STATUS);

  const handleUpdateOrderStatus = async (input: Props) => {
    const result = updateOrderStatusMutation({
      variables: { input },
    });

    return result;
  };

  return { handleUpdateOrderStatus };
};
