import { useState } from "react";
import { inwardEntry } from "@/models/models";
import Modal from "../ui/Modal";
import { useAddChallanMutation } from "@/app/store/challan";
import Select from "../InputForm/Select";
import { useGetProductsQuery } from "@/app/store/productsApi";

import EditProductList from "./EditProductList";

const EntryModal: React.FC<{
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
  currentChallan: inwardEntry | undefined;
}> = ({ isOpen, onClose, currentChallan, isEditing, setIsEditing }) => {
  const [formData, setFormData] = useState<Partial<inwardEntry>>({});
  const [addChallan] = useAddChallanMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { data } = useGetProductsQuery();
  const products = data?.[0];
  const sourceType = currentChallan?.type == "inward" ? "Supplier" : "Buyer";
  const SOURCES = products?.Sources[sourceType];

  function handleCancel() {
    onClose();
    setIsEditing(false);
    setFormData({});
  }
  function handleOnSave() {
    console.log(formData, formData);
    // await addChallan({ body: null });
    setIsEditing(false);
    onClose();
  }

  if (!currentChallan) return null;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${
          isEditing ? "Editing" : ""
        } ${currentChallan.type.toUpperCase()} - ${currentChallan.challan_no}`}>
        <div className='space-y-4 max-h-[70vh] overflow-y-auto pr-2'>
          <div>
            {isEditing ? (
              <>
                <label>{sourceType}</label>
                <Select
                  options={SOURCES}
                  defaultValue={currentChallan.source}
                  className='w-full p-2 border rounded '
                />
              </>
            ) : (
              <>
                <label>{sourceType}</label>
                <p className='w-full p-2 border rounded'>
                  {currentChallan.source}
                </p>
              </>
            )}
          </div>
          <div>
            <label>Challan No</label>
            <input
              name='challan_no'
              value={formData.challan_no || currentChallan?.challan_no}
              disabled={!isEditing}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div>
            <label>Products</label>
            <EditProductList products={currentChallan.products} />
          </div>
          <div className='flex justify-end space-x-2 mt-4'>
            {isEditing && (
              <>
                <button
                  type='button'
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  className='px-4 py-2 text-sm text-gray-700'>
                  Discard Changes
                </button>
                <button
                  type='submit'
                  onClick={handleOnSave}
                  className='px-4 py-2 bg-blue-600 text-white rounded text-sm'>
                  Save
                </button>
              </>
            )}
            {!isEditing && (
              <>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='px-4 py-2 text-sm text-gray-700'>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  className='px-4 py-2 bg-blue-600 text-white rounded text-sm'>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default EntryModal;
