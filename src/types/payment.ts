import { Order } from "./order";

export interface Payment {
  id: number;
  amount: number;
  status: PaymentStatus; // 예: 'PENDING', 'COMPLETED', 'FAILED', 등
  transactionId: string;
  order: Order;
  currency: CurrencyStatus;
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type CurrencyStatus = "KRW" | "USD";
