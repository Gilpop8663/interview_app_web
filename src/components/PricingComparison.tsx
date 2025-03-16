import { ROUTES } from "@/router/routes";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트
import usePriceFormatter from "@/hooks/usePriceFormatter";
import BillingTab from "./BillingTab";

interface Props {
  isLoggedIn: boolean;
  monthlyPrice?: number;
  yearlyPrice?: number;
}

type BillingType = "monthly" | "yearly";

const PricingComparison: React.FC<Props> = ({
  monthlyPrice = 150000,
  yearlyPrice = 1200000,
  isLoggedIn,
}) => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const { formatPrice, currentLanguage } = usePriceFormatter();
  const [billingType, setBillingType] = useState<BillingType>("monthly");

  const handleBillingTypeChange = (type: BillingType) => {
    setBillingType(type);
  };

  const isKorean = currentLanguage === "ko";

  const displayMonthlyPrice = formatPrice(monthlyPrice);

  return (
    <section id="pricing" className="py-12">
      <div className="lg:max-w-5xl xl:max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("pricing.title")} {/* 번역된 타이틀 사용 */}
        </h2>
        <div className="my-12">
          <BillingTab
            billingType={billingType}
            handleBillingTypeChange={handleBillingTypeChange}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 px-8">
          {/* 무료 버전 */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">
              {t("pricing.freeVersion")}
            </h3>
            <p className="text-2xl font-bold mb-4">
              {t("pricing.free")} {/* 번역된 무료 텍스트 사용 */}
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {t("pricing.freeDailyUnfollow")}
              </li>
              <li className="flex items-center text-gray-500">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {t("pricing.unlimitedInstagramUnfollow")}
              </li>
              <li className="flex items-center text-gray-500">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {t("pricing.autoDm")}
              </li>
              <li className="flex items-center text-gray-500">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {t("pricing.autoFollowerGrowth")}
              </li>
              <li className="flex items-center text-gray-500">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {t("pricing.aiCommenting")}
              </li>
              {isKorean && (
                <li className="flex items-center text-gray-500">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  {t("pricing.naverNeighborGrowth")}
                </li>
              )}
            </ul>
            {!isLoggedIn && (
              <Link to={ROUTES.LOGIN}>
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                  {t("pricing.startFree")} {/* 번역된 버튼 텍스트 사용 */}
                </button>
              </Link>
            )}
          </div>

          {/* 월간 결제 버전 */}
          {billingType === "monthly" && (
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-500">
              <h3 className="text-xl font-semibold mb-4">
                {t("pricing.premiumMonthly")} {/* 번역된 타이틀 사용 */}
              </h3>
              <p className="text-2xl font-bold mb-4">{displayMonthlyPrice}</p>{" "}
              {/* 월간 가격 표시 */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.unlimitedThreadUnfollow")}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.unlimitedInstagramUnfollow")}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.autoDm")}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.autoFollowerGrowth")}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.aiCommenting")}
                </li>
                {isKorean && (
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {t("pricing.naverNeighborGrowth")}
                  </li>
                )}
              </ul>
              {!isLoggedIn && (
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                  >
                    {t("pricing.startPremium")} {/* 번역된 버튼 텍스트 사용 */}
                  </button>
                </Link>
              )}
            </div>
          )}

          {/* 연간 결제 버전 */}
          {billingType === "yearly" && (
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-500">
              <h3 className="text-xl font-semibold mb-4">
                {t("pricing.premiumYearly")} {/* 번역된 타이틀 사용 */}
              </h3>
              <div className="flex items-baseline mb-4">
                <p className="line-through text-2xl font-bold  text-gray-500 mr-2">
                  {displayMonthlyPrice}
                </p>
                <p className="text-2xl font-bold mr-1">
                  {formatPrice(Number((yearlyPrice / 12).toFixed(2)))}
                </p>
                <span className="text-lg text-gray-500">
                  {t("pricing.month")}
                </span>
              </div>
              {/* 할인된 가격 */}
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.unlimitedThreadUnfollow")}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.unlimitedInstagramUnfollow")}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.autoDm")}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.autoFollowerGrowth")}
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("pricing.aiCommenting")}
                </li>
                {isKorean && (
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {t("pricing.naverNeighborGrowth")}
                  </li>
                )}
              </ul>
              {!isLoggedIn && (
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                  >
                    {t("pricing.startPremium")} {/* 번역된 버튼 텍스트 사용 */}
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
