import { useState } from "react";
import Select from "../InputForm/Select";
import { singleProduct } from "@/models/models";

const tdClasses = "py-1 px-1 text-sm text-gray-700 align-middle";

const EditSingleEntry: React.FC<{
  id: number;
  currentEntry: singleProduct;
  i: number;
  products: any;
  handleRemove: (id: number, i: number) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number,
    key: string
  ) => void;
  brandOptions: string[];
  selectedCategory: string;
}> = ({
  id,
  currentEntry,
  i,
  products,
  handleRemove,
  handleChange,
  brandOptions,
  selectedCategory,
}) => {
  const srNO = i + 1;
  const [selectedBrand, setSelectedBrand] = useState<string>(
    currentEntry.brand
  );
  const allModels: string[] =
    Object.values(products?.[selectedCategory]?.[selectedBrand] || {}) || [];
  //   console.log("EditSingleEntry allModels", allModels);
  //   console.log("EditSingleEntry currentEntry", currentEntry);
  //   console.log("EditSingleEntry currentEntry brand", currentEntry.brand);
  return (
    <tr>
      <td className={tdClasses}>{srNO < 10 ? "0" + srNO : srNO}</td>
      <td className={tdClasses}>
        <Select
          options={brandOptions}
          defaultValue={currentEntry.brand}
          handleChange={(e) => {
            handleChange(e, i, "brand");
            setSelectedBrand(e.target.value);
          }}
          label='Brand'
          productKey={true}
        />
      </td>
      <td className={tdClasses}>
        <Select
          options={allModels || []}
          defaultValue={currentEntry.model}
          handleChange={(e) => handleChange(e, i, "model")}
          className=' text-sm py-1.5'
          label='Model'
          productKey={true}
        />
      </td>
      <td className={tdClasses}>
        <input
          type='number'
          defaultValue={currentEntry.qty ?? 0}
          className='w-full border border-gray-300 rounded px-2 py-1 textsm focus:outline-none focus:ring-1 focus:ring-blue-500'
          onChange={(e) => handleChange(e, i, "qty")}
          placeholder='0'
          min='0'
        />
      </td>
      <td className='text-center'>
        <button
          onClick={() => handleRemove(id, i)}
          type='button'
          className='text-red-500 hover:text-red-700 p-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
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
  );
};

export default EditSingleEntry;
