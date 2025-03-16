import { gql } from "@apollo/client";

export const GET_ORDER_LIST = gql`
  query {
    getOrderList {
      ok
      error
      orderList {
        id
        totalAmount
        status
        user {
          id
          email
        }
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const GET_ORDER_DETAIL = gql`
  query ($input: GetOrderDetailInput!) {
    getOrderDetail(input: $input) {
      ok
      error
      order {
        id
        totalAmount
        status
        user {
          id
          email
        }
        product {
          id
          name
          price
        }
      }
    }
  }
`;
