const ChallanCard: React.FC<{
  type?: string;
  all_challans: any;
}> = ({ type, all_challans }) => {
  const total = all_challans?.reduce(
    (total: number, entry: any) => total + entry.qty,
    0
  );
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='px-6 py-3 border-b border-gray-200 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <h3 className='text-lg font-medium text-gray-900'>
            {type === "Inward" ? "Inward" : "Outward"} Challans
          </h3>
          <span className='text-sm text-gray-500'>
            ~<span className='font-medium text-lg'>{all_challans?.length}</span>{" "}
            entries
          </span>
        </div>
        <div className='text-sm text-gray-600'>
          Total: <span className='font-medium text-lg'>{total}</span>
        </div>
      </div>
      <div className='overflow-x-auto justify-center'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2'>
                Date
              </th>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2'>
                Qty
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {all_challans?.map((entry: any, i: number) => (
              <tr
                key={i}
                className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 w-1/2'>
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm text-center font-medium w-1/2 ${
                    type === "Inward" ? "text-green-600" : "text-red-600"
                  }`}>
                  {type === "Inward" ? "+" : "-"}
                  {entry.qty}
                </td>
              </tr>
            ))}
            {all_challans?.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className='px-6 py-4 text-center text-gray-500'>
                  No challans.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChallanCard;
