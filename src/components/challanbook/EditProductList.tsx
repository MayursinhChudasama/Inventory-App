import { singleProduct } from "@/models/models";
import { useGetProductsQuery } from "@/app/store/productsApi";

const EditProductList: React.FC<{ products: singleProduct[] }> = ({
  products,
}) => {
  const { data } = useGetProductsQuery();
  const productsOG = data?.[0];
  return (
    <div className='w-full bg-white rounded-lg border border-gray-200 overflow-hidden'>
      {products.map((product, index) => (
        <div key={index}>
          <p>{product.brand}</p>
          <p>{product.model}</p>
          <p>{product.qty}</p>
        </div>
      ))}
    </div>
  );
};

export default EditProductList;
