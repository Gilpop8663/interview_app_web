import React from "react";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

const DemoVideo: React.FC = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <section id="demo" className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("demo.title")} {/* 번역된 타이틀 사용 */}
        </h2>
        <div className="aspect-w-16 aspect-h-9 flex justify-center">
          <iframe
            className="rounded-lg shadow-lg"
            width="1080"
            height="720"
            src="https://www.youtube.com/embed/eVdAdutmThI?si=T7qP_dWY0zz636sP" // 실제 데모 비디오 URL로 변경해야 합니다
            title={t("demo.videoTitle")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 mb-4">
            {t("demo.description")} {/* 번역된 설명 사용 */}
          </p>
          <a
            href="https://chromewebstore.google.com/detail/threads-follower-check/limbfnbadjaoikobmelblpgmlpfnngec" // 실제 크롬 웹스토어 링크로 변경해야 합니다
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200"
            target="_blank"
            rel="noopener noreferrer" // 보안을 위해 rel 속성 추가
          >
            {t("demo.installButton")} {/* 번역된 설치 버튼 텍스트 사용 */}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
