import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation ($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
      token
    }
  }
`;

export const CHECK_EMAIL = gql`
  mutation ($input: CheckEmailInput!) {
    checkEmail(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation ($input: DeleteAccountInput!) {
    deleteAccount(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation ($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout {
      ok
      error
    }
  }
`;

export const UPDATE_SUBSCRIPTION_TYPE = gql`
  mutation ($input: UpdateSubscriptionTypeInput!) {
    updateSubscriptionType(input: $input) {
      ok
      error
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      ok
      error
    }
  }
`;
