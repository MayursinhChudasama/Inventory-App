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

export interface User {
  _id?: string;
  username: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  role: "admin" | "user";
}
