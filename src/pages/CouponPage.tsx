import Layout from '@/components/Layout';
import { useCouponMutation } from '@/hooks/mutation/coupon/useUseCoupon';
import { showToast } from '@/lib/toast';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CouponPage: React.FC = () => {
  const { t } = useTranslation(); // useTranslation 훅 사용
  const [couponCode, setCouponCode] = useState<string>('');
  const { handleCouponRegister } = useCouponMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      showToast(t('couponPage.placeholder'), 'error');

      return;
    }

    await handleCouponRegister({ code: couponCode });
    setCouponCode('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('couponPage.title')}
              </h2>
              <p className="text-gray-600">{t('couponPage.description')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={t('couponPage.placeholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="mt-2 text-sm text-gray-500">
                  {t('couponPage.caseSensitive')}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold"
              >
                {t('couponPage.submitButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CouponPage;
