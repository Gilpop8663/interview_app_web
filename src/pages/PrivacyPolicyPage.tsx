import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

const PrivacyPolicyPage = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {t("privacyPolicy.title")} {/* 번역된 제목 사용 */}
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {t("privacyPolicy.section1.title")} {/* 번역된 섹션 제목 사용 */}
          </h2>
          <ul className="text-gray-700 list-disc ml-6 mb-4">
            <li>{t("privacyPolicy.section1.item1")}</li>{" "}
            {/* 번역된 항목 사용 */}
            <li>{t("privacyPolicy.section1.item2")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("privacyPolicy.section2.title")} {/* 번역된 섹션 제목 사용 */}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("privacyPolicy.section2.content")} {/* 번역된 내용 사용 */}
          </p>

          <h2 className="text-xl font-semibold mb-4">
            {t("privacyPolicy.section3.title")} {/* 번역된 섹션 제목 사용 */}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("privacyPolicy.section3.content")} {/* 번역된 내용 사용 */}
          </p>

          <h2 className="text-xl font-semibold mb-4">
            {t("privacyPolicy.section4.title")} {/* 번역된 섹션 제목 사용 */}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("privacyPolicy.section4.content")} {/* 번역된 내용 사용 */}
          </p>

          <h2 className="text-xl font-semibold mb-4">
            {t("privacyPolicy.section5.title")} {/* 번역된 섹션 제목 사용 */}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("privacyPolicy.section5.content")} {/* 번역된 내용 사용 */}
          </p>

          <h2 className="text-xl font-semibold mb-4">
            {t("privacyPolicy.section6.title")} {/* 번역된 섹션 제목 사용 */}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("privacyPolicy.section6.content")} {/* 번역된 내용 사용 */}
          </p>

          <h2 className="text-xl font-semibold mb-4">
            {t("privacyPolicy.section7.title")} {/* 번역된 섹션 제목 사용 */}
          </h2>
          <p className="text-gray-700 mb-4">
            {t("privacyPolicy.section7.content")} {/* 번역된 내용 사용 */}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
