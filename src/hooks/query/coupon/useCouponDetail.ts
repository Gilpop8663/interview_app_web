import { GET_COUPON_DETAIL } from "@/gql/query/coupon";
import { Coupon } from "@/types/coupon";
import { useSuspenseQuery } from "@apollo/client";

interface CouponDetailResult {
  getCouponDetail: {
    ok: boolean;
    error: null | string;
    coupon: Coupon;
  };
}

export const useCouponDetail = (input: { couponId: number }) => {
  const { data } = useSuspenseQuery<CouponDetailResult>(GET_COUPON_DETAIL, {
    variables: { input },
  });

  return { coupon: data.getCouponDetail.coupon };
};
