import { useLogout } from '@/hooks/mutation/user/useLogout';
import { ROUTES } from '@/router/routes';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // useTranslation 훅 임포트

const Header: React.FC = () => {
  const { handleLogout } = useLogout();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation(); // useTranslation 훅 사용
  const currentLanguage = i18n.language;

  const isTermsAndHome =
    pathname === ROUTES.PRIVACY_POLICY ||
    pathname === ROUTES.TERMS ||
    pathname === ROUTES.HOME;

  const isHideLogout = pathname === ROUTES.HOME || isTermsAndHome;

  // 언어 변경 함수
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {isTermsAndHome ? (
          <Link to={ROUTES.HOME} className="text-2xl font-bold text-blue-600">
            {t('header.title')} {/* 번역된 타이틀 사용 */}
          </Link>
        ) : (
          <Link to={ROUTES.MAIN}>
            <h1 className="text-2xl font-bold text-blue-600">
              {t('header.title')} {/* 번역된 타이틀 사용 */}
            </h1>
          </Link>
        )}
        <nav className="flex items-center space-x-4">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={currentLanguage}
            className="border border-gray-300 rounded-lg p-2 mr-5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ko" className="bg-white">
              한국어
            </option>
            <option value="en" className="bg-white">
              English
            </option>
            <option value="en-GB" className="bg-white">
              English (UK)
            </option>
            <option value="en-US" className="bg-white">
              English (US)
            </option>
            <option value="es-ES" className="bg-white">
              Español (Spanish)
            </option>
            <option value="id" className="bg-white">
              Bahasa Indonesia (Indonesian)
            </option>
            <option value="pt-BR" className="bg-white">
              Português (Brasil)
            </option>
            <option value="ja" className="bg-white">
              日本語 (Japanese)
            </option>
            <option value="fr" className="bg-white">
              Français (French)
            </option>
          </select>
          {!isHideLogout && (
            <ul className="flex space-x-4">
              <Link to={ROUTES.USER_GUIDE}>
                <li>
                  <button className="text-gray-600 hover:text-blue-600">
                    {t('header.userGuide')} {/* 번역된 사용방법 사용 */}
                  </button>
                </li>
              </Link>
              <li>
                <Link to={ROUTES.COUPON}>
                  <button className="text-gray-600 hover:text-blue-600">
                    {t('header.useCoupon')} {/* 쿠폰 사용하기 번역 추가 */}
                  </button>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-blue-600"
                >
                  {t('header.logout')} {/* 번역된 로그아웃 사용 */}
                </button>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
