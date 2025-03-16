import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

const TermsPage = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {t("terms.title")} {/* 번역된 제목 사용 */}
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section1.title")}
          </h2>
          <p className="text-gray-700 mb-4">{t("terms.section1.content")}</p>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section2.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section2.item1")}</li>
            <li>{t("terms.section2.item2")}</li>
            <li>{t("terms.section2.item3")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section3.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section3.item1")}</li>
            <li>{t("terms.section3.item2")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section4.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section4.item1")}</li>
            <li>{t("terms.section4.item2")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section5.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section5.item1")}</li>
            <li>{t("terms.section5.item2")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section6.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section6.item1")}</li>
            <li>{t("terms.section6.item2")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section7.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section7.item1")}</li>
            <li>{t("terms.section7.item2")}</li>
            <li>{t("terms.section7.item3")}</li>
            <li>{t("terms.section7.item4")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section8.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section8.item1")}</li>
            <li>{t("terms.section8.item2")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section9.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section9.item1")}</li>
            <li>{t("terms.section9.item2")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section10.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section10.item1")}</li>
            <li>{t("terms.section10.item2")}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section11.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section11.item1")}</li>
            <span>{t("terms.section11.item2")}</span>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {t("terms.section12.title")}
          </h2>
          <ul className="list-decimal text-gray-700 gap-4 mb-4 flex flex-col">
            <li>{t("terms.section12.item1")}</li>
            <li>{t("terms.section12.item2")}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
