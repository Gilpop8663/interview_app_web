import { useTranslation } from "react-i18next"; // i18next 훅 임포트

const useDateFormat = () => {
  const { i18n } = useTranslation(); // 현재 언어 설정 가져오기

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language, {
      // 현재 언어에 맞게 포맷팅
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return { formatDate };
};

export default useDateFormat;
