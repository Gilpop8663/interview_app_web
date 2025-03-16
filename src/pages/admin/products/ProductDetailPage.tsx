import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import { ProductDetailFetcher } from "@/fetchers/admin/products/ProductDetailFetcher";
import { Suspense } from "react";

export default function ProductDetailPage() {
  return (
    <Layout>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <ProductDetailFetcher />
      </Suspense>
    </Layout>
  );
}
