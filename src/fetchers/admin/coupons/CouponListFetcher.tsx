import { useDeleteCoupon } from '@/hooks/mutation/coupon/useDeleteCoupon';
import { useCouponList } from '@/hooks/query/coupon/useCouponList';
import { Link } from 'react-router-dom';

export default function CouponListFetcher() {
  const { coupons } = useCouponList();
  const { deleteCoupon } = useDeleteCoupon();

  const handleDeleteClick = ({
    couponId,
    name,
  }: {
    couponId: number;
    name: string;
  }) => {
    const result = confirm(`${name}을 정말 삭제하시겠습니까?`);

    if (result) {
      deleteCoupon({ couponId });
    }
  };

  return (
    <tbody>
      {coupons.map((coupon) => (
        <tr key={coupon.id}>
          <td className="border px-4 py-2">{coupon.id}</td>
          <td className="border px-4 py-2">{coupon.code}</td>
          <td className="border px-4 py-2">
            {new Date(coupon.expirationDate).toLocaleDateString('ko-KR')}
            {/* 한국어 형식으로 날짜 표시 */}
          </td>
          <td className="border px-4 py-2">
            {coupon.isActive ? '활성' : '비활성'}
          </td>
          <td className="border px-4 py-2">
            <div className="flex justify-between items-center">
              <Link
                to={`/admin/coupons/edit/${coupon.id}`}
                className="text-blue-500"
              >
                수정
              </Link>

              <Link
                to={`/admin/coupons/${coupon.id}`}
                className="text-blue-500"
              >
                자세히 보기
              </Link>
              <button
                onClick={() =>
                  handleDeleteClick({
                    name: coupon.code,
                    couponId: coupon.id,
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
