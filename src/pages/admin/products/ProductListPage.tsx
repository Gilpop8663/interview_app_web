import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import ProductListFetcher from "@/fetchers/admin/products/ProductListFetcher";
import { ROUTES } from "@/router/routes";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";

const ProductListPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 min-h-screen">
        <h2 className="text-xl font-bold mb-4">상품 목록</h2>
        <Link
          to={ROUTES.ADMIN_PRODUCTS_CREATE}
          className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
        >
          상품 생성
        </Link>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">이름</th>
              <th className="border px-4 py-2">가격</th>
              <th className="border px-4 py-2">설명</th>
              <th className="border px-4 py-2">작업</th>
            </tr>
          </thead>
          <Suspense fallback={<Skeleton className="h-48" />}>
            <ProductListFetcher />
          </Suspense>
        </table>
      </div>
    </Layout>
  );
};

export default ProductListPage;
