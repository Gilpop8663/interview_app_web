import { RESET_PASSWORD } from '@/gql/mutation/user';
import { useMutation } from '@apollo/client';

interface ResetPasswordInput {
  password: string;
  code: string;
}

interface ResetPasswordResult {
  ok: boolean;
  error?: string;
}

export const useResetPassword = () => {
  const [resetPasswordMutation, { loading, error, data }] = useMutation<
    { resetPassword: ResetPasswordResult },
    { input: ResetPasswordInput }
  >(RESET_PASSWORD);

  const resetPassword = async ({ code, password }: ResetPasswordInput) => {
    try {
      const result = await resetPasswordMutation({
        variables: {
          input: { password, code },
        },
      });

      return result.data?.resetPassword;
    } catch (err) {
      console.error('Error resetting password:', err);
      throw err;
    }
  };

  return {
    resetPassword,
    data,
    loading,
    error,
  };
};
