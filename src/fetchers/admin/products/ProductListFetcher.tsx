import { useDeleteProduct } from '@/hooks/mutation/product/useDeleteProduct';
import { useProductList } from '@/hooks/query/product/useProductList';
import { Link } from 'react-router-dom';

export default function ProductListFetcher() {
  const { products } = useProductList();
  const { handleDeleteProduct } = useDeleteProduct();

  const handleDeleteClick = ({
    productId,
    name,
  }: {
    productId: number;
    name: string;
  }) => {
    const result = confirm(`${name}을 정말 삭제하시겠습니까?`);

    if (result) {
      handleDeleteProduct({ productId });
    }
  };

  return (
    <tbody>
      {products.map((product) => (
        <tr key={product.id}>
          <td className="border px-4 py-2">{product.id}</td>
          <td className="border px-4 py-2">{product.name}</td>
          <td className="border px-4 py-2">
            {product.price.toLocaleString()}원
          </td>
          <td className="border px-4 py-2">{product.description}</td>
          <td className="border px-4 py-2">
            <div className="flex justify-between items-center">
              <Link
                to={`/admin/products/edit/${product.id}`}
                className="text-blue-500"
              >
                수정
              </Link>

              <Link
                to={`/admin/products/${product.id}`}
                className="text-blue-500"
              >
                자세히 보기
              </Link>
              <button
                onClick={() =>
                  handleDeleteClick({
                    name: product.name,
                    productId: product.id,
                  })
                }
                type="button"
                className="text-red-500"
              >
                삭제
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
