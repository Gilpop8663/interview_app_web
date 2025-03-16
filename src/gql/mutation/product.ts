import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation ($input: CreateProductInput!) {
    createProduct(input: $input) {
      ok
      error
      productId
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation ($input: EditProductInput!) {
    editProduct(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_USER_SUBSCRIPTION_TYPE = gql`
  mutation ($input: EditUserSubscriptionTypeInput!) {
    editUserSubscriptionType(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation ($input: DeleteProductInput!) {
    deleteProduct(input: $input) {
      ok
      error
    }
  }
`;
