"use client";

import { useState, useEffect, useCallback } from "react";
import { RegisterFilter } from "@/components/challanbook/RegisterFilter";
import { RegisterTable } from "@/components/challanbook/RegisterTable";
import { RegisterFilters, ChallanType } from "@/models/register";
import { ChallanTypeButtons } from "@/components/challanbook/ChallanTypeButtons";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/Loading";
import { useGetChallansQuery } from "../store/challan";
import { inwardEntry } from "@/models/models";
import FilterButton from "@/components/challanbook/FilterButton";

export default function RegisterPage() {
  const { data: challans, isLoading } = useGetChallansQuery();
  // ui
  const [showFilters, setShowFilters] = useState(false);
  const [activeChallanTab, setActiveChallanTab] =
    useState<ChallanType>("inward");
  // filter purpose
  const [filteredChallans, setFilteredChallans] = useState<inwardEntry[]>([]);
  const [filters, setFilters] = useState<RegisterFilters>({});

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

  const handleClearFilters = () => {
    setFilters({});
    setShowFilters(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto p-3'>
      <div className='flex items-center justify-center gap-4 '>
        <ChallanTypeButtons
          names={["inward", "outward"]}
          activeChallanTab={activeChallanTab}
          setActiveChallanTab={setActiveChallanTab}
        />
      </div>

      <div className='flex items-center justify-center gap-4 '>
        <FilterButton
          setShowFilters={setShowFilters}
          onClearFilters={handleClearFilters}
        />
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
