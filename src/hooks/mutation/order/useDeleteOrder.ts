import { DELETE_ORDER } from "@/gql/mutation/order";
import { showPromiseToast } from "@/lib/toast";
import { useMutation } from "@apollo/client";

interface Props {
  orderId: number;
  status: string;
}

interface Result {
  deleteOrder: {
    ok: boolean;
    error: null | string;
  };
}

export const useDeleteOrder = () => {
  const [deleteOrderMutation] = useMutation<Result>(DELETE_ORDER);

  const handleDeleteOrder = async (input: Props) => {
    const result = deleteOrderMutation({
      variables: { input },
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.deleteOrder.ok) {
          throw new Error(
            res.data?.deleteOrder.error || "주문 삭제에 실패했습니다 😢",
          );
        }

        return res;
      }),
      {
        success: "주문 삭제에 성공했습니다! 🎉",
        error: "주문 삭제에 실패했습니다 😢",
        pending: "주문 삭제 중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleDeleteOrder };
};
