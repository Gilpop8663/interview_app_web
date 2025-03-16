import React from "react";
import { useTranslation } from "react-i18next";

type BillingType = "monthly" | "yearly";

interface Props {
  billingType: BillingType;
  handleBillingTypeChange: (type: BillingType) => void;
}

const BillingTab: React.FC<Props> = ({
  billingType,
  handleBillingTypeChange,
}: Props) => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <div className="flex w-max mx-auto border rounded-full overflow-hidden">
      {/* 월간 결제 버튼 */}
      <button
        onClick={() => handleBillingTypeChange("monthly")}
        className={`px-6 py-2 transition-colors duration-300 ${
          billingType === "monthly"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 hover:bg-blue-100"
        }`}
      >
        {t("payment.monthlyPlan")}
      </button>

      {/* 연간 결제 버튼 */}
      <button
        onClick={() => handleBillingTypeChange("yearly")}
        className={`px-6 py-2 transition-colors duration-300 ${
          billingType === "yearly"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 hover:bg-blue-100"
        }`}
      >
        {t("payment.yearlyPlan")}
      </button>
    </div>
  );
};

export default BillingTab;
