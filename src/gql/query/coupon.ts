import { gql } from "@apollo/client";

export const GET_COUPON_LIST = gql`
  query {
    getCouponList {
      ok
      error
      couponList {
        id
        code
        expirationDate
        isActive
      }
    }
  }
`;

export const GET_COUPON_DETAIL = gql`
  query ($input: GetCouponDetailInput!) {
    getCouponDetail(input: $input) {
      ok
      error
      coupon {
        id
        code
        expirationDate
        isActive
      }
    }
  }
`;
