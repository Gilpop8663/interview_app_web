import PaymentFetcher from "@/fetchers/PaymentFetcher";
import { Suspense } from "react";

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentFetcher />
    </Suspense>
  );
}
