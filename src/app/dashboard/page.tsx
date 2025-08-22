"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetChallansQuery } from "../store/challan";
import getCurrentStock from "@/lib/currentStock";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTab } from "../store/ui";
import { cStockChallans } from "@/models/challans";

const thClasses =
  "px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider";
const tdClasses =
  "px-2 py-3 whitespace-nowrap text-center text-sm text-gray-900";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const currentTab = useSelector((state: RootState) => state.ui.currentTab);
  const { data: ALL_CHALLANS } = useGetChallansQuery();

  const { CURRENT_STOCK_CHALLANS } = getCurrentStock(ALL_CHALLANS);

  useEffect(() => {
    if (currentTab !== "Stock Dashboard") {
      dispatch(setCurrentTab("Stock Dashboard"));
    }
  }, [currentTab]);

  return (
    <div className='overflow-x-auto bg-white rounded-lg shadow'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            <th className={thClasses}>No</th>
            <th className={thClasses}>Category</th>
            <th className={thClasses}>Brand</th>
            <th className={thClasses}>Model</th>
            <th className={thClasses}>Qty</th>
            <th className={thClasses}></th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {CURRENT_STOCK_CHALLANS?.map((entry: cStockChallans, i: number) => (
            <tr
              key={`${entry.category}-${entry.brand}-${entry.model}`}
              className='hover:bg-gray-50 cursor-pointer'>
              <td className={tdClasses}>
                {i + 1 < 10 ? "0" + (i + 1) : i + 1}
              </td>
              <td className={tdClasses}>{entry.category}</td>
              <td className={tdClasses}>{entry.brand}</td>
              <td className={tdClasses}>{entry.model}</td>
              <td className={tdClasses}>{entry.qty}</td>
              <td className={tdClasses}>
                <Link href={`/dashboard/${entry.model}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
