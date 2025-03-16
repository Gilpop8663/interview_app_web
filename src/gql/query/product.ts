import { gql } from "@apollo/client";

export const GET_PRODUCT_LIST = gql`
  query {
    getProductList {
      ok
      error
      productList {
        id
        name
        description
        price
      }
    }
  }
`;

export const GET_PRODUCT_DETAIL = gql`
  query ($input: GetProductDetailInput!) {
    getProductDetail(input: $input) {
      ok
      error
      product {
        id
        name
        description
        price
      }
    }
  }
`;
