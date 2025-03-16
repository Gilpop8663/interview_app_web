import { DELETE_ACCOUNT } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";
import { showPromiseToast } from "@/lib/toast";
import { ACCESS_TOKEN } from "@/constants/localstorage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

interface Result {
  deleteAccount: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  userId: number;
}

export const useDeleteAccount = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [deleteAccount, { data, error }] = useMutation<Result>(DELETE_ACCOUNT);
  const navigate = useNavigate();

  const handleDeleteAccount = async (input: Props) => {
    const result = deleteAccount({
      variables: { input },
      async onCompleted(_, clientOptions) {
        localStorage.removeItem(ACCESS_TOKEN);
        await clientOptions?.client?.resetStore();
      },
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.deleteAccount.ok) {
          throw new Error(
            res.data?.deleteAccount.error || t("account.deleteError"),
          );
        }

        navigate(ROUTES.HOME);
        return res;
      }),
      {
        success: t("account.deleteSuccess"),
        error: t("account.deleteError"),
        pending: t("account.deleting"),
      },
    );

    return result;
  };

  return { handleDeleteAccount, data, error };
};
