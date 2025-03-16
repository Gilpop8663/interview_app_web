import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import UserListFetcher from "@/fetchers/admin/users/UserListFetcher";
import React, { Suspense } from "react";

const UserListPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 min-h-screen">
        <h2 className="text-xl font-bold mb-4">계정 목록</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">이메일</th>
              <th className="border px-4 py-2">구독 유형</th>
              <th className="border px-4 py-2">계정 유형</th>
              <th className="border px-4 py-2">쓰레드 언팔로우 수</th>
              <th className="border px-4 py-2">인스타 언팔로우 수</th>
              <th className="border px-4 py-2">인스타 자동댓글 수</th>
              <th className="border px-4 py-2">네이버 자동댓글 수</th>
              <th className="border px-4 py-2">네이버 이미지 다운로드 수</th>
              <th className="border px-4 py-2">닉네임</th>
              <th className="border px-4 py-2">포인트</th>
              <th className="border px-4 py-2">가입일</th>
              <th className="border px-4 py-2">프리미엄 버전 만료일</th>
            </tr>
          </thead>
          <Suspense fallback={<Skeleton className="h-48" />}>
            <UserListFetcher />
          </Suspense>
        </table>
      </div>
    </Layout>
  );
};

export default UserListPage;
