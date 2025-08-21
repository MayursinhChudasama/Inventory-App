export interface RegisterEntry {
  type: "inward" | "outward";
  challan_no: string;
  category: string;
  user: string;
  createdAt: string;
  products: {
    brand: string;
    model: string;
    quantity: number;
  }[];
}

export type ChallanType = "inward" | "outward";

export interface RegisterFilters {
  source?: string;
  type?: ChallanType;
  startDate?: string;
  endDate?: string;
  category?: string;
  user?: string;
  searchQuery?: string;
}
