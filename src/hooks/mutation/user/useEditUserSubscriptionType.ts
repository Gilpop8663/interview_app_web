import { EDIT_USER_SUBSCRIPTION_TYPE } from '@/gql/mutation/product';
import { GET_USER_LIST, GET_USER_PROFILE } from '@/gql/query/user';
import { showPromiseToast } from '@/lib/toast';
import { ROUTES } from '@/router/routes';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

interface EditProductInput {
  userId: number;
  subscriptionType: 'FREE' | 'PREMIUM';
}

interface Result {
  editUserSubscriptionType: {
    ok: boolean;
    error: null | string;
  };
}

export const useEditUserSubscriptionType = () => {
  const [editSubscriptionType] = useMutation<Result>(
    EDIT_USER_SUBSCRIPTION_TYPE
  );
  const navigate = useNavigate();

  const handleUserSubscriptionType = async (input: EditProductInput) => {
    const result = editSubscriptionType({
      variables: { input },
      refetchQueries: [{ query: GET_USER_LIST }, { query: GET_USER_PROFILE }],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.editUserSubscriptionType.ok) {
          throw new Error(
            res.data?.editUserSubscriptionType.error ||
              '유저 구독 유형 수정에 실패했습니다.'
          );
        }

        navigate(ROUTES.ADMIN_USERS);

        return res;
      }),
      {
        success: '유저 구독 유형 수정에 성공했습니다! 🎉',
        error: '유저 구독 유형 수정에 실패했습니다 😢',
        pending: '유저 구독 유형 수정 중입니다 ⏳',
      }
    );

    return result;
  };

  return { handleUserSubscriptionType };
};
