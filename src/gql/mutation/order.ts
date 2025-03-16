import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation ($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation ($input: UpdateOrderStatusInput!) {
    updateOrderStatus(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation ($input: DeleteOrderInput!) {
    deleteOrder(input: $input) {
      ok
      error
    }
  }
`;

export const CREATE_PAYPAL_ORDER = gql`
  mutation ($input: CreateOrderInput!) {
    createPaypalOrder(input: $input) {
      ok
      error
      orderData {
        id
        status
      }
      orderId
    }
  }
`;

export const CAPTURE_PAYPAL_ORDER = gql`
  mutation ($input: CapturePaypalOrderInput!) {
    capturePaypalOrder(input: $input) {
      ok
      error
      orderData {
        id
        status
      }
    }
  }
`;
