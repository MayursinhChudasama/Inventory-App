"use client";
import React, { useEffect, useState } from "react";
import Select from "./Select";
import { inwardEntry } from "@/models/models";
import ProductsList from "./ProductsList";

import { useSelector } from "react-redux";
import { useGetProductsQuery } from "@/app/store/productsApi";
import { useAddChallanMutation } from "@/app/store/challan";
import { useRouter } from "next/navigation";

const InputForm: React.FC<{
  activeChallanTab: string;
}> = ({ activeChallanTab }) => {
  //
  const route = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Black Cover");
  const [entryData, setEntryData] = useState<inwardEntry>(() => ({
    type: activeChallanTab,
    category: selectedCategory,
    challan_no: "",
    source: "",
    user: user?.name || "",
    createdAt: "",
    lastUpdatedAt: null,
    products: [],
  }));
  console.log("entryData", entryData);
  //
  const {
    data: products,
    isLoading,
    error: getProductsError,
  } = useGetProductsQuery();
  const [useAddChallan, { error: addChallanError }]: any =
    useAddChallanMutation();
  const categories = Object.keys(products?.[0] || {}).filter(
    (key) => key !== "_id" && key !== "Sources"
  );

  const allBrands = Object.keys(products?.[0]?.[selectedCategory] || {}) || [];
  const allSuppliers: string[] =
    Object.values(products?.[0]?.["Sources"]["Supplier"] || {}) || [];
  const allbuyers: string[] =
    Object.values(products?.[0]?.["Sources"]["Buyer"] || {}) || [];

  //
  const [successMessage, setSuccessMessage] = useState("");
  const errorMessage: string = addChallanError?.data?.message;
  const inwardEntryDataInputHandler = (
    key?: string,
    value?: string | number
  ) => {
    if (!key) return;
    setEntryData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  async function handleAddEntryData() {
    try {
      const result = await useAddChallan({ body: entryData }).unwrap();

      setSuccessMessage("Challan added successfully!");

      setTimeout(() => {
        setSuccessMessage("");
        route.push("/dashboard");
      }, 1500);
      return result;
    } catch (error) {
      console.error("Error adding challan:", error);
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-4 w-full max-w-xs mx-auto mb-2'>
        {/* First Row - Date and Challan No */}
        <div className='grid grid-cols-2 gap-4 w-full'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Date:</label>
            <input
              type='date'
              className='w-full border border-gray-400 rounded-lg px-3 py-2 text-sm text-gray-700'
              onChange={(e) =>
                inwardEntryDataInputHandler("createdAt", e.target.value)
              }
              defaultValue={""}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Challan No:</label>
            <input
              type='text'
              className='w-full border border-gray-400 rounded-lg px-3 py-2 text-sm text-gray-700'
              onChange={(e) =>
                inwardEntryDataInputHandler("challan_no", e.target.value)
              }
              defaultValue={""}
            />
          </div>
        </div>

        {/* Second Row - Category and Supplier/Buyer */}
        <div className='grid grid-cols-2 gap-4 w-full'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Category</label>
            <Select
              options={categories}
              defaultValue='Category'
              label='Category'
              onChange={(e) => {
                inwardEntryDataInputHandler("category", e.target.value);
                setSelectedCategory(e.target.value);
              }}
              className='w-full'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>
              {activeChallanTab === "inward" ? "Supplier" : "Buyer"}
            </label>
            <Select
              options={activeChallanTab === "inward" ? allSuppliers : allbuyers}
              label={activeChallanTab === "inward" ? "Supplier" : "Buyer"}
              onChange={(e) =>
                inwardEntryDataInputHandler("source", e.target.value)
              }
              className='w-full'
            />
          </div>
        </div>
      </div>
      <ProductsList
        selectedCategory={selectedCategory}
        allBrands={allBrands}
        products={products?.[0]}
        setEntryData={setEntryData}
      />

      <button
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'
        type='button'
        onClick={handleAddEntryData}>
        Add Challan
      </button>
      {/* Error Message */}
      {errorMessage && (
        <div
          className='text-red-500 mb-1 text-center text-sm'
          role='alert'>
          <span className='block sm:inline'>{errorMessage}</span>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div
          className='text-green-500 mb-1 text-center text-sm'
          role='alert'>
          <span className='block sm:inline'>{successMessage}</span>
        </div>
      )}
    </div>
  );
};

export default InputForm;
