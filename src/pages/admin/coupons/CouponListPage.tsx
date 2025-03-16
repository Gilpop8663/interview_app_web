import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import CouponListFetcher from "@/fetchers/admin/coupons/CouponListFetcher";
import { ROUTES } from "@/router/routes";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";

const CouponListPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8  min-h-screen">
        <h2 className="text-xl font-bold mb-4">쿠폰 목록</h2>
        <Link
          to={ROUTES.ADMIN_COUPON_CREATE}
          className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
        >
          쿠폰 생성
        </Link>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">코드</th>
              <th className="border px-4 py-2">만료일</th>
              <th className="border px-4 py-2">사용 가능 여부</th>
            </tr>
          </thead>
          <Suspense fallback={<Skeleton className="h-48" />}>
            <CouponListFetcher />
          </Suspense>
        </table>
      </div>
    </Layout>
  );
};

export default CouponListPage;
