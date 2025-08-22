import getCurrentStock from "@/lib/currentStock";
import { useGetChallansQuery } from "../../store/challan";
import { singleChallanEntry } from "@/models/challans";
import CurrentStock from "@/components/Stock Dashboard/CurrentStock";

const SpecificModelPage = ({ params }: { params: { model: string } }) => {
  const { model } = params;

  const currentModel = decodeURIComponent(model);
  const { data: ALL_CHALLANS } = useGetChallansQuery();

  const {
    inwardChallansFlatArr,
    outwardChallansFlatArr,
    CURRENT_STOCK_CHALLANS,
  } = getCurrentStock(ALL_CHALLANS);

  const all_inward_challans = inwardChallansFlatArr?.filter(
    (entry: singleChallanEntry) => entry.model === currentModel
  );

  const all_outward_challans = outwardChallansFlatArr?.filter(
    (entry: singleChallanEntry) => entry.model === currentModel
  );

  const totalOutward = all_outward_challans?.reduce(
    (total: number, entry: singleChallanEntry) => total + entry.qty,
    0
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2 '>
          {all_inward_challans[0].brand} {currentModel}
        </h1>
        <div className='w-40 h-1 bg-blue-600'></div>
      </div>
      <CurrentStock
        currentModel={currentModel}
        CURRENT_STOCK_CHALLANS={CURRENT_STOCK_CHALLANS}
        all_inward_challans={all_inward_challans}
        all_outward_challans={all_outward_challans}
      />
    </div>
  );
};

export default SpecificModelPage;
