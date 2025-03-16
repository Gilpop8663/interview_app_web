import { ROUTES } from "@/router/routes";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

const NotFoundPage = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-700">{t("notFound.message")}</p>{" "}
      {/* 번역된 메시지 사용 */}
      <Link to={ROUTES.HOME} className="mt-6 text-blue-500 hover:underline">
        {t("notFound.homeLink")} {/* 번역된 링크 텍스트 사용 */}
      </Link>
    </div>
  );
};

export default NotFoundPage;
