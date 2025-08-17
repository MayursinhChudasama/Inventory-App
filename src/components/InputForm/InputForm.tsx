"use client";
import React, { useState } from "react";
import Select from "./Select";
import { inwardEntry } from "@/models/models";
import ProductsList from "./ProductsList";
import postInwardEntry from "@/apiCalls/postInwardEntry";

const InputForm: React.FC = () => {
  const [inwardEntryData, setInwardEntryData] = useState<inwardEntry>({
    from: "",
    product_type: "",
    products: [],
    createdAt: "",
    by_user: "user1",
  });
  console.log("inwardEntryData", inwardEntryData);

  const inwardEntryDataInputHandler = (
    key?: string,
    value?: string | number,
    i?: number,
    productKey?: string
  ) => {
    if (!key) return;
    setInwardEntryData((prev: any) => ({
      ...prev,
      [key]: value,
      createdAt: Date.now(),
    }));
  };

  async function handlePost() {
    for (let i = 0; i < 1; i++) {
      console.log("calling handlePost", i);
      await postInwardEntry(inwardEntryData);
    }
  }
  async function deleteAllPosts() {}

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row items-center gap-x-2'>
        <label htmlFor='product_type'>Product Type</label>
        <Select
          options={["Black Cover", "Packing"]}
          onChange={(e) =>
            inwardEntryDataInputHandler("product_type", e.target.value)
          }
        />
      </div>
      <div className='flex flex-row items-center gap-x-2'>
        <label htmlFor='from'>From</label>
        <Select
          options={["seller_one", "seller_two"]}
          onChange={(e) => inwardEntryDataInputHandler("from", e.target.value)}
        />
      </div>
      <ProductsList setInwardEntryData={setInwardEntryData} />

      <button
        type='button'
        onClick={handlePost}>
        Submit
      </button>
      <button
        type='button'
        onClick={deleteAllPosts}>
        Delete
      </button>
    </div>
  );
};

export default InputForm;
