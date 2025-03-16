import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import EditCouponFetcher from "@/fetchers/admin/coupons/EditCouponFetcher";
import React, { Suspense } from "react";

const EditCouponPage: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <EditCouponFetcher />
      </Suspense>
    </Layout>
  );
};

export default EditCouponPage;
