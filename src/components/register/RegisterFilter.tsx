import { useState } from 'react';
import { RegisterFilters } from '@/types/register';
import { DateRangeFilter } from './DateRangeFilter';

interface RegisterFilterProps {
  onFilterChange: (filters: RegisterFilters) => void;
  users: string[];
  categories: string[];
}

export const RegisterFilter: React.FC<RegisterFilterProps> = ({
  onFilterChange,
  users,
  categories,
}) => {
  const [filters, setFilters] = useState<RegisterFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (newFilters: Partial<RegisterFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, searchQuery });
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by challan no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-2">Type</h3>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) =>
              handleFilterChange({
                type: e.target.value as 'inward' | 'outward' | '',
              })
            }
          >
            <option value="">All Types</option>
            <option value="inward">Inward</option>
            <option value="outward">Outward</option>
          </select>
        </div>

        {/* User Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-2">User</h3>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => handleFilterChange({ user: e.target.value || undefined })}
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-2">Category</h3>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => handleFilterChange({ category: e.target.value || undefined })}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <DateRangeFilter
          onDateRangeChange={(startDate, endDate) =>
            handleFilterChange({ startDate, endDate })
          }
        />
      </div>
    </div>
  );
};
