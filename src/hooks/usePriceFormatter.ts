import { useTranslation } from "react-i18next";

const usePriceFormatter = () => {
  const { i18n } = useTranslation();

  // 현재 언어를 가져옵니다. (예: 'ko' 또는 'en')
  const currentLanguage = i18n.language.split("-")[0];

  // 가격 포맷팅 함수
  const formatPrice = (price: number): string => {
    if (currentLanguage === "ko") {
      return `${price.toLocaleString()}원`; // 한국어일 경우 원으로 표시
    } else {
      return `$${price}`; // 영어일 경우 달러로 표시, 9900원을 약 8.99달러로 변환 (환율 예시)
    }
  };

  return { currentLanguage, formatPrice };
};

export default usePriceFormatter;
