import { GET_USER_PROFILE } from '@/gql/query/user';
import { User } from '@/types/user';
import { useSuspenseQuery } from '@apollo/client';

interface ProductDetailResult {
  getUserProfile: {
    ok: boolean;
    error: null | string;
    user: User;
  };
}

export const useUserProfile = (input: { userId: number }) => {
  const { data } = useSuspenseQuery<ProductDetailResult>(GET_USER_PROFILE, {
    variables: { input },
  });

  return { user: data.getUserProfile.user };
};
