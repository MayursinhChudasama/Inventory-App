import Select from "@/components/InputForm/Select";
import DetailsCard from "@/components/settings/DetailsCard";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "@/app/store/products";
import Loading from "../Loading";

type BrandModels = {
  [brand: string]: string[];
};

type SettingsData = {
  [category: string]: BrandModels;
};
//
const Category: React.FC = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const products = data?.[0];
  const [addProduct, { isLoading: isAddProductLoading }] =
    useAddProductMutation();
  const [deleteProduct, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState<string>("");

  const allCategory =
    Object.keys(products || {}).filter((key) => key !== "_id") || [];
  const [selectedCategory, setSelectedCategory] = useState<string>(
    allCategory[0]
  );

  const allBrands = Object.keys(products?.[selectedCategory] || {}) || [];
  const [selectedBrand, setSelectedBrand] = useState<string>(allBrands[0]);

  const allModels =
    Object.values(products?.[selectedCategory]?.[selectedBrand] || {}) || [];

  //
  useEffect(() => {
    setSelectedCategory(allCategory[0]);
  }, [products]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const products = data[0];
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const newBrands = Object.keys(products[newCategory] || {});
    setSelectedBrand(newBrands[0]);
  };

  useEffect(() => {
    if (allBrands.length > 0 && !allBrands.includes(selectedBrand)) {
      setSelectedBrand(allBrands[0]);
    }
  }, [allBrands, selectedBrand]);

  const handleAddModel = async (type: string, value: string) => {
    try {
      if (!data?.[0]?._id) {
        throw new Error("No product ID available");
      }
      const productId = data[0]._id;
      let payload = {};
      if (type == "MODELS") {
        payload = {
          type: "addModel",
          body: { [selectedCategory + "." + selectedBrand]: value },
        };
      } else if (type == "BRANDS") {
        payload = {
          type: "addBrand",
          body: { [selectedCategory + "." + value]: [] },
        };
      }
      console.log("payload", payload);

      const result = await addProduct({
        id: productId,
        body: payload,
      }).unwrap();
      return result;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  };

  const handleDeleteModel = async (type: string, value: string) => {
    try {
      if (!data?.[0]?._id) {
        throw new Error("No product ID available");
      }
      const productId = data[0]._id;
      let payload = {};
      if (type == "MODELS") {
        payload = {
          type: "deleteModel",
          body: { [selectedCategory + "." + selectedBrand]: value },
        };
      } else if (type == "BRANDS") {
        payload = {
          type: "deleteBrand",
          body: { [selectedCategory + "." + "value"]: "" },
        };
      }
      console.log("payload", payload);

      const result = await deleteProduct({
        id: productId,
        body: payload,
      }).unwrap();
      setShowDeleteConfirm(false);
      return result;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  };

  //
  if (isLoading) return <Loading />;
  // return <h1>SettingsPage</h1>;
  return (
    <div className='min-h-screen bg-gray-50 p-5 overflow-hidden'>
      <DetailsCard
        key='CATEGORY'
        heading='CATEGORY'
        modalTitle='Add New Category'>
        {
          <ol className='space-y-2'>
            {allCategory?.map(
              (item, index) =>
                item !== "_id" && (
                  <li
                    key={`${item}-${index}`}
                    className='px-3 py-2  rounded text-gray-800 text-sm truncate '>
                    {`${index + 1}. ${item.toUpperCase()}`}
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
        // handleAdd={handleAdd}
        handleAddModel={handleAddModel}>
        <div className='flex text-center justify-center pt-2 w-full px-4'>
          <div className='w-full max-w-md'>
            <Select
              defaultValue={selectedCategory}
              options={allCategory}
              onChange={handleCategoryChange}
              label='Brands'
            />
          </div>
        </div>
        <div className='p-3'>
          {
            <ol className='space-y-2 '>
              {allBrands.length > 0 ? (
                allBrands?.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className='flex items-center justify-between'>
                    <li
                      key={`${item}-${index}`}
                      className='px-3 py-2 rounded text-gray-800 text-sm truncate '>
                      {`${index + 1}. ${item}`}
                    </li>
                    <button
                      onClick={() => {
                        setDeleteItem(item);
                        setShowDeleteConfirm(true);
                      }}
                      className='text-sm text-red-500 hover:text-red-600 cursor-pointer'>
                      Delete
                    </button>
                  </div>
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
        // handleAdd={handleAdd}
        handleAddModel={handleAddModel}
        isUpdating={isAddProductLoading}>
        <div className='flex text-center justify-center pt-2 w-full px-4'>
          <div className='w-full max-w-md'>
            <Select
              defaultValue={selectedBrand}
              options={allBrands}
              onChange={(e) => setSelectedBrand(e.target.value)}
              label='Models'
            />
          </div>
        </div>
        <div className='p-3'>
          {
            <ol className='space-y-2'>
              {allModels.length > 0 ? (
                allModels?.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className='flex items-center justify-between'>
                    <li className='px-3 py-2  rounded text-gray-800 text-sm truncate'>
                      {`${index + 1}. ${item}`}
                    </li>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => {
                          setDeleteItem(item);
                          setShowDeleteConfirm(true);
                        }}
                        className='text-sm text-red-500 hover:text-red-600 cursor-pointer'>
                        Delete
                      </button>
                    </div>
                  </div>
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
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title='Confirm Deletion'>
        <div className='space-y-4'>
          <p>Are you sure you want to delete {selectedCategory}?</p>
          <div className='flex justify-end space-x-2 mt-4'>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              Cancel
            </button>
            <button
              onClick={() => handleDeleteModel("MODELS", deleteItem)}
              disabled={isDeleteProductLoading}
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
              {isDeleteProductLoading ? "Deleting..." : "Confirm Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
