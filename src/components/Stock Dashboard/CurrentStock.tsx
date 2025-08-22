"use client";
import ChallanCard from "@/components/Stock Dashboard/ChallansCard";
import { cStockChallans, singleChallanEntry } from "@/models/challans";
import getCurrentStock from "@/lib/currentStock";
import { useGetChallansQuery } from "../../app/store/challan";
const CurrentStock: React.FC<{ model: string }> = ({ model }) => {
  const currentModel = decodeURIComponent(model);
  const { data: ALL_CHALLANS, isLoading, error } = useGetChallansQuery();
  if (!ALL_CHALLANS) {
    return;
  }
  const {
    inwardChallansFlatArr,
    outwardChallansFlatArr,
    CURRENT_STOCK_CHALLANS,
  } = getCurrentStock(ALL_CHALLANS || []);

  const all_inward_challans =
    inwardChallansFlatArr?.filter(
      (entry: singleChallanEntry) => entry.model === currentModel
    ) ?? [];

  const all_outward_challans =
    outwardChallansFlatArr?.filter(
      (entry: singleChallanEntry) => entry.model === currentModel
    ) ?? [];

  const totalOutward =
    all_outward_challans?.reduce(
      (total: number, entry: singleChallanEntry) => total + entry.qty,
      0
    ) ?? 0;

  if (isLoading) {
    return <div className='container mx-auto px-4 py-8'>Loading...</div>;
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>Error loading data</div>
    );
  }
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2 '>
          {all_inward_challans[0]?.brand} {currentModel}
        </h1>
        <div className='w-40 h-1 bg-blue-600'></div>
      </div>
      {/* Current Stock */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>
          Current Stock
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {CURRENT_STOCK_CHALLANS?.filter(
            (item: cStockChallans) => item.model === currentModel
          ).map((item: cStockChallans) => (
            <div
              key={item.model}
              className='bg-blue-50 p-4 rounded-lg flex justify-between'>
              <p className='text-3xl font-bold text-blue-600'>{item.qty}</p>
              {/* <span className='flex gap-5 '> */}
              {/* <p className='text-sm text-gray-600 mt-2'>
              {totalInward} - {totalOutward}
            </p> */}
              {/* </span> */}
              <p className='text-sm text-gray-600 mt-2'>- {item.category}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Inward Challans */}
        <ChallanCard
          type='Inward'
          all_challans={all_inward_challans}
        />

        {/* Outward Challans */}
        <ChallanCard
          type='Outward'
          all_challans={all_outward_challans}
        />
      </div>
    </div>
  );
};
export default CurrentStock;
