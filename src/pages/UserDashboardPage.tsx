import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import UserDashboardDeleteAccountFetcher from "@/fetchers/userDashboard/UserDashboardDeleteAccountFetcher";
import UserDashboardInfoFetcher from "@/fetchers/userDashboard/UserDashboardInfoFetcher";
import UserDashboardStaticsFetcher from "@/fetchers/userDashboard/UserDashboardStaticsFetcher";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트
import EventPage from "./EventPage";

const UserDashboardPage: React.FC = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t("dashboard.title")}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 사용자 정보 및 구독 상태 */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-4">
              {t("dashboard.userInfo")}
            </h2>
            <Suspense fallback={<Skeleton className="h-24" />}>
              <UserDashboardInfoFetcher />
            </Suspense>
          </div>

          {/* 크롬 익스텐션 설치 안내 */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-4">
              {t("dashboard.chromeExtensionTitle")}
            </h2>
            <p className="mb-4">{t("dashboard.chromeExtensionDescription")}</p>
            <a
              href="https://chromewebstore.google.com/detail/threads-follower-check/limbfnbadjaoikobmelblpgmlpfnngec"
              className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("dashboard.chromeExtensionButton")}
            </a>
          </div>
        </div>

        {/* 사용 통계 또는 추가 정보 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t("dashboard.statisticsTitle")}
          </h2>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t("dashboard.statisticsDescription")}
            </h3>
            <Suspense fallback={<Skeleton className="h-24" />}>
              <UserDashboardStaticsFetcher />
            </Suspense>
          </div>
        </div>

        <EventPage />

        <Suspense fallback={<Skeleton className="h-12 mt-6 w-28 mx-auto" />}>
          <UserDashboardDeleteAccountFetcher />
        </Suspense>
      </div>
    </Layout>
  );
};

export default UserDashboardPage;
