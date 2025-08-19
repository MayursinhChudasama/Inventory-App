const Table: React.FC = () => {
  return (
    <div className='w-full max-w-md mx-auto bg-white p-2 rounded-md'>
      {/* Category, Supplier, Challan No */}
      <div className='flex flex-row justify-between items-start gap-2 mb-2'>
        <div className='flex flex-col gap-2 flex-1'>
          <label className='text-xs text-black'>Select Category:</label>
          <select className='border rounded px-3 py-1 text-xs w-full'>
            <option>Category</option>
          </select>
          <label className='text-xs text-black mt-2'>Select Supplier:</label>
          <select className='border rounded px-3 py-1 text-xs w-full'>
            <option>Supplier</option>
          </select>
        </div>
        <div className='flex flex-col items-end flex-1'>
          <span className='text-xs text-gray-500'>Challan No:</span>
          <span className='font-semibold border-b-2 border-black px-4 text-center text-xs'>
            IN–01
          </span>
        </div>
      </div>

      {/* Table Header */}
      <div className='grid grid-cols-12 bg-blue-300 rounded-t-md py-1 px-2 text-xs font-semibold text-white mb-1'>
        <div className='col-span-2 text-center'>No</div>
        <div className='col-span-3 text-center'>Brand</div>
        <div className='col-span-3 text-center'>Model</div>
        <div className='col-span-3 text-center'>Quantity</div>
        <div className='col-span-1 text-center'></div>
      </div>

      {/* Table Rows (repeat for 10 rows) */}
      {[...Array(10)].map((_, i) => (
        <div
          className='grid grid-cols-12 items-center py-1 px-2 border-b'
          key={i}>
          <div className='col-span-2 text-center text-xs font-semibold'>
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className='col-span-3'>
            <select className='border rounded px-2 py-1 text-xs w-full'>
              <option>Brand</option>
            </select>
          </div>
          <div className='col-span-3'>
            <select className='border rounded px-2 py-1 text-xs w-full'>
              <option>Model</option>
            </select>
          </div>
          <div className='col-span-3'>
            <input
              type='number'
              className='border-b-2 border-black w-full text-xs py-1 px-2 outline-none'
              placeholder='Quantity'
            />
          </div>
          <div className='col-span-1 flex justify-center'>
            <button
              type='button'
              className='text-xs hover:text-red-600'>
              ✖️
            </button>
          </div>
        </div>
      ))}

      {/* Add Row Button */}
      <div className='flex justify-center my-2'>
        <button
          type='button'
          className='border rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-gray-100'>
          +
        </button>
      </div>

      {/* Total Row */}
      <div className='flex justify-end items-center mt-2 mb-4'>
        <span className='font-semibold text-base border-b-2 border-black px-2'>
          TOTAL
        </span>
      </div>

      {/* Add Challan Button */}
      <div className='flex justify-center mt-2'>
        <button className='bg-blue-500 text-white rounded-md px-8 py-2 font-semibold text-base shadow hover:bg-blue-600'>
          ADD Challan
        </button>
      </div>
    </div>
  );
};
