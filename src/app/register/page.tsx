'use client';

import { useState, useEffect } from 'react';
import { RegisterFilter } from '@/components/register/RegisterFilter';
import { RegisterTable } from '@/components/register/RegisterTable';
import { RegisterEntry, RegisterFilters } from '@/types/register';
import { ActionButton } from '@/components/ui/ActionButton';

export default function RegisterPage() {
  const [entries, setEntries] = useState<RegisterEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<RegisterEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique users and categories for filters
  const users = Array.from(new Set(entries.map(entry => entry.user)));
  const categories = Array.from(new Set(entries.map(entry => entry.category)));

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // For now, we'll use the dummy data directly
        const response = await fetch('/api/register-entries');
        const data = await response.json();
        setEntries(data);
        setFilteredEntries(data);
      } catch (error) {
        console.error('Error fetching register entries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filters: RegisterFilters) => {
    let result = [...entries];

    if (filters.type) {
      result = result.filter(entry => entry.type === filters.type);
    }

    if (filters.user) {
      result = result.filter(entry => entry.user === filters.user);
    }

    if (filters.category) {
      result = result.filter(entry => entry.category === filters.category);
    }

    if (filters.startDate && filters.endDate) {
      result = result.filter(entry => {
        const entryDate = new Date(entry.createdAt);
        const startDate = new Date(filters.startDate!);
        const endDate = new Date(filters.endDate!);
        return entryDate >= startDate && entryDate <= endDate;
      });
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(entry => 
        entry.challan_no.toLowerCase().includes(query)
      );
    }

    setFilteredEntries(result);
  };

  const handleRowClick = (entry: RegisterEntry) => {
    // Handle row click (e.g., navigate to detail view)
    console.log('Selected entry:', entry);
  };

  const handleAddNew = () => {
    // Handle add new entry
    console.log('Add new entry');
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
        <h1 className='text-2xl font-bold text-gray-800'>Challan Register</h1>
        <div className='flex gap-3'>
          <ActionButton 
            variant='outline' 
            onClick={() => setShowFilters(!showFilters)}
            className='flex items-center gap-2'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 11-2 0V4H5v2a1 1 0 11-2 0V3zm0 6a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 100 2h12a1 1 0 100-2H3z" clipRule="evenodd" />
            </svg>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </ActionButton>
          <ActionButton 
            onClick={handleAddNew}
            className='flex items-center gap-2'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New
          </ActionButton>
        </div>
      </div>

      {showFilters && (
        <div className='mb-6'>
          <RegisterFilter 
            onFilterChange={handleFilterChange} 
            users={users} 
            categories={categories} 
          />
        </div>
      )}

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <RegisterTable 
          entries={filteredEntries} 
          onRowClick={handleRowClick} 
        />
      </div>
    </div>
  );
}
