import React from "react";
import EventImage from "@/assets/event.png";
import { useTranslation } from "react-i18next";

const EventPage: React.FC = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  return (
    <div className="flex flex-col items-center justify-center p-6 ">
      <div className="max-w-2xl bg-white rounded-lg shadow-lg p-8 border">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {t("event.title")}
        </h1>
        <p className="text-gray-700 mb-6 text-lg">{t("event.description")}</p>
        <img
          src={EventImage}
          alt={t("event.imageAlt")}
          className="border p-3 mb-6"
        />
        <p className="text-gray-700 mb-6 text-lg">{t("event.instructions")}</p>
        <ul className="list-disc list-inside mb-6">
          <li className="text-gray-700">
            {t("event.instagramDM")}
            <a
              href="https://www.instagram.com/matzip_saga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              @matzip_saga
            </a>
          </li>
          <li className="text-gray-700">
            {t("event.email")}
            <a
              href="mailto:wolfye0611@gmail.com"
              className="text-blue-600 underline"
            >
              wolfye0611@gmail.com
            </a>
          </li>
        </ul>
        <p className="text-gray-700 mb-6 text-lg">{t("event.couponInfo")}</p>
        <p className="text-gray-700 mb-6 text-lg">{t("event.wordLimit")}</p>
        <a
          href="https://chromewebstore.google.com/detail/insta-thread-engage-bot/limbfnbadjaoikobmelblpgmlpfnngec/reviews"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("event.participateButton")}
        </a>
      </div>
    </div>
  );
};

export default EventPage;
