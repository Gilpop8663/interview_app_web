import { gql } from "@apollo/client";

export const CREATE_COUPON = gql`
  mutation ($input: CreateCouponInput!) {
    createCoupon(input: $input) {
      ok
      error
    }
  }
`;

export const UPDATE_COUPON = gql`
  mutation ($input: UpdateCouponInput!) {
    updateCoupon(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_COUPON = gql`
  mutation ($input: DeleteCouponInput!) {
    deleteCoupon(input: $input) {
      ok
      error
    }
  }
`;

export const USE_COUPON = gql`
  mutation ($input: UseCouponInput!) {
    useCoupon(input: $input) {
      ok
      error
    }
  }
`;
