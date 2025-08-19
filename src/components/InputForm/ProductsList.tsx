import { useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import { inwardEntry, singleProduct } from "@/models/models";
import Select from "./Select";

const ProductsList: React.FC<{
  setInwardEntryData: React.Dispatch<React.SetStateAction<inwardEntry>>;
}> = ({ setInwardEntryData }) => {
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
    }))
  );
  const [productList, setProductList] = useState<singleProduct[]>([]);
  //
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems((prev) => [...prev, { id: Date.now() + Math.random() }]);
  };
  //
  const handleRemove = (id: number, i: number) => {
    setItems((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev
    );
    setProductList((prev) =>
      prev.filter((item, index) => index !== i && item !== null)
    );
  };
  //
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number,
    key: string
  ) => {
    let value: string | number = e.target.value;
    if (key === "qty") {
      value = Number(value);
    }

    setProductList((prev) => {
      const newEntry = {
        ...prev[index],
        [key]: value,
      };
      const updatedArray = JSON.parse(JSON.stringify(prev));
      updatedArray[index] = newEntry;

      return updatedArray;
    });
  };

  useEffect(() => {
    setInwardEntryData((prev) => ({
      ...prev,
      products: productList,
    }));
  }, [productList]);
  const thClasses =
    "py-2 px-2 text-center text-sm font-medium text-gray-700 whitespace-nowrap";
  const tdClasses = "py-1 px-2 text-sm text-gray-700 align-middle";

  return (
    <div className='w-full bg-white rounded-lg border border-gray-200 overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='min-w-full '>
          <thead className='bg-gray-100'>
            <tr>
              <th className={`${thClasses} w-12`}>No</th>
              <th className={`${thClasses} w-[30%]`}>Brand</th>
              <th className={`${thClasses} w-[30%]`}>Model</th>
              <th className={`${thClasses} w-20`}>Quantity</th>
              <th className='w-8'></th>
            </tr>
          </thead>
          <tbody className=''>
            {items.map((item: any, i: number) => {
              const srNO = i + 1;

              return (
                <tr
                  key={item.id}
                  className='hover:bg-gray-50'>
                  <td className={`${tdClasses} text-center`}>
                    {srNO < 10 ? "0" + srNO : srNO}
                  </td>
                  <td className={tdClasses}>
                    <div className='w-full'>
                      <Select
                        options={["Google", "Apple", "Samsung"]}
                        handleChange={(e) => handleChange(e, i, "brand")}
                        className='w-full text-sm py-1.5'
                        label='Brand'
                      />
                    </div>
                  </td>
                  <td className={tdClasses}>
                    <div className='w-full'>
                      <Select
                        options={["Pixel 6", "iPhone 12", "Galaxy S21"]}
                        handleChange={(e) => handleChange(e, i, "model")}
                        className='w-full text-sm py-1.5'
                        label='Model'
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
                      onClick={() => handleRemove(item.id, i)}
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
            })}
          </tbody>
        </table>
      </div>
      <div className='bg-gray-50 px-3 py-2 flex justify-between items-center border-t border-gray-200'>
        <button
          onClick={handleAdd}
          type='button'
          className='inline-flex items-center px-3 py-1 mr-1 text-sm font-medium rounded text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'>
          Add
        </button>
        <div className='text-sm font-medium text-gray-900'>
          TOTAL: <span className='text-blue-600'>1,000</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
