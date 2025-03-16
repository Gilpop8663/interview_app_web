import { EDIT_PRODUCT } from "@/gql/mutation/product";
import { GET_PRODUCT_DETAIL, GET_PRODUCT_LIST } from "@/gql/query/product";
import { showPromiseToast } from "@/lib/toast";
import { ROUTES } from "@/router/routes";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface EditProductInput {
  productId: number;
  name: string;
  description: string;
  price: number;
}

interface Result {
  editProduct: {
    ok: boolean;
    error: null | string;
  };
}

export const useEditProduct = () => {
  const [editProductMutation] = useMutation<Result>(EDIT_PRODUCT);
  const navigate = useNavigate();

  const handleEditProduct = async (input: EditProductInput) => {
    const result = editProductMutation({
      variables: { input },
      refetchQueries: [
        {
          query: GET_PRODUCT_DETAIL,
          variables: { input: { productId: input.productId } },
        },
        { query: GET_PRODUCT_LIST },
      ],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.editProduct.ok) {
          throw new Error(
            res.data?.editProduct.error || "제품 수정에 실패했습니다.",
          );
        }

        navigate(ROUTES.ADMIN_PRODUCTS);

        return res;
      }),
      {
        success: "제품 수정에 성공했습니다! 🎉",
        error: "제품 수정에 실패했습니다 😢",
        pending: "제품 수정 중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleEditProduct };
};
