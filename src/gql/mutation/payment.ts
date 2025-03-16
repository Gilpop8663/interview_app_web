import { gql } from "@apollo/client";

export const CREATE_PAYMENT = gql`
  mutation ($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
      paymentId
    }
  }
`;

export const UPDATE_PAYMENT_STATUS = gql`
  mutation ($input: UpdatePaymentStatusInput!) {
    updatePaymentStatus(input: $input) {
      ok
      error
    }
  }
`;

export const COMPLETE_PAYMENT = gql`
  mutation ($input: CompletePaymentInput!) {
    completePayment(input: $input) {
      ok
      error
    }
  }
`;
