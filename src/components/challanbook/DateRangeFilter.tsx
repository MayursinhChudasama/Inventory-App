import { useState } from "react";

export const DateRangeFilter = ({
  onDateRangeChange,
  setShowFilters,
}: {
  onDateRangeChange: (startDate: string, endDate: string) => void;
  setShowFilters: (show: boolean) => void;
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    if (startDate && endDate) {
      // If same day is selected, we want to show entries for that specific day
      const effectiveEndDate =
        startDate === endDate
          ? new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1))
              .toISOString()
              .split("T")[0]
          : endDate;

      onDateRangeChange(startDate, effectiveEndDate);
      setShowFilters(false);
    }
  };

  return (
    <div className='flex flex-col gap-2 '>
      <h3 className='text-center font-medium text-gray-700'>Date Range</h3>
      <div className='flex flex-col gap-2'>
        <div>
          <label className='block text-sm text-gray-600 mb-1'>From</label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='w-full p-2 border rounded-md'
          />
        </div>
        <div>
          <label className='block text-sm text-gray-600 mb-1'>To</label>
          <input
            type='date'
            value={endDate}
            min={startDate}
            onChange={(e) => {
              const selectedDate = e.target.value;
              // Allow selecting the same date as start date
              if (!startDate || selectedDate >= startDate) {
                setEndDate(selectedDate);
              }
            }}
            className='w-full p-2 border rounded-md'
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={handleApply}
          className='w-45 mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
          Apply Date Range
        </button>
      </div>
    </div>
  );
};
