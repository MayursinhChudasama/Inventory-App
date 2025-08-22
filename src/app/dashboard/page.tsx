"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getCurrentStock from "@/lib/currentStock";
import { RootState } from "../store/store";
import { useGetChallansQuery } from "../store/challan";
import { setCurrentTab } from "../store/ui";
import { cStockChallans } from "@/models/challans";
import DashboardFilters from "@/components/Stock Dashboard/DashboardFilters";
import Modal from "@/components/ui/Modal";
import { DashboardFiltersType } from "@/models/dashboardFilters";
import { useRouter } from "next/navigation";
import { inwardEntry } from "@/models/models";
import Loading from "@/components/Loading";

const thClasses =
  "px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider";
const tdClasses =
  "px-2 py-3 whitespace-nowrap text-center text-sm text-gray-900";

export default function DashboardPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const currentTab = useSelector((state: RootState) => state.ui.currentTab);
  const { data: ALL_CHALLANS, isLoading, isSuccess } = useGetChallansQuery();
  const { CURRENT_STOCK_CHALLANS } = getCurrentStock(ALL_CHALLANS);

  const [filters, setFilters] = useState<DashboardFiltersType>({});
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  console.log("selectedBrand-->", selectedBrand);
  const CATEGORY = [
    ...new Set(CURRENT_STOCK_CHALLANS?.map((challan) => challan.category)),
  ];
  const BRANDS = [
    ...new Set(CURRENT_STOCK_CHALLANS?.map((challan) => challan.brand)),
  ];
  const MODELS = [
    ...new Set(
      CURRENT_STOCK_CHALLANS?.filter(
        (challan) => challan.brand === selectedBrand
      ).map((challan) => challan.model)
    ),
  ];

  function handleFilterChange(newFilters: DashboardFiltersType) {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }
  function handleClearFilters() {
    setFilters({});
    setSelectedBrand("");
  }
  const [filteredChallans, setFilteredChallans] = useState<cStockChallans[]>(
    []
  );
  useEffect(() => {
    if (currentTab !== "Stock Dashboard") {
      dispatch(setCurrentTab("Stock Dashboard"));
    }
  }, [currentTab]);

  useEffect(() => {
    function applyFilters() {
      if (!CURRENT_STOCK_CHALLANS?.length) return;

      let result = [...CURRENT_STOCK_CHALLANS];

      if (filters.search && filters.search !== "") {
        result = result.filter(
          (challan) =>
            challan.model
              .toLowerCase()
              .includes(filters.search.toLowerCase()) ||
            challan.brand.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.category) {
        if (filters.category === "all") {
          result = [...CURRENT_STOCK_CHALLANS];
        } else {
          result = result.filter(
            (challan) => challan.category === filters.category
          );
        }
      }

      if (filters.brand) {
        if (filters.brand === "all") {
          result = [...CURRENT_STOCK_CHALLANS];
        } else {
          result = result.filter((challan) => challan.brand === filters.brand);
        }
      }

      if (filters.model) {
        if (filters.model === "all") {
          result = [
            ...CURRENT_STOCK_CHALLANS.filter(
              (challan) => challan.brand === selectedBrand
            ),
          ];
        } else {
          result = result.filter((challan) => challan.model === filters.model);
        }
      }

      // if (filters.startDate && filters.endDate) {
      //   const startDate = new Date(filters.startDate as string);
      //   const endDate = new Date(filters.endDate as string);

      //   result = result.filter((challan) => {
      //     const entryDate = new Date(challan.createdAt);
      //     return entryDate >= startDate && entryDate <= endDate;
      //   });
      // }

      setFilteredChallans(result);
    }

    applyFilters();
  }, [filters, ALL_CHALLANS]);

  return (
    <div className='overflow-x-auto bg-white rounded-lg shadow m-1.5'>
      <div className='p-2 bg-gray-50 rounded-t-lg '>
        <DashboardFilters
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          onFilterChange={handleFilterChange}
          handleClearFilters={handleClearFilters}
          initialFilters={filters}
          CATEGORY={CATEGORY}
          BRANDS={BRANDS}
          MODELS={MODELS}
        />
      </div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            <th className={thClasses}>No</th>
            <th className={thClasses}>Category</th>
            <th className={thClasses}>Brand</th>
            <th className={thClasses}>Model</th>
            <th className={thClasses}>Qty</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {isLoading && (
            <tr>
              <td
                colSpan={5}
                className='text-center text-gray-500 py-4'>
                fetching entries...
              </td>
            </tr>
          )}
          {isSuccess &&
            filteredChallans?.map((entry: cStockChallans, i: number) => (
              <tr
                onClick={() => {
                  router.push(`/dashboard/${entry.model}`);
                }}
                key={`${entry.category}-${entry.brand}-${entry.model}`}
                className='hover:bg-gray-50 cursor-pointer'>
                <td className={tdClasses}>
                  {i + 1 < 10 ? "0" + (i + 1) : i + 1}
                </td>
                <td className={tdClasses}>{entry.category}</td>
                <td className={tdClasses}>{entry.brand}</td>
                <td className={tdClasses}>{entry.model}</td>
                <td className={tdClasses}>{entry.qty}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
