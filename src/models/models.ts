export interface singleProduct {
  brand: string;
  model: string;
  qty: number;
}
export interface inwardEntry {
  from: string;
  product_type: string;
  products: singleProduct[];

  createdAt: string;
  by_user: string;
}
