import { useMutation } from "@apollo/client";
import { UPDATE_SUBSCRIPTION_TYPE } from "@/gql/mutation/user"; // 경로를 맞게 수정하세요
import { showPromiseToast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { ME } from "@/gql/query/user";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

interface Result {
  updateSubscriptionType: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  subscriptionType: "FREE" | "PREMIUM";
  subscriptionPeriod: "MONTHLY" | "YEARLY";
}

export const useUpdateSubscriptionType = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [updateSubscriptionTypeMutation] = useMutation<Result>(
    UPDATE_SUBSCRIPTION_TYPE,
  );
  const navigate = useNavigate();

  const updateSubscriptionType = async (input: Props) => {
    const result = updateSubscriptionTypeMutation({
      variables: { input },
      refetchQueries: [{ query: ME }],
    });

    const successMessage =
      input.subscriptionType === "PREMIUM"
        ? t("subscription.upgradeSuccess") // 번역된 성공 메시지
        : t("subscription.changeToFree"); // 번역된 무료 구독 변경 메시지

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.updateSubscriptionType.ok) {
          throw new Error(
            res.data?.updateSubscriptionType.error ||
              t("subscription.changeError"), // 번역된 에러 메시지
          );
        }

        navigate(ROUTES.MAIN);

        return res;
      }),
      {
        success: successMessage,
        error: t("subscription.changeError"), // 번역된 에러 메시지
        pending: t("subscription.changing"), // 번역된 대기 메시지
      },
    );
  };

  return { updateSubscriptionType };
};
