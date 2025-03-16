import React from "react";
import { useTranslation } from "react-i18next"; // useTranslation 훅 임포트

const Testimonials: React.FC = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용

  const testimonials = [
    {
      name: t("testimonials.firstInterviewerName"),
      role: t("testimonials.firstInterviewerRole"),
      content: t("testimonials.firstInterviewerContent"),
    },
    {
      name: t("testimonials.secondInterviewerName"),
      role: t("testimonials.secondInterviewerRole"),
      content: t("testimonials.secondInterviewerContent"),
    },
    {
      name: t("testimonials.thirdInterviewerName"),
      role: t("testimonials.thirdInterviewerRole"),
      content: t("testimonials.thirdInterviewerContent"),
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("testimonials.title")} {/* 번역된 타이틀 사용 */}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
