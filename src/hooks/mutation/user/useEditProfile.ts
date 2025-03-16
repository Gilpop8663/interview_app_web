import { EDIT_PROFILE } from "@/gql/mutation/user";
import { showPromiseToast } from "@/lib/toast";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

interface Result {
  editProfile: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  nickname: string;
  password: string;
}

export const useEditProfile = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [editProfile, { data, error }] = useMutation<Result>(EDIT_PROFILE);

  const handleEditProfile = async (input: Props) => {
    const result = editProfile({
      variables: { input },
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.editProfile.ok) {
          throw new Error(
            res.data?.editProfile.error || t("profile.editError"),
          );
        }
        return res;
      }),
      {
        success: t("profile.editSuccess"),
        error: t("profile.editError"),
        pending: t("profile.editing"),
      },
    );

    return result;
  };

  return { handleEditProfile, data, error };
};
