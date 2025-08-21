export interface singleProduct {
  brand: string;
  model: string;
  qty: number;
}
export interface inwardEntry {
  _id?: string;
  type: string;
  category: string;
  challan_no: string;
  source: string;
  user: string;
  products: singleProduct[];
  createdAt: string;
  lastUpdatedAt: string | null;
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
