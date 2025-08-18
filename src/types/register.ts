export interface RegisterEntry {
  type: 'inward' | 'outward';
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

export interface RegisterFilters {
  type?: 'inward' | 'outward';
  startDate?: string;
  endDate?: string;
  category?: string;
  user?: string;
  searchQuery?: string;
}
