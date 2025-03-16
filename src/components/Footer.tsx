import { ROUTES } from "@/router/routes";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

const Footer: React.FC = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">
              {t("footer.title")} {/* 번역된 타이틀 사용 */}
            </h3>
            <p className="text-gray-400">
              {t("footer.description")} {/* 번역된 설명 사용 */}
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">
              {t("footer.contactUs")}
            </h4>
            <p className="text-gray-400">
              <a href="mailto:wolfye0611@gmail.com">
                {t("footer.email")} {/* 번역된 이메일 사용 */}
              </a>
            </p>
            <p className="text-gray-400 mt-4">
              <a href="tel:070-8080-0644">
                {t("footer.phone")} {/* 번역된 전화 사용 */}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          {t("footer.copyright")} {/* 번역된 저작권 사용 */}
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          {t("footer.businessRegistration")} {/* 번역된 사업자 등록번호 사용 */}
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          {t("footer.hostingService")} {/* 번역된 호스팅 서비스 사용 */}
          <a
            className="text-gray-500 ml-1"
            href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=8485200702"
          >
            {t("footer.businessInfo")} {/* 번역된 사업자 정보 사용 */}
          </a>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          {t("footer.address")} {/* 번역된 주소 사용 */}
        </div>
        <div className="flex gap-2 mt-8 text-gray-400 text-sm justify-center items-center">
          <Link to={ROUTES.TERMS} target="_blank">
            <div className="text-center">{t("footer.terms")}</div>
          </Link>
          <span>|</span>
          <Link to={ROUTES.PRIVACY_POLICY} target="_blank">
            <div className="text-center">{t("footer.privacyPolicy")}</div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
