import { USE_COUPON } from "@/gql/mutation/coupon";
import { useMutation } from "@apollo/client";
import { showPromiseToast, showToast } from "@/lib/toast"; // 토스트 함수 가져오기
import { ME } from "@/gql/query/user";
import { useTranslation } from "react-i18next";

interface UseCouponInput {
  code: string;
}

export const useCouponMutation = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [mutateCoupon] = useMutation(USE_COUPON);

  const handleCouponRegister = async (input: UseCouponInput) => {
    const result = mutateCoupon({
      variables: { input },
      refetchQueries: [{ query: ME }],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.useCoupon.ok) {
          const errorMessage =
            res.data?.useCoupon.error || t("couponPage.errorMessage");

          showToast(errorMessage, "error");
          throw new Error(errorMessage);
        }

        return res; // 성공 시 반환값
      }),
      {
        success: t("couponPage.successMessage"),
        error: t("couponPage.errorMessage"),
        pending: t("couponPage.pendingMessage"),
      },
    );

    return result; // 최종적으로 결과 반환
  };

  return { handleCouponRegister };
};
