import { GET_PRODUCT_DETAIL } from "@/gql/query/product";
import { Product } from "@/types/product";
import { useSuspenseQuery } from "@apollo/client";

interface ProductDetailResult {
  getProductDetail: {
    ok: boolean;
    error: null | string;
    product: Product;
  };
}

export const useProductDetail = (input: { productId: number }) => {
  const { data } = useSuspenseQuery<ProductDetailResult>(GET_PRODUCT_DETAIL, {
    variables: { input },
  });

  return { product: data.getProductDetail.product };
};
