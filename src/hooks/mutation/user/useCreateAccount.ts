import { CREATE_ACCOUNT } from "@/gql/mutation/user";
import { ME } from "@/gql/query/user";
import { showPromiseToast } from "@/lib/toast";
import { client } from "@/main";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

interface Result {
  createAccount: {
    ok: boolean;
    error: null | string;
    token: string;
  };
}

interface Props {
  email: string;
  password: string;
}

export const useCreateAccount = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [createAccount, { data, error, loading }] =
    useMutation<Result>(CREATE_ACCOUNT);

  const handleCreateAccount = async (input: Props) => {
    const result = createAccount({
      variables: { input },
      refetchQueries: [{ query: ME }],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.createAccount.ok) {
          throw new Error(
            res.data?.createAccount.error || t("account.createError"),
          );
        }
        return res;
      }),
      {
        success: t("account.createSuccess"),
        error: t("account.createError"),
        pending: t("account.creating"),
      },
    );

    return result;
  };

  const prefetchMyProfile = async () => {
    try {
      const { data } = await client.query({
        query: ME,
        fetchPolicy: "network-only",
      });

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { handleCreateAccount, data, error, prefetchMyProfile, loading };
};
