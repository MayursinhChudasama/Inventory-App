import { useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import { inwardEntry, singleProduct } from "@/models/models";
import Select from "./Select";

const thClasses =
  "py-2 px-2 text-center text-sm font-medium text-gray-700 whitespace-nowrap";

const ProductsList: React.FC<{
  setEntryData: React.Dispatch<React.SetStateAction<inwardEntry>>;
}> = ({ setEntryData }) => {
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
    }))
  );
  const [productList, setProductList] = useState<singleProduct[]>([]);
  const totalQty = productList.reduce((acc, item) => acc + item.qty, 0);

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
    setEntryData((prev) => ({
      ...prev,
      products: productList,
    }));
  }, [productList]);

  return (
    <div className='w-full bg-white rounded-lg border border-gray-200 overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='min-w-full '>
          <thead className='bg-gray-100'>
            <tr>
              <th className={`${thClasses} w-4`}>No</th>
              <th className={`${thClasses} w-[40%]`}>Brand</th>
              <th className={`${thClasses} w-[40%]`}>Model</th>
              <th className={`${thClasses} w-20`}>Quantity</th>
              <th className='w-4'></th>
            </tr>
          </thead>
          <tbody className=''>
            {items.map((item: any, i: number) => (
              <SingleItem
                key={item.id}
                id={item.id}
                i={i}
                handleRemove={handleRemove}
                handleChange={handleChange}
                brandOptions={["Google", "Apple", "Samsung"]}
                modelOptions={["Pixel 6", "iPhone 12", "Galaxy S21"]}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className='bg-gray-50 px-3 py-2 flex justify-between items-center border-t border-gray-200'>
        <button
          onClick={handleAdd}
          type='button'
          className='inline-flex items-center px-3 py-1 mr-1 text-sm font-medium rounded text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'>
          Add row
        </button>
        <div className='text-sm font-medium text-gray-900'>
          TOTAL: <span className='text-blue-600'>{totalQty}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
