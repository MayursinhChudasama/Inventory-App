import Select from "@/components/InputForm/Select";
import DetailsCard from "@/components/settings/DetailsCard";
import { useEffect, useState } from "react";
import ModalInput from "../ui/ModalInput";
type BrandModels = {
  [brand: string]: string[];
};

type SettingsData = {
  [category: string]: BrandModels;
};
const Category: React.FC = () => {
  const [settingsData, setSettingsData] = useState<SettingsData>({
    "Black Cover": {
      Google: [
        "Pixel 6",
        "Pixel 7",
        "Pixel 7 Pro",
        "Pixel 7",
        "Pixel 7 Pro",
        "Pixel 7",
        "Pixel 7 Pro",
      ],
      iPhone: ["iPhone 12", "iPhone 13", "iPhone 14"],
      Samsung: ["Galaxy S21", "Galaxy S22", "Galaxy S23"],
      Realme: ["Realme 12", "Realme 13", "Realme 14"],
    },
    Packing: {
      IR: ["IR 1", "IR 2", "IR 3"],
      OR: ["OR 1", "OR 2", "OR 3"],
      CTN: ["CTN 1", "CTN 2", "CTN 3"],
    },
  });
  console.log(settingsData);

  const allCategory = Object.keys(settingsData);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    allCategory[0] || ""
  );

  const allBrands = Object.keys(settingsData[selectedCategory] || []);
  const [selectedBrand, setSelectedBrand] = useState<string>(
    allBrands[0] || ""
  );

  const allModels = Object.values(
    settingsData[selectedCategory][selectedBrand] || []
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const newBrands = Object.keys(settingsData[newCategory] || []);
    setSelectedBrand(newBrands[0]);
  };

  useEffect(() => {
    if (allBrands.length > 0 && !allBrands.includes(selectedBrand)) {
      setSelectedBrand(allBrands[0] || "");
    }
  }, [allBrands, selectedBrand]);

  function handleAdd(key: string, value: string) {
    console.log(key, value);

    switch (key) {
      case "CATEGORY":
        setSettingsData((prev) => ({
          ...prev,
          [value]: {},
        }));
        break;
      case "BRANDS":
        setSettingsData((prev) => ({
          ...prev,
          [selectedCategory]: {
            ...prev[selectedCategory],
            [value]: [],
          },
        }));
        break;
      case "MODELS":
        setSettingsData((prev) => ({
          ...prev,
          [selectedCategory]: {
            ...prev[selectedCategory],
            [selectedBrand]: [...prev[selectedCategory][selectedBrand], value],
          },
        }));
        break;
      default:
        break;
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-5 overflow-hidden'>
      <DetailsCard
        key='CATEGORY'
        heading='CATEGORY'
        modalTitle='Add New Category'
        handleAdd={handleAdd}>
        {
          <ol className='space-y-2'>
            {allCategory?.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className='px-3 py-2 bg-gray-50 rounded text-gray-800 text-sm truncate '>
                {item.toUpperCase()}
              </li>
            ))}
          </ol>
        }
      </DetailsCard>

      {/* BRANDS */}
      <DetailsCard
        key='BRANDS'
        heading='BRANDS'
        modalTitle='Add New Brand'
        handleAdd={handleAdd}>
        <div className='flex justify-center pt-2 '>
          <Select
            defValue={selectedCategory}
            options={allCategory}
            onChange={handleCategoryChange}
          />
        </div>
        <div className='p-3'>
          {
            <ol className='space-y-2 '>
              {allBrands?.length > 0 ? (
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
        handleAdd={handleAdd}>
        <div className='flex justify-center pt-2 '>
          <Select
            defValue={selectedBrand}
            options={allBrands}
            onChange={(e) => setSelectedBrand?.(e.target.value)}
          />
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
