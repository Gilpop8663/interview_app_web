import { Product } from "node_modules/@portone/browser-sdk/dist/v2/entity";
import { User } from "./user";
import { CurrencyStatus } from "./payment";

export interface Order {
  id: number;
  totalAmount: number;
  status: OrderStatus;
  user: User;
  product: Product;
  currency: CurrencyStatus;
}

export type OrderStatus = "PENDING" | "COMPLETED" | "FAILED";
