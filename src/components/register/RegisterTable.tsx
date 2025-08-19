import { RegisterEntry } from "@/models/register";
import Loading from "../Loading";

const thClasses =
  "px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider";
const tdClasses =
  "px-2 py-3 whitespace-nowrap text-center text-sm text-gray-900";
// Format date as 'DD MMM YYYY'
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface RegisterTableProps {
  entries: RegisterEntry[];
  onRowClick: (entry: RegisterEntry) => void;
  isLoading?: boolean;
}

export const RegisterTable: React.FC<RegisterTableProps> = ({
  entries,
  onRowClick,
  isLoading = false,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  if (entries.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        No entries found matching your filters.
      </div>
    );
  }

  return (
    <div className='overflow-x-auto bg-white rounded-lg shadow'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            {/* <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Type
            </th> */}
            <th className={thClasses}>No</th>
            <th className={thClasses}>Category</th>
            <th className={thClasses}>User</th>
            <th className={thClasses}>Date</th>
            <th className={thClasses}>Items</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {entries.map((entry) => (
            <tr
              key={`${entry.type}-${entry.challan_no}`}
              className='hover:bg-gray-50 cursor-pointer'
              onClick={() => onRowClick(entry)}>
              {/* <td className='px-6 py-4 whitespace-nowrap'>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    entry.type === "inward"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                  {entry.type.toUpperCase()}
                </span>
              </td> */}
              <td className={tdClasses}>{entry.challan_no}</td>
              <td className={tdClasses}>{entry.category}</td>
              <td className={tdClasses}>{entry.user}</td>
              <td className={tdClasses}>{formatDate(entry.createdAt)}</td>
              <td className={tdClasses}>{entry.products.length} items</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
