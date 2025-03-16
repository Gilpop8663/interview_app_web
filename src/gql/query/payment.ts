import { gql } from "@apollo/client";

export const GET_PAYMENT_LIST = gql`
  query {
    getPaymentList {
      ok
      error
      paymentList {
        id
        amount
        status
        transactionId
        order {
          id
          totalAmount
          status
        }
      }
    }
  }
`;

export const GET_PAYMENT_DETAIL = gql`
  query ($input: GetPaymentDetailInput!) {
    getPaymentDetail(input: $input) {
      ok
      error
      payment {
        id
        amount
        status
        transactionId
        order {
          id
          totalAmount
          status
        }
      }
    }
  }
`;
