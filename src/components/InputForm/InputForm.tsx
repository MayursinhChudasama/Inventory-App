"use client";
import React, { useState } from "react";
import Select from "./Select";
import { inwardEntry } from "@/models/models";
import ProductsList from "./ProductsList";
import postInwardEntry from "@/apiCalls/postInwardEntry";
import { useSelector } from "react-redux";

const InputForm: React.FC<{ activeChallanTab: string }> = ({
  activeChallanTab,
}) => {
  const user = useSelector((state: any) => state.auth.user);
  const [entryData, setEntryData] = useState<inwardEntry>({
    type: activeChallanTab,
    challan_no: "",
    category: "",
    user: user.name,
    createdAt: "",
    products: [],
  });

  const inwardEntryDataInputHandler = (
    key?: string,
    value?: string | number,
    i?: number,
    productKey?: string
  ) => {
    if (!key) return;
    setEntryData((prev: any) => ({
      ...prev,
      [key]: value,
      createdAt: Date.now(),
    }));
  };

  async function handleAddEntryData() {
    console.log("entryData", entryData);
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-4 w-full max-w-xs mx-auto mb-2'>
        <div className='flex items-center justify-between'>
          <label className='text-sm font-medium'>Category:</label>
          <div className='w-40'>
            <Select
              options={["Option 1", "Option 2"]}
              label='Category'
              onChange={(e) =>
                inwardEntryDataInputHandler("category", e.target.value)
              }
              className='w-full py-2'
            />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-sm font-medium'>Supplier:</label>
          <div className='w-40'>
            <Select
              options={["Supplier 1", "Supplier 2"]}
              label='Supplier'
              onChange={(e) =>
                inwardEntryDataInputHandler("supplier", e.target.value)
              }
              className='w-full py-2'
            />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <label className='text-sm font-medium'>Challan No:</label>
          <input
            type='text'
            className='border border-gray-400 rounded-lg px-4 py-2 text-sm w-40 text-gray-700'
            onChange={(e) =>
              inwardEntryDataInputHandler("challan_no", e.target.value)
            }
            defaultValue={""}
          />
        </div>
      </div>
      <ProductsList setEntryData={setEntryData} />

      <button
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'
        type='button'
        onClick={handleAddEntryData}>
        Add
      </button>
    </div>
  );
};

export default InputForm;
