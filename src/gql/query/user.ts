import { gql } from "@apollo/client";

// 내 정보 조회
export const ME = gql`
  query {
    me {
      id
      email
      nickname
      point
      role
      createdAt
      updatedAt
      subscriptionType
      threadsUnfollowCount
      instagramUnfollowCount
      instagramAutomationCount
      naverAutomationCount
      naverImageDownloadCount
      premiumEndDate
    }
  }
`;

export const GET_USER_LIST = gql`
  query {
    getUserList {
      ok
      error
      userList {
        id
        email
        nickname
        point
        role
        createdAt
        updatedAt
        subscriptionType
        threadsUnfollowCount
        instagramUnfollowCount
        instagramAutomationCount
        naverImageDownloadCount
        premiumEndDate
        naverAutomationCount
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query ($input: UserProfileInput!) {
    getUserProfile(input: $input) {
      ok
      error
      user {
        id
        email
        nickname
        point
        role
        createdAt
        updatedAt
        subscriptionType
        threadsUnfollowCount
        instagramUnfollowCount
        instagramAutomationCount
        naverImageDownloadCount
        naverAutomationCount
        premiumEndDate
      }
    }
  }
`;
