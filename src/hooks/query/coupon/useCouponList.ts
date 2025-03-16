import { GET_COUPON_LIST } from "@/gql/query/coupon";
import { Coupon } from "@/types/coupon";
import { useSuspenseQuery } from "@apollo/client";

interface CouponListResult {
  getCouponList: {
    ok: boolean;
    error: null | string;
    couponList: Coupon[];
  };
}

export const useCouponList = () => {
  const { data } = useSuspenseQuery<CouponListResult>(GET_COUPON_LIST);

  return { coupons: data.getCouponList.couponList };
};
