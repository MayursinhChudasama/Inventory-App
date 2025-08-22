"use client";
import ChallanCard from "@/components/Stock Dashboard/ChallansCard";
import { cStockChallans, singleChallanEntry } from "@/models/challans";
const CurrentStock: React.FC<{
  currentModel: string;
  CURRENT_STOCK_CHALLANS: cStockChallans[];
  all_inward_challans: singleChallanEntry[];
  all_outward_challans: singleChallanEntry[];
}> = ({
  currentModel,
  CURRENT_STOCK_CHALLANS,
  all_inward_challans,
  all_outward_challans,
}) => {
  return (
    <div>
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
