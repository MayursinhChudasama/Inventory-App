import { useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import { inwardEntry, singleProduct } from "@/models/models";

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

  return (
    <>
      {items.map((item: any, i: number) => (
        <SingleItem
          key={item.id}
          id={item.id}
          i={i}
          deleteItem={handleRemove}
          handleChange={handleChange}
        />
      ))}
      <div className='flex gap-2'>
        <button
          onClick={handleAdd}
          type='button'>
          +
        </button>
      </div>
    </>
  );
};

export default ProductsList;
