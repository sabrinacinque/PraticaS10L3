import { iProduct } from "./i-product";

export interface ApiResponse {
  products: iProduct[];
  total: number;
  skip: number;
  limit: number;
}
