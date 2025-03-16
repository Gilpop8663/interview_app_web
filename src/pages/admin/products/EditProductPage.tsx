import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import EditProductFetcher from "@/fetchers/admin/products/EditProductFetcher";
import React, { Suspense } from "react";

const EditProductPage: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <EditProductFetcher />
      </Suspense>
    </Layout>
  );
};

export default EditProductPage;
