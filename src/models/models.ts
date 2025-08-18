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
  _id?: string | undefined;
  username: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  role: "admin" | "user";
}

export interface CreateUser {
  name: string;
  username: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  username?: string;
  passwordHash?: string;
  role?: "admin" | "user";
}
