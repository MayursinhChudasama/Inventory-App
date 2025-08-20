import { useState } from "react";
import Select from "./Select";

const tdClasses = "py-1 px-1 text-sm text-gray-700 align-middle";

export default function SingleItem({
  id,
  i,
  products,
  handleRemove,
  handleChange,
  brandOptions,
  modelOptions,
}: {
  id: number;
  i: number;
  products: any;
  handleRemove: (id: number, i: number) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number,
    key: string
  ) => void;
  brandOptions: string[];
  modelOptions?: string[];
}) {
  const srNO = i + 1;

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const allModels: string[] =
    Object.values(products?.["Black Cover"]?.[selectedBrand] || {}) || [];

  return (
    <tr className='hover:bg-gray-50'>
      <td className={`${tdClasses} text-center`}>
        {srNO < 10 ? "0" + srNO : srNO}
      </td>
      <td className={tdClasses}>
        <div className=''>
          <Select
            options={brandOptions}
            handleChange={(e) => {
              handleChange(e, i, "brand");
              setSelectedBrand(e.target.value);
            }}
            className=' text-sm py-1.5'
            label='Brand'
            productKey={true}
          />
        </div>
      </td>
      <td className={tdClasses}>
        <div className=''>
          <Select
            options={allModels || []}
            handleChange={(e) => handleChange(e, i, "model")}
            className=' text-sm py-1.5'
            label='Model'
            productKey={true}
          />
        </div>
      </td>
      <td className={tdClasses}>
        <input
          type='number'
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
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}
