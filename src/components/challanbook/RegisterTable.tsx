import Loading from "../Loading";
import { inwardEntry } from "@/models/models";
import EntryModal from "./EntryModal";
import { useState } from "react";
import { useDeleteChallanMutation } from "@/app/store/challan";
import Modal from "../ui/Modal";

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
  const year = date.getFullYear().toString().slice(2);
  return `${day}/${month}/${year}`;
};

interface RegisterTableProps {
  entries: inwardEntry[];
  isLoading?: boolean;
}

export const RegisterTable: React.FC<RegisterTableProps> = ({
  entries,
  isLoading = false,
}) => {
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentChallan, setCurrentChallan] = useState<inwardEntry | undefined>(
    undefined
  );
  function handleEntryModal(id: string) {
    setCurrentChallan(entries.find((entry) => entry._id === id));
    setIsEntryModalOpen(true);
    setIsEditing(false);
  }

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteChallan, { isLoading: isDeleting }] = useDeleteChallanMutation();
  function handleDelete() {
    if (!currentChallan || !currentChallan._id) return;
    deleteChallan(currentChallan._id);
    setShowDeleteConfirm(false);
  }

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
            <th className={thClasses}>No</th>
            <th className={thClasses}>Category</th>
            <th className={thClasses}>From</th>
            {/* <th className={thClasses}>User</th> */}
            <th className={thClasses}>Date</th>
            <th className={thClasses}>Qty</th>
            <th className={thClasses}></th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {entries.map((entry) => (
            <tr
              key={`${entry.type}-${entry.challan_no}`}
              className='hover:bg-gray-50 cursor-pointer'
              onClick={() => handleEntryModal(entry._id!)}>
              <td className={tdClasses}>{entry.challan_no}</td>
              <td className={tdClasses}>{entry.category}</td>
              <td className={tdClasses}>{entry.source}</td>
              {/* <td className={tdClasses}>{entry.user}</td> */}
              <td className={tdClasses}>{formatDate(entry.createdAt)}</td>
              <td className={tdClasses}>
                {entry.products.reduce((acc, item) => acc + item?.qty, 0)}
              </td>
              <td className={tdClasses}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(true);
                  }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-red-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EntryModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        currentChallan={currentChallan}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => !isDeleting && setShowDeleteConfirm(false)}
        title='Confirm Deletion'>
        <div className='space-y-4'>
          <p className='text-gray-700'>
            Are you sure you want to delete this entry? This action cannot be
            undone.
          </p>
          <div className='flex justify-end space-x-2 mt-4'>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
              className='px-4 py-2 text-sm text-gray-700 border rounded disabled:opacity-50'>
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className='px-4 py-2 bg-red-600 text-white rounded text-sm disabled:opacity-50'>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
