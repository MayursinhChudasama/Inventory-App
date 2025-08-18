import { useState } from "react";

export const DateRangeFilter = ({
  onDateRangeChange,
}: {
  onDateRangeChange: (startDate: string, endDate: string) => void;
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    if (startDate && endDate) {
      onDateRangeChange(startDate, endDate);
    }
  };

  return (
    <div className='flex flex-col space-y-2 p-4 bg-white rounded-lg shadow'>
      <h3 className='font-medium text-gray-700'>Date Range</h3>
      <div className='flex flex-col sm:flex-row gap-2'>
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
            onChange={(e) => setEndDate(e.target.value)}
            className='w-full p-2 border rounded-md'
          />
        </div>
      </div>
      <button
        onClick={handleApply}
        className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
        Apply Date Range
      </button>
    </div>
  );
};
