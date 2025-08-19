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
    <tr>
      <td className='flex flex-row items-center gap-x-2'>
        <p>{srNO < 10 ? "0" + srNO : srNO}</p>
      </td>
      <td className='flex flex-row items-center gap-x-2'>
        <Select
          options={["google", "iphone"]}
          handleChange={(e) => handleChange(e, i, "brand")}
          productKey='brand'
        />
      </td>
      <td className='flex flex-row items-center gap-x-2'>
        <Select
          options={["pixel 6", "12 pro"]}
          handleChange={(e) => handleChange(e, i, "model")}
          productKey='model'
        />
      </td>
      <td className='flex flex-row items-center gap-x-2'>
        <input
          type='number'
          id='qty'
          onChange={(e) => handleChange(e, i, "qty")}
        />
      </td>
      <td className='flex flex-row items-center gap-x-2'>
        <button
          onClick={() => deleteItem(id, i)}
          type='button'>
          Delete
        </button>
      </td>
    </tr>
  );
}
