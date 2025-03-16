import Layout from '@/components/Layout';
import { useCreateProduct } from '@/hooks/mutation/product/useCreateProduct';
import React, { useState } from 'react';

const CreateProductPage: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(''); // 설명 상태 추가
  const { handleCreateProduct } = useCreateProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleCreateProduct({ name, description, price });
  };

  return (
    <Layout>
      <div className="p-8 h-screen">
        <h2 className="text-xl font-bold mb-4">상품 생성</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="상품 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="상품 가격"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 w-full"
            required
          />
          <textarea
            placeholder="상품 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full h-32"
            required
          />
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

export default CreateProductPage;
