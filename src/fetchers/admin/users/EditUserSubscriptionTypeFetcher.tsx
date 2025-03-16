import { useEditUserSubscriptionType } from '@/hooks/mutation/user/useEditUserSubscriptionType';
import { useUserProfile } from '@/hooks/query/users/useUserProfile';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

type SubscriptionType = 'FREE' | 'PREMIUM';

export default function EditUserSubscriptionTypeFetcher() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const { user } = useUserProfile({ userId });
  const { handleUserSubscriptionType } = useEditUserSubscriptionType();
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>(
    user.subscriptionType
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 상품 수정 로직 추가

    handleUserSubscriptionType({
      userId,
      subscriptionType,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubscriptionType(event.target.value as SubscriptionType); // 선택된 값 업데이트
  };

  return (
    <div className="p-8 h-screen">
      <h2 className="text-xl font-bold mb-4">계정 구독 유형 수정</h2>
      <div>
        <div>
          <span>이메일: </span>
          <span>{user.email}</span>
        </div>
        <div>
          <span>구독 유형: </span>
          <span>{user.subscriptionType}</span>
        </div>
        <div>
          <span>계정 유형: </span>
          <span>{user.role}</span>
        </div>
        <div>
          <span>포인트: </span>
          <span>{user.point}</span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 border"
      >
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="subscriptionType"
        >
          계정 유형 선택
        </label>
        <select
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="subscriptionType"
          id="subscriptionType"
          defaultValue={user.subscriptionType}
        >
          <option value="FREE">무료</option>
          <option value="PREMIUM">프리미엄</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          수정
        </button>
      </form>
    </div>
  );
}
