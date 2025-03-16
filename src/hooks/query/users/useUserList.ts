import { GET_USER_LIST } from '@/gql/query/user';
import { User } from '@/types/user';
import { useSuspenseQuery } from '@apollo/client';

interface ProductListResult {
  getUserList: {
    ok: boolean;
    error: null | string;
    userList: User[];
  };
}

export const useUserList = () => {
  const { data } = useSuspenseQuery<ProductListResult>(GET_USER_LIST);

  return { users: data.getUserList.userList };
};
