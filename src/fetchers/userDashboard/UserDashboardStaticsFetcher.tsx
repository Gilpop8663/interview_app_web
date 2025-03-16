import { useMyProfile } from "@/hooks/query/useMyProfile";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

export default function UserDashboardStaticsFetcher() {
  const { user } = useMyProfile();
  const { t, i18n } = useTranslation(); // useTranslation 훅 사용

  const currentLanguage = i18n.language.split("-")[0];

  const isKorean = currentLanguage === "ko";

  return (
    <ul className="list-disc list-inside mt-2 space-y-2">
      <li className="flex justify-between">
        <span className="text-gray-600">
          {t("userDashboard.unfollowThreadsCount")}:
        </span>
        <strong className="text-blue-600">{user.threadsUnfollowCount}</strong>
      </li>
      <li className="flex justify-between">
        <span className="text-gray-600">
          {t("userDashboard.unfollowInstagramCount")}:
        </span>
        <strong className="text-blue-600">{user.instagramUnfollowCount}</strong>
      </li>
      <li className="flex justify-between">
        <span className="text-gray-600">
          {t("userDashboard.instagramAutomationCount")}:
        </span>
        <strong className="text-blue-600">
          {user.instagramAutomationCount}
        </strong>
      </li>
      {isKorean && (
        <li className="flex justify-between">
          <span className="text-gray-600">
            {t("userDashboard.naverAutomationCount")}:
          </span>
          <strong className="text-blue-600">{user.naverAutomationCount}</strong>
        </li>
      )}
    </ul>
  );
}
