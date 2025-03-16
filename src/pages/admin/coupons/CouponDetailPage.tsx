import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import { CouponDetailFetcher } from "@/fetchers/admin/coupons/CouponDetailFetcher";
import { Suspense } from "react";

export default function CouponDetailPage() {
  return (
    <Layout>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <CouponDetailFetcher />
      </Suspense>
    </Layout>
  );
}
