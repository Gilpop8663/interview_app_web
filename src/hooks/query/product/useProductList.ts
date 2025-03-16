import { GET_PRODUCT_LIST } from "@/gql/query/product";
import { Product } from "@/types/product";
import { useSuspenseQuery } from "@apollo/client";

interface ProductListResult {
  getProductList: {
    ok: boolean;
    error: null | string;
    productList: Product[];
  };
}

export const useProductList = () => {
  const { data } = useSuspenseQuery<ProductListResult>(GET_PRODUCT_LIST);

  return { products: data.getProductList.productList };
};
