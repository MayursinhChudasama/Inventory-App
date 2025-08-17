import Select from "./Select";

export default function SingleItem({
  id,
  i,
  deleteItem,
  handleChange,
}: {
  id: number;
  i: number;
  deleteItem: (id: number, i: number) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number,
    key: string
  ) => void;
}) {
  const srNO = i + 1;

  return (
    <div className='flex gap-x-4 items-end'>
      <div className='flex flex-row items-center gap-x-2'>
        <p>{srNO < 10 ? "0" + srNO : srNO}</p>
      </div>
      <div className='flex flex-row items-center gap-x-2'>
        <label htmlFor='brand'>Brand</label>
        <Select
          options={["google", "iphone"]}
          handleChange={(e) => handleChange(e, i, "brand")}
          productKey='brand'
        />
      </div>
      <div className='flex flex-row items-center gap-x-2'>
        <label htmlFor='model'>Model</label>
        <Select
          options={["pixel 6", "12 pro"]}
          handleChange={(e) => handleChange(e, i, "model")}
          productKey='model'
        />
      </div>
      <div className='flex flex-row items-center gap-x-2'>
        <label htmlFor='qty'>Quantity</label>
        <input
          type='number'
          id='qty'
          onChange={(e) => handleChange(e, i, "qty")}
        />
      </div>
      <div className='flex flex-row items-center gap-x-2'>
        <button
          onClick={() => deleteItem(id, i)}
          type='button'>
          Delete
        </button>
      </div>
    </div>
  );
}
