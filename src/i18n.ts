import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector) // 언어 감지 기능 추가
  .use(initReactI18next)
  .init({
    fallbackLng: "en_US", // 감지할 언어가 없는 경우 사용할 기본 언어
    detection: {
      // 감지 옵션 설정
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"], // 언어를 저장할 곳
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
