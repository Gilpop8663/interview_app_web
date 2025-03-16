import { useMyProfile } from "@/hooks/query/useMyProfile";
import { ROUTES } from "@/router/routes";
import { cn } from "@/utils";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트
import usePriceFormatter from "@/hooks/usePriceFormatter";
import useDateFormat from "@/hooks/useDateFormat";
import { useProductDetail } from "@/hooks/query/product/useProductDetail";

export default function UserDashboardInfoFetcher() {
  const { formatDate } = useDateFormat();
  const { user } = useMyProfile();
  const { t } = useTranslation(); // useTranslation 훅 사용
  const { formatPrice, currentLanguage } = usePriceFormatter();

  const isKorean = currentLanguage === "ko";

  const MONTHLY_PRODUCT_ID = isKorean
    ? process.env.VITE_PREMIUM_MONTHLY_PRODUCT_ID
    : process.env.VITE_PREMIUM_DOLLAR_MONTHLY_PRODUCT_ID;

  const YEARLY_PRODUCT_ID = isKorean
    ? process.env.VITE_PREMIUM_YEARLY_PRODUCT_ID
    : process.env.VITE_PREMIUM_DOLLAR_YEARLY_PRODUCT_ID;
  const monthlyProductId = Number(MONTHLY_PRODUCT_ID) || 1;
  const yearlyProductId = Number(YEARLY_PRODUCT_ID) || 2;

  const { product: monthlyProduct } = useProductDetail({
    productId: monthlyProductId,
  });
  const { product: yearlyProduct } = useProductDetail({
    productId: yearlyProductId,
  });

  const monthlyPrice = formatPrice(monthlyProduct.price); // 월간 가격
  const yearlyPrice = formatPrice(yearlyProduct.price);

  const isPremiumAboutToExpire =
    user.premiumEndDate &&
    new Date(user.premiumEndDate) <
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <>
      <div className="flex flex-col gap-2">
        <p>
          <strong>{t("userDashboard.nickname")}:</strong>
          <span className="ml-1">{user.nickname}</span>
        </p>
        <p>
          <strong>{t("userDashboard.email")}:</strong>
          <span className="ml-1">{user.email}</span>
        </p>
        <p>
          <strong>{t("userDashboard.subscriptionType")}:</strong>
          <span
            className={cn(
              user.subscriptionType === "PREMIUM"
                ? "font-bold text-yellow-500 text-lg"
                : "",
              "ml-1",
            )}
          >
            {user.subscriptionType === "PREMIUM"
              ? t("userDashboard.premium")
              : t("userDashboard.free")}
          </span>
        </p>
        <div>
          <strong>{t("userDashboard.expiryDateLabel")}</strong>
          <span>
            {user.premiumEndDate
              ? formatDate(user.premiumEndDate)
              : t("userDashboard.noAccess")}
          </span>
        </div>
        {/* 7일 무료 체험 안내 추가 */}
        {user.premiumEndDate && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {t("userDashboard.freeTrialMessage")}
            </p>
          </div>
        )}
      </div>

      {(user.subscriptionType === "FREE" || isPremiumAboutToExpire) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">
            {t("userDashboard.upgradeTitle")}
          </h3>
          <p className="mb-2">
            {t("userDashboard.upgradeDescription", {
              monthPrice: monthlyPrice,
              yearlyPrice: yearlyPrice,
            })}
          </p>
          <Link to={ROUTES.SUBSCRIPTION}>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
              {t("userDashboard.upgradeButton")}
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
