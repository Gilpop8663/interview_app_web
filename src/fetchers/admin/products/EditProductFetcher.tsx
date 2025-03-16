import { useEditProduct } from '@/hooks/mutation/product/useEditProduct';
import { useProductDetail } from '@/hooks/query/product/useProductDetail';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EditProductFetcher() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { product } = useProductDetail({ productId });
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const { handleEditProduct } = useEditProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 상품 수정 로직 추가
    handleEditProduct({ productId, name, price, description });
  };

  return (
    <div className="p-8 h-screen">
      <h2 className="text-xl font-bold mb-4">상품 수정</h2>
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
          수정
        </button>
      </form>
    </div>
  );
}
