import { useProductDetail } from "@/hooks/query/product/useProductDetail";
import { useParams } from "react-router-dom";

export const ProductDetailFetcher = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { product } = useProductDetail({ productId });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">상품 상세 보기</h2>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
          <p className="text-lg text-gray-700 mb-4">
            가격: <span className="font-bold">${product.price}</span>
          </p>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};
