import React from "react";
import HeroImage from "@/assets/hero.jpg";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

const Hero: React.FC = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("hero.title")} {/* 번역된 타이틀 사용 */}
          </h1>
          <p className="text-xl mb-8 mr-28">
            {t("hero.description")} {/* 번역된 설명 사용 */}
          </p>
          <Link to={ROUTES.LOGIN}>
            <button
              type="button"
              className="bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              {t("hero.startNow")} {/* 번역된 버튼 텍스트 사용 */}
            </button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={HeroImage}
            alt={t("hero.imageAlt")}
            className="rounded-lg shadow-2xl aspect-square object-cover h-[600px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
