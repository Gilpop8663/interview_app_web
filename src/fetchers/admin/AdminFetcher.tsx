import { useGetActiveUserCount } from "@/hooks/query/admin/useGetActiveUserCount";
import { useGetUserCount } from "@/hooks/query/admin/useGetUserCount";
import { ROUTES } from "@/router/routes";
import { Link } from "react-router-dom";

export default function AdminFetcher() {
  const { data: userCount } = useGetUserCount();
  const { data: activeUserCount } = useGetActiveUserCount();

  return (
    <div className="flex flex-col items-center p-8 h-screen">
      <h1 className="text-2xl font-bold mb-4">관리자 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-8">
        {/* 총 사용자 수 카드 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border">
          <h2 className="text-xl font-semibold">총 사용자 수</h2>
          <p className="text-3xl font-bold text-blue-600">
            {userCount.getUserCount.count}
          </p>
          <p className="text-gray-500">사이트에 가입한 전체 사용자 수</p>
        </div>

        {/* 최근 30일간 활동 중인 사용자 수 카드 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border">
          <h2 className="text-xl font-semibold">
            최근 30일간 활동 중인 사용자 수
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {activeUserCount.getActiveUserCount.count}
          </p>
          <p className="text-gray-500">최근 30일간 활동한 사용자 수</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold my-12">관리자 링크</h1>
      <div className="flex justify-between gap-5">
        <Link to={ROUTES.ADMIN_PRODUCTS}>
          <span className="border p-4 rounded-md shadow-md hover:bg-gray-100 transition-colors">
            상품 목록 보러가기
          </span>
        </Link>
        <Link to={ROUTES.ADMIN_USERS}>
          <span className="border p-4 rounded-md shadow-md hover:bg-gray-100 transition-colors">
            사용자 목록 보러가기
          </span>
        </Link>
        <Link to={ROUTES.ADMIN_COUPONS}>
          <span className="border p-4 rounded-md shadow-md hover:bg-gray-100 transition-colors">
            쿠폰 목록 보러가기
          </span>
        </Link>
      </div>
    </div>
  );
}
