import { useState } from "react";
import { RegisterFilters } from "@/models/register";
import { DateRangeFilter } from "./DateRangeFilter";

interface RegisterFilterProps {
  onFilterChange: (filters: RegisterFilters) => void;
  users: string[];
  categories: string[];
  sources: string[];
  initialFilters?: RegisterFilters;
  setShowFilters: (show: boolean) => void;
}

export const RegisterFilter: React.FC<RegisterFilterProps> = ({
  onFilterChange,
  users,
  categories,
  sources,
  initialFilters = {},
  setShowFilters,
}) => {
  const [filters, setFilters] = useState<RegisterFilters>(initialFilters);

  const handleFilterChange = (newFilters: Partial<RegisterFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className='space-y-4 p-4 rounded-lg'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* User Filter */}
        <div className='bg-white rounded-lg '>
          <h3 className='font-medium text-gray-700 mb-2 text-center'>User</h3>
          <select
            defaultValue={initialFilters.user || "all"}
            className='w-full p-2 border rounded-md'
            onChange={(e) => handleFilterChange({ user: e.target.value })}>
            <option
              className='w-full'
              value='all'>
              All Users
            </option>
            {users.map((user) => (
              <option
                key={user}
                value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className='bg-white rounded-lg'>
          <h3 className='font-medium text-gray-700 mb-2 text-center'>
            Category
          </h3>
          <select
            className='w-full p-2 border rounded-md'
            defaultValue={initialFilters.category || "all"}
            onChange={(e) =>
              handleFilterChange({ category: e.target.value || undefined })
            }>
            <option value='all'>All Categories</option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* Sources Filter */}
        <div className='bg-white rounded-lg'>
          <h3 className='font-medium text-gray-700 mb-2 text-center'>
            Sources
          </h3>
          <select
            className='w-full p-2 border rounded-md'
            defaultValue={initialFilters.source || "all"}
            onChange={(e) =>
              handleFilterChange({ source: e.target.value || undefined })
            }>
            <option value='all'>All Sources</option>
            {sources.map((source) => (
              <option
                key={source}
                value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <DateRangeFilter
          setShowFilters={setShowFilters}
          onDateRangeChange={(startDate, endDate) =>
            handleFilterChange({ startDate, endDate })
          }
        />
      </div>
    </div>
  );
};
