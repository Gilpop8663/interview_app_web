import Layout from '@/components/Layout';
import { useCreateCoupon } from '@/hooks/mutation/coupon/useCreateCoupon';
import React, { useEffect, useState } from 'react';

const CreateCouponPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [expirationDate, setExpirationDate] = useState<Date | null>(null); // 만료일 상태 추가
  const [isActive, setIsActive] = useState(true); // 활성화 상태 추가
  const { createCoupon } = useCreateCoupon();

  // 컴포넌트가 마운트될 때 기본 만료일 설정
  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    setExpirationDate(nextMonth);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (expirationDate) {
      // 만료일이 설정된 경우에만 쿠폰 생성
      await createCoupon({ code, expirationDate, isActive });
    } else {
      alert('만료일을 설정해 주세요.');
    }
  };

  function generateRandomCouponCode(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  const onCouponRandomClick = () => {
    const randomValue = generateRandomCouponCode();
    setCode(randomValue);
  };

  return (
    <Layout>
      <div className="p-8 h-screen">
        <h2 className="text-xl font-bold mb-4">쿠폰 생성</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="쿠폰 코드"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border p-2 w-full"
              required
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-sm absolute right-0 text-sm"
              type="button"
              onClick={onCouponRandomClick}
            >
              쿠폰 랜덤값 생성
            </button>
          </div>
          <input
            type="date"
            placeholder="만료일"
            value={
              expirationDate ? expirationDate.toISOString().split('T')[0] : ''
            }
            onChange={(e) => setExpirationDate(new Date(e.target.value))}
            className="border p-2 w-full"
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mr-2"
            />
            활성화
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            생성
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCouponPage;
