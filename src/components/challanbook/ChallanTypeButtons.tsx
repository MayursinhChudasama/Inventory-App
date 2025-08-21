import { Dispatch, SetStateAction } from "react";

type ChallanType = "inward" | "outward"; // Make sure this matches your actual type

export const ChallanTypeButtons: React.FC<{
  activeChallanTab: ChallanType;
  setActiveChallanTab: Dispatch<SetStateAction<ChallanType>>;
  names: ChallanType[];
}> = ({ names, setActiveChallanTab, activeChallanTab }) => {
  return (
    <div className='pb-5'>
      <div className='flex justify-center space-x-2 '>
        <button
          onClick={() => setActiveChallanTab(names[0])}
          className={`px-6 py-2 transition-colors ${
            activeChallanTab === names[0]
              ? "bg-blue-500 text-white rounded-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}>
          {names[0].toUpperCase()}
        </button>
        <button
          onClick={() => setActiveChallanTab(names[1])}
          className={`px-6 py-2 transition-colors ${
            activeChallanTab === names[1]
              ? "bg-blue-500 text-white rounded-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}>
          {names[1].toUpperCase()}
        </button>
      </div>
    </div>
  );
};
