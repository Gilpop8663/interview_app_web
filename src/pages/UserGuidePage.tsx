import Layout from "@/components/Layout";
import Guide1Ko from "@/assets/guide-1-ko.webp"; // 한국어용 이미지
import Guide1En from "@/assets/guide-1-en.webp"; // 영어용 이미지
import Guide2Ko from "@/assets/guide-2-ko.webp"; // 한국어용 이미지
import Guide2En from "@/assets/guide-2-en.webp"; // 영어용 이미지
import Guide3Ko from "@/assets/guide-3-ko.webp"; // 한국어용 이미지
import Guide3En from "@/assets/guide-3-en.webp"; // 영어용 이미지
import usePriceFormatter from "@/hooks/usePriceFormatter";
import { useTranslation } from "react-i18next";

export default function UserGuidePage() {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const { currentLanguage } = usePriceFormatter();
  // 현재 언어 확인
  const isKorean = currentLanguage === "ko";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t("userGuide.title")}</h1>
        <ol className="list-decimal list-inside space-y-4">
          <li className="bg-gray-100 p-4 rounded shadow">
            <strong className="text-lg">{t("userGuide.step1.title")}</strong>
            <p className="my-2">{t("userGuide.step1.description")}</p>
            <img
              src={isKorean ? Guide1Ko : Guide1En}
              className="object-cover"
              alt="Guide Step 1"
            />
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <strong className="text-lg">{t("userGuide.step2.title")}</strong>
            <p className="my-2">{t("userGuide.step2.description")}</p>
            <img
              src={isKorean ? Guide2Ko : Guide2En}
              className="object-cover"
              alt="Guide Step 2"
            />
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <strong className="text-lg">{t("userGuide.step3.title")}</strong>
            <p className="my-2">{t("userGuide.step3.description")}</p>
            <img
              src={isKorean ? Guide3Ko : Guide3En}
              className="object-cover"
              alt="Guide Step 3"
            />
          </li>
        </ol>
      </div>
    </Layout>
  );
}
