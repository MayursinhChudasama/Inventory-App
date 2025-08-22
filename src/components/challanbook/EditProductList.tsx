import { inwardEntry, singleProduct } from "@/models/models";
import { useGetProductsQuery } from "@/app/store/productsApi";
import EditSingleEntry from "./EditSingleEntry";
import { useEffect, useState } from "react";
import { singleChallanEntry } from "@/models/challans";

const thClasses =
  "py-2 px-2 text-center text-sm font-medium text-gray-700 whitespace-nowrap";

const EditProductList: React.FC<{
  isEditing: boolean;
  currentChallan: inwardEntry;
  setFormData: React.Dispatch<React.SetStateAction<inwardEntry>>;
}> = ({ isEditing, currentChallan, setFormData }) => {
  const challanProducts = currentChallan.products;

  const { data } = useGetProductsQuery();
  const productsOG = data?.[0];
  const allBrands =
    Object.keys(productsOG?.[currentChallan.category] || {}) || [];

  const [items, setItems] = useState(
    Array.from({ length: challanProducts.length }, (_, i) => ({
      id: Date.now() + i + Math.random(),
    }))
  );

  const [newProductList, setNewProductList] =
    useState<singleProduct[]>(challanProducts);

  const totalQty = newProductList.reduce(
    (acc, item) => acc + (item.qty || 0),
    0
  );

  //   useEffect(() => {
  //     setNewProductList(challanProducts);
  //   }, [challanProducts]);

  function handleRemove(id: number, i: number) {
    setItems((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev
    );
    setNewProductList((prev) =>
      prev.filter((item, index) => index !== i && item !== null)
    );
  }
  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setItems((prev) => [...prev, { id: Date.now() + Math.random() }]);
  }
  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number,
    key: string
  ) {
    let value: string | number = e.target.value;

    if (key === "qty") {
      value = Number(value);
    }

    setNewProductList((prev) => {
      const newEntry = {
        ...prev[index],
        [key]: value,
      };
      const updatedArray = JSON.parse(JSON.stringify(prev));
      updatedArray[index] = newEntry;

      return updatedArray;
    });
  }

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      products: newProductList,
    }));
  }, [newProductList]);

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full '>
        <thead className='bg-gray-100'>
          <tr>
            <th className={`${thClasses} w-4`}>No</th>
            <th className={`${thClasses} w-[40%]`}>Brand</th>
            <th className={`${thClasses} w-[40%]`}>Model</th>
            <th className={`${thClasses} w-20`}>Quantity</th>
            <th className={`${thClasses} w-20`}></th>
          </tr>
        </thead>
        <tbody className=''>
          {!isEditing &&
            challanProducts.map((item: singleProduct, i: number) => (
              <tr key={i}>
                <td className={`${thClasses} text-center`}>{i + 1}</td>
                <td className={thClasses}>{item.brand}</td>
                <td className={thClasses}>{item.model}</td>
                <td className={thClasses}>{item.qty}</td>
              </tr>
            ))}
          {isEditing &&
            items.map((item: { id: number }, i: number) => (
              <EditSingleEntry
                key={item.id}
                id={item.id}
                currentEntry={
                  newProductList.length >= challanProducts.length
                    ? challanProducts[i] || {}
                    : {}
                }
                i={i}
                handleRemove={handleRemove}
                handleChange={handleChange}
                brandOptions={allBrands}
                products={productsOG}
                selectedCategory={currentChallan.category}
              />
            ))}
        </tbody>
      </table>
      <div
        className={` px-3 py-2 flex items-center ${
          isEditing ? "justify-between" : "justify-end"
        }`}>
        {isEditing && (
          <button
            onClick={handleAdd}
            type='button'
            className='inline-flex px-3 py-1 mr-1 text-sm font-medium rounded text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'>
            Add row
          </button>
        )}
        <div className='text-sm font-medium text-gray-900'>
          TOTAL: <span className='text-blue-600'>{totalQty}</span>
        </div>
      </div>
    </div>
  );
};

export default EditProductList;
