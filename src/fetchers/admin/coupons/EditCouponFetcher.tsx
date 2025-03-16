import { useUpdateCoupon } from '@/hooks/mutation/coupon/useUpdateCoupon';
import { useCouponDetail } from '@/hooks/query/coupon/useCouponDetail';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EditCouponFetcher() {
  const { id } = useParams<{ id: string }>();
  const couponId = Number(id);
  const { coupon } = useCouponDetail({ couponId });
  const [code, setCode] = useState('');
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState(true);
  const { updateCoupon } = useUpdateCoupon();

  useEffect(() => {
    if (coupon) {
      setCode(coupon.code);
      setExpirationDate(new Date(coupon.expirationDate)); // 날짜 변환
      setIsActive(coupon.isActive);
    }
  }, [coupon]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (expirationDate) {
      await updateCoupon({ couponId, code, expirationDate, isActive });
    } else {
      alert('만료일을 설정해 주세요.');
    }
  };

  return (
    <div className="p-8 h-screen">
      <h2 className="text-xl font-bold mb-4">쿠폰 수정</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="쿠폰 코드"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 w-full"
          required
        />
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
          수정
        </button>
      </form>
    </div>
  );
}
