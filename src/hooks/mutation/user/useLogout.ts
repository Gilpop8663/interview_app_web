import ChannelService from "@/lib/channelTalk/channelService";
import { ACCESS_TOKEN } from "@/constants/localstorage";
import { LOGOUT } from "@/gql/mutation/user";
import { showPromiseToast } from "@/lib/toast";
import { ROUTES } from "@/router/routes";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

interface Result {
  logout: {
    ok: boolean;
    error: null | string;
  };
}

export const useLogout = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [logout, { data, error }] = useMutation<Result>(LOGOUT);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = logout();

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.logout.ok) {
          throw new Error(res.data?.logout.error || t("logout.error"));
        }

        localStorage.removeItem(ACCESS_TOKEN);
        navigate(ROUTES.HOME);

        ChannelService.boot({
          pluginKey: process.env.VITE_CHANNEL_TALK_PLUGIN_KEY,
        });

        return res;
      }),
      {
        success: t("logout.success"),
        error: t("logout.error"),
        pending: t("logout.pending"),
      },
    );

    return result;
  };

  return { handleLogout, data, error };
};
