import { CREATE_COUPON } from "@/gql/mutation/coupon";
import { useMutation } from "@apollo/client";
import { showPromiseToast } from "@/lib/toast"; // 토스트 함수 가져오기
import { GET_COUPON_DETAIL, GET_COUPON_LIST } from "@/gql/query/coupon";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes";

interface CreateCouponInput {
  code: string;
  expirationDate: Date;
  isActive?: boolean;
}

export const useCreateCoupon = () => {
  const [createCouponMutation] = useMutation(CREATE_COUPON);
  const navigate = useNavigate();

  const createCoupon = async (input: CreateCouponInput) => {
    const result = createCouponMutation({
      variables: { input },
      refetchQueries: [
        { query: GET_COUPON_LIST },
        { query: GET_COUPON_DETAIL },
      ],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.createCoupon.ok) {
          throw new Error(
            res.data?.createCoupon.error || "쿠폰 생성에 실패했습니다.",
          );
        }

        navigate(ROUTES.ADMIN_COUPONS);

        return res; // 성공 시 반환값
      }),
      {
        success: "쿠폰 생성에 성공했습니다! 🎉",
        error: "쿠폰 생성에 실패했습니다 😢",
        pending: "쿠폰 생성 중입니다 ⏳",
      },
    );

    return result; // 최종적으로 결과 반환
  };

  return { createCoupon };
};
