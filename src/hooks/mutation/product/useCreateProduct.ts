import { CREATE_PRODUCT } from "@/gql/mutation/product";
import { GET_PRODUCT_LIST } from "@/gql/query/product";
import { showPromiseToast } from "@/lib/toast";
import { ROUTES } from "@/router/routes";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface CreateProductInput {
  name: string;
  description: string;
  price: number;
}

interface Result {
  createProduct: {
    ok: boolean;
    error: null | string;
    productId: number;
  };
}

export const useCreateProduct = () => {
  const [createProductMutation] = useMutation<Result>(CREATE_PRODUCT);
  const navigate = useNavigate();

  const handleCreateProduct = async (input: CreateProductInput) => {
    const result = createProductMutation({
      variables: { input },
      refetchQueries: [{ query: GET_PRODUCT_LIST }],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.createProduct.ok) {
          throw new Error(
            res.data?.createProduct.error || "제품 생성에 실패했습니다.",
          );
        }

        navigate(ROUTES.ADMIN_PRODUCTS);

        return res;
      }),
      {
        success: "제품 생성에 성공했습니다! 🎉",
        error: "제품 생성에 실패했습니다 😢",
        pending: "제품 생성 중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleCreateProduct };
};
