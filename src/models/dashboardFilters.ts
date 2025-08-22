export interface DashboardFiltersType {
  category?: string;
  brand?: string;
  model?: string;
  search?: string;
}
export interface DashboardFiltersProps {
  onFilterChange: (filters: DashboardFiltersType) => void;
  handleClearFilters?: () => void;
  initialFilters: DashboardFiltersType;
  CATEGORY: string[];
  BRANDS: string[];
  MODELS: string[];
}
