import Select from "@/components/InputForm/Select";
import DetailsCard from "@/components/settings/DetailsCard";
import { useEffect, useState } from "react";
import ModalInput from "../ui/ModalInput";
import {
  useGetProductsQuery,
  usePutProductsMutation,
} from "@/app/store/products";
import Loading from "../Loading";

type BrandModels = {
  [brand: string]: string[];
};

type SettingsData = {
  [category: string]: BrandModels;
};
const Category: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log("productsOG", products);

  const [updateProduct, { isLoading: isUpdating }] = usePutProductsMutation();

  console.log("productsID", products?.[0]._id);
  const [settingsData, setSettingsData] = useState<SettingsData>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  console.log("settingsData", settingsData);

  // Update settings data when products load
  useEffect(() => {
    if (products?.[0]) {
      const data = JSON.parse(JSON.stringify(products[0]));
      delete data._id; // Remove MongoDB _id

      // Only update if data has changed
      setSettingsData((prevData) => {
        if (JSON.stringify(prevData) !== JSON.stringify(data)) {
          // Set first category and brand as default
          const categories = Object.keys(data).filter((key) => key !== "_id");
          if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]);
            const brands = Object.keys(data[categories[0]] || {});
            if (brands.length > 0 && !selectedBrand) {
              setSelectedBrand(brands[0]);
            }
          }
          return data;
        }
        return prevData;
      });
    }
  }, [products, selectedCategory, selectedBrand]);

  const allCategory = Object.keys(settingsData).filter((key) => key !== "_id");
  const allBrands = Object.keys(settingsData[selectedCategory] || {});
  const allModels =
    Object.values(settingsData[selectedCategory]?.[selectedBrand] || {}) || [];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const newBrands = Object.keys(settingsData[newCategory] || {});
    setSelectedBrand(newBrands[0]);
  };

  useEffect(() => {
    if (allBrands.length > 0 && !allBrands.includes(selectedBrand)) {
      setSelectedBrand(allBrands[0]);
    }
  }, [allBrands, selectedBrand]);

  // Removed duplicate useEffect that was causing errors

  async function handleAdd(key: string, value: string) {
    return new Promise<void>((resolve) => {
      setSettingsData((prev) => {
        let newState;
        switch (key) {
          case "CATEGORY":
            newState = {
              ...prev,
              [value]: {},
            };
            break;
          case "BRANDS":
            newState = {
              ...prev,
              [selectedCategory]: {
                ...prev[selectedCategory],
                [value]: [],
              },
            };
            break;
          case "MODELS":
            newState = {
              ...prev,
              [selectedCategory]: {
                ...prev[selectedCategory],
                [selectedBrand]: [
                  ...prev[selectedCategory][selectedBrand],
                  value,
                ],
              },
            };
            break;
          default:
            newState = prev;
        }
        // Resolve the promise after the state has been updated
        setTimeout(() => resolve(), 10);
        return newState;
      });
    });
  }

  const handleMutate = async () => {
    console.log("settingsData", settingsData);

    try {
      if (!products?.[0]?._id) {
        throw new Error("No product ID available");
      }

      const productId = products[0]._id;
      const updatedData = { ...settingsData };
      // console.log("Updating product with ID:", productId);
      // console.log("Sending data:", JSON.stringify(settingsData, null, 2));

      const result = await updateProduct({
        id: productId,
        body: updatedData,
      }).unwrap();

      console.log("Update successful:", result);

      // Invalidate the products query to refetch the latest data
      // queryClient.invalidateQueries("products");

      return result;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className='min-h-screen bg-gray-50 p-5 overflow-hidden'>
      <DetailsCard
        key='CATEGORY'
        heading='CATEGORY'
        modalTitle='Add New Category'
        handleAdd={handleAdd}
        handleMutate={handleMutate}>
        {
          <ol className='space-y-2'>
            {allCategory?.map(
              (item, index) =>
                item !== "_id" && (
                  <li
                    key={`${item}-${index}`}
                    className='px-3 py-2 bg-gray-50 rounded text-gray-800 text-sm truncate '>
                    {item.toUpperCase()}
                  </li>
                )
            )}
          </ol>
        }
      </DetailsCard>

      {/* BRANDS */}
      <DetailsCard
        key='BRANDS'
        heading='BRANDS'
        modalTitle='Add New Brand'
        handleAdd={handleAdd}
        handleMutate={handleMutate}>
        <div className='flex justify-center pt-2 w-full px-4'>
          <div className='w-full max-w-md'>
            <Select
              defValue={selectedCategory || ""}
              options={allCategory}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        <div className='p-3'>
          {
            <ol className='space-y-2 '>
              {allBrands.length > 0 ? (
                allBrands?.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className='px-3 py-2 bg-gray-50 rounded text-gray-800 text-sm truncate '>
                    {`${index + 1}. ${item}`}
                  </li>
                ))
              ) : (
                <li>
                  <p className='text-gray-500'>
                    No items. Add the first brand.
                  </p>
                </li>
              )}
            </ol>
          }
        </div>
      </DetailsCard>
      {/* MODELS */}
      <DetailsCard
        key='MODELS'
        heading='MODELS'
        modalTitle='Add New Model'
        handleAdd={handleAdd}
        handleMutate={handleMutate}
        isUpdating={isUpdating}>
        <div className='flex justify-center pt-2 w-full px-4'>
          <div className='w-full max-w-md'>
            <Select
              defValue={selectedBrand || ""}
              options={allBrands}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />
          </div>
        </div>
        <div className='p-3'>
          {
            <ol className='space-y-2'>
              {allModels.length > 0 ? (
                allModels?.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className='px-3 py-2 bg-gray-50 rounded text-gray-800 text-sm truncate'>
                    {`${index + 1}. ${item}`}
                  </li>
                ))
              ) : (
                <li>
                  <p className='text-gray-500'>
                    No items. Add the first model.
                  </p>
                </li>
              )}
            </ol>
          }
        </div>
      </DetailsCard>
    </div>
  );
};

export default Category;
