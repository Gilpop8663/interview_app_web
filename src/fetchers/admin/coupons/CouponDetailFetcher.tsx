import { useCouponDetail } from "@/hooks/query/coupon/useCouponDetail";
import { useParams } from "react-router-dom";

export const CouponDetailFetcher = () => {
  const { id } = useParams<{ id: string }>();
  const couponId = Number(id);
  const { coupon } = useCouponDetail({ couponId });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">쿠폰 상세 보기</h2>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">
            쿠폰 코드: {coupon.code}
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            만료일:{" "}
            <span className="font-bold">
              {new Date(coupon.expirationDate).toLocaleDateString("ko-KR")}
            </span>
          </p>
          <p className="text-lg text-gray-700 mb-4">
            활성화 상태:{" "}
            <span className="font-bold">
              {coupon.isActive ? "활성" : "비활성"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
