"use client";

import { useState, useEffect, useCallback } from "react";
import { RegisterFilter } from "@/components/challanbook/RegisterFilter";
import { RegisterTable } from "@/components/challanbook/RegisterTable";
import { RegisterEntry, RegisterFilters, ChallanType } from "@/models/register";
import { ChallanTypeButtons } from "@/components/challanbook/ChallanTypeButtons";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/Loading";
import { useGetChallansQuery } from "../store/challan";
import { inwardEntry } from "@/models/models";

export default function RegisterPage() {
  //rtk query will replace these two
  // const [entries, setEntries] = useState<RegisterEntry[]>([]);
  const { data: challans, isLoading } = useGetChallansQuery();
  // const [isLoading, setIsLoading] = useState(true);
  // ui
  const [showFilters, setShowFilters] = useState(false);
  const [activeChallanTab, setActiveChallanTab] =
    useState<ChallanType>("inward");
  // filter purpose
  const [filteredChallans, setFilteredChallans] = useState<inwardEntry[]>([]);
  const [filters, setFilters] = useState<RegisterFilters>({});
  // console.log("filters", filters);

  //filter options variables
  const USERS = [
    ...new Set(
      challans
        ?.filter((challan) => challan.type === activeChallanTab)
        .map((challan) => challan.user)
    ),
  ];
  const CATEGORY = [
    ...new Set(
      challans
        ?.filter((challan) => challan.type === activeChallanTab)
        .map((challan) => challan.category)
    ),
  ];

  const SOURCES = [
    ...new Set(
      challans
        ?.filter((challan) => challan.type === activeChallanTab)
        .map((challan) => challan.source)
    ),
  ];

  useEffect(() => {
    const applyFilters = () => {
      if (!challans?.length) return;

      let result = [...challans];

      // Filter by active tab
      result = result.filter((challan) => challan.type === activeChallanTab);

      // Apply other filters
      if (filters.user) {
        if (filters.user === "all") {
          result = result.filter(
            (challan) => challan.type === activeChallanTab
          );
        } else {
          result = result.filter((challan) => challan.user === filters.user);
        }
      }

      if (filters.category) {
        if (filters.category === "all") {
          result = result.filter(
            (challan) => challan.type === activeChallanTab
          );
        } else {
          result = result.filter(
            (challan) => challan.category === filters.category
          );
        }
      }

      if (filters.source) {
        if (filters.source === "all") {
          result = result.filter(
            (challan) => challan.type === activeChallanTab
          );
        } else {
          result = result.filter(
            (challan) => challan.source === filters.source
          );
        }
      }

      if (filters.startDate && filters.endDate) {
        const startDate = new Date(filters.startDate as string);
        const endDate = new Date(filters.endDate as string);

        result = result.filter((challan) => {
          const entryDate = new Date(challan.createdAt);
          return entryDate >= startDate && entryDate <= endDate;
        });
      }

      setFilteredChallans(result);
    };

    applyFilters();
  }, [challans, activeChallanTab, filters]);

  const handleFilterChange = useCallback((newFilters: RegisterFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  }, []);

  const handleRowClick = useCallback((challan: RegisterEntry) => {
    console.log("Row clicked:", challan);
  }, []);

  const handleClearFilters = () => {
    setFilters({});
    setShowFilters(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto p-3'>
      <div className='flex items-center justify-center gap-4 mb-3'>
        <ChallanTypeButtons
          names={["inward", "outward"]}
          activeChallanTab={activeChallanTab}
          setActiveChallanTab={setActiveChallanTab}
        />
      </div>
      <div className='flex items-center justify-center gap-4 m-3'>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
          <svg
            className='h-5 w-5 text-gray-400'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
            />
          </svg>
          Filters
        </button>
        <button
          className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
      {/* Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title='Filter Challans'>
        <RegisterFilter
          onFilterChange={handleFilterChange}
          users={USERS}
          categories={CATEGORY}
          sources={SOURCES}
          initialFilters={filters}
          setShowFilters={setShowFilters}
        />
      </Modal>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <RegisterTable
          entries={filteredChallans}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
