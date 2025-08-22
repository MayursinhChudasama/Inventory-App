import { useState } from "react";
import { inwardEntry } from "@/models/models";
import Modal from "../ui/Modal";
import {
  useAddChallanMutation,
  useUpdateChallanMutation,
} from "@/app/store/challan";
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
  //
  console.log("currentChallan", currentChallan);

  const [formData, setFormData] = useState<Partial<inwardEntry>>(
    currentChallan || {}
  );
  const [updateChallan, { isError, error }] = useUpdateChallanMutation();

  const { data } = useGetProductsQuery();
  const products = data?.[0];
  const sourceType = currentChallan?.type == "inward" ? "Supplier" : "Buyer";
  const SOURCES = products?.Sources[sourceType];

  function handleFormData(key: string, value: string) {
    if (!key || !value) return;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleCancel() {
    onClose();
    setIsEditing(false);
    setFormData({});
  }

  async function handleOnSave() {
    // console.log("formData", formData);

    try {
      const payload = JSON.parse(JSON.stringify(formData));
      payload.lastUpdatedAt = Date.now();
      // delete payload._id;
      // console.log("payload", payload);
      const result = await updateChallan({
        id: currentChallan._id!,
        body: payload,
      }).unwrap();
      setIsEditing(false);
      if (error) {
        console.log("rtx error", error);
      }
      onClose();
      return result;
    } catch (error) {
      console.error("error", error);
    }
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
          <div className='grid grid-cols-2 gap-4 mb-4'>
            {/* Created By */}
            <div className='space-y-1'>
              <label className='block text-sm font-medium text-gray-700'>
                Created By
              </label>
              <div className='p-2 rounded min-h-[42px]'>
                {currentChallan.user}
              </div>
            </div>

            {/* Created At */}
            <div className='space-y-1'>
              <label className='block text-sm font-medium text-gray-700'>
                Created At
              </label>
              <div className='p-2 rounded min-h-[42px]'>
                {currentChallan.createdAt}
              </div>
            </div>

            {/* Source */}
            <div className='space-y-1'>
              <label className='block text-sm font-medium text-gray-700'>
                {sourceType}
              </label>
              {isEditing ? (
                <Select
                  options={SOURCES}
                  onChange={(e) => {
                    handleFormData("source", e.target.value);
                  }}
                  defaultValue={currentChallan.source}
                  className='w-full p-2 border-black rounded text-black text-2xl bg-white min-h-[42px]'
                />
              ) : (
                <div className='p-2 border rounded bg-gray-100 min-h-[42px]'>
                  {currentChallan.source}
                </div>
              )}
            </div>

            {/* Challan No */}
            <div className='space-y-1'>
              <label className='block text-sm font-medium text-gray-700'>
                Challan No
              </label>
              {isEditing ? (
                <input
                  name='challan_no'
                  value={formData.challan_no || currentChallan?.challan_no}
                  onChange={(e) => {
                    handleFormData("challan_no", e.target.value);
                  }}
                  className='w-full p-2 border rounded'
                  required
                />
              ) : (
                <div className='p-2 border rounded bg-gray-100 min-h-[42px]'>
                  {formData.challan_no || currentChallan?.challan_no}
                </div>
              )}
            </div>
          </div>

          <div>
            {/* <label className='block text-sm font-medium text-gray-700 mb-2'>
              Products
            </label> */}
            <EditProductList
              isEditing={isEditing}
              key={currentChallan._id}
              setFormData={setFormData}
              currentChallan={currentChallan}
            />
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
                {/* <button
                  type='button'
                  onClick={handleCancel}
                  className='px-4 py-2 text-sm text-gray-700'>
                  Cancel
                </button> */}
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
