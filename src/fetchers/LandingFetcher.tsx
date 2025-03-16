import PricingComparison from "@/components/PricingComparison";
import { useProductDetail } from "@/hooks/query/product/useProductDetail";
import usePriceFormatter from "@/hooks/usePriceFormatter";

export default function LandingFetcher() {
  const { currentLanguage } = usePriceFormatter();
  const isKorean = currentLanguage === "ko";

  const MONTHLY_PRODUCT_ID = isKorean
    ? process.env.VITE_PREMIUM_MONTHLY_PRODUCT_ID
    : process.env.VITE_PREMIUM_DOLLAR_MONTHLY_PRODUCT_ID;

  const YEARLY_PRODUCT_ID = isKorean
    ? process.env.VITE_PREMIUM_YEARLY_PRODUCT_ID
    : process.env.VITE_PREMIUM_DOLLAR_YEARLY_PRODUCT_ID;

  const monthlyProductId = Number(MONTHLY_PRODUCT_ID) || 1;
  const yearlyProductId = Number(YEARLY_PRODUCT_ID) || 2;

  const { product: monthlyProduct } = useProductDetail({
    productId: monthlyProductId,
  });
  const { product: yearlyProduct } = useProductDetail({
    productId: yearlyProductId,
  });

  const monthlyPrice = monthlyProduct.price; // 월간 가격
  const yearlyPrice = yearlyProduct.price;

  return (
    <PricingComparison
      isLoggedIn={false}
      monthlyPrice={monthlyPrice}
      yearlyPrice={yearlyPrice}
    />
  );
}
