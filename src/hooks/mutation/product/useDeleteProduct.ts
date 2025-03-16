import { DELETE_PRODUCT } from "@/gql/mutation/product";
import { GET_PRODUCT_LIST } from "@/gql/query/product";
import { showPromiseToast } from "@/lib/toast";
import { useMutation } from "@apollo/client";

interface DeleteProductInput {
  productId: number;
}

interface Result {
  deleteProduct: {
    ok: boolean;
    error: null | string;
  };
}

export const useDeleteProduct = () => {
  const [deleteProductMutation] = useMutation<Result>(DELETE_PRODUCT);

  const handleDeleteProduct = async (input: DeleteProductInput) => {
    const result = deleteProductMutation({
      variables: { input },
      refetchQueries: [{ query: GET_PRODUCT_LIST }],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.deleteProduct.ok) {
          throw new Error(
            res.data?.deleteProduct.error || "제품 삭제에 실패했습니다.",
          );
        }
        return res;
      }),
      {
        success: "제품 삭제에 성공했습니다! 🎉",
        error: "제품 삭제에 실패했습니다 😢",
        pending: "제품 삭제 중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleDeleteProduct };
};
