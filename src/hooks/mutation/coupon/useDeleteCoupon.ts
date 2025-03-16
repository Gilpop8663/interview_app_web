import { DELETE_COUPON } from "@/gql/mutation/coupon";
import { useMutation } from "@apollo/client";
import { showPromiseToast } from "@/lib/toast"; // 토스트 함수 가져오기
import { GET_COUPON_DETAIL, GET_COUPON_LIST } from "@/gql/query/coupon";

interface DeleteCouponInput {
  couponId: number;
}

export const useDeleteCoupon = () => {
  const [deleteCouponMutation] = useMutation(DELETE_COUPON);

  const deleteCoupon = async (input: DeleteCouponInput) => {
    const result = deleteCouponMutation({
      variables: { input },
      refetchQueries: [
        { query: GET_COUPON_LIST },
        { query: GET_COUPON_DETAIL },
      ],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.deleteCoupon.ok) {
          throw new Error(
            res.data?.deleteCoupon.error || "쿠폰 삭제에 실패했습니다.",
          );
        }

        return res; // 성공 시 반환값
      }),
      {
        success: "쿠폰 삭제에 성공했습니다! 🎉",
        error: "쿠폰 삭제에 실패했습니다 😢",
        pending: "쿠폰 삭제 중입니다 ⏳",
      },
    );

    return result; // 최종적으로 결과 반환
  };

  return { deleteCoupon };
};
