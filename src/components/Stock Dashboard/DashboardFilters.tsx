import {
  DashboardFiltersType,
  DashboardFiltersProps,
} from "@/models/dashboardFilters";
import { useState } from "react";
import FilterSelect from "./FilterSelect";

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  selectedBrand,
  onFilterChange,
  setSelectedBrand,
  handleClearFilters,
  initialFilters = {},
  CATEGORY,
  BRANDS,
  MODELS,
}) => {
  const [trigger, setTrigger] = useState<boolean>(false);

  function handleFilterChange(newFilters: Partial<DashboardFiltersType>) {
    onFilterChange(newFilters);
  }
  //
  // console.log("filters---", filters);
  // console.log("initialFilters---", initialFilters);
  return (
    <div className='space-y-4 p-4 rounded-lg'>
      {/* Search Bar & Clear Filters */}
      <div className='flex items-center justify-between gap-4 mb-5'>
        <div className='relative w-64'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <svg
              className='h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'>
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <input
            value={initialFilters?.search ?? ""}
            onChange={(e) =>
              handleFilterChange({ search: e.target.value ?? undefined })
            }
            type='search'
            className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm'
            placeholder='Search by Brand or Model'
          />
        </div>
        <button
          onClick={() => {
            handleClearFilters();
            setTrigger((prev) => !prev);
          }}
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap'>
          Clear Filters
        </button>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-5 '>
        {/* Date
        <div>
          <p className='text-xs text-gray-500 mb-1'>Date</p>
          <div className='p-2 border border-gray-300 rounded-md bg-white text-sm'>
            Select Date
          </div>
        </div> */}
        {/* Category */}
        <div>
          <FilterSelect
            key='category'
            label='Category'
            options={CATEGORY}
            defValue={initialFilters.category || "all"}
            onChange={handleFilterChange}
          />
        </div>
        {/* Brand */}
        <div>
          <FilterSelect
            key='brand'
            label='Brand'
            options={BRANDS}
            defValue={initialFilters.brand || "all"}
            onChange={handleFilterChange}
            setSelectedBrand={setSelectedBrand}
          />
        </div>
        {/* Model */}
        <div>
          <FilterSelect
            key='model'
            label='Model'
            isDisabled={!selectedBrand || initialFilters.brand === "all"}
            options={MODELS}
            defValue={initialFilters.model || "all"}
            onChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;
