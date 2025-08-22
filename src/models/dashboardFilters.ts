export interface DashboardFiltersType {
  category?: string;
  brand?: string;
  model?: string;
  search?: string;
}
export interface DashboardFiltersProps {
  selectedBrand?: string;
  setSelectedBrand: (brand: string) => void;
  onFilterChange: (filters: DashboardFiltersType) => void;
  handleClearFilters?: () => void;
  initialFilters: DashboardFiltersType;
  CATEGORY: string[];
  BRANDS: string[];
  MODELS: string[];
}
