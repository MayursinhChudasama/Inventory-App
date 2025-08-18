const Select: React.FC<{
  defValue?: string;
  options?: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  productKey?: string;
}> = ({ defValue, options, onChange, handleChange, productKey }) => {
  return (
    <div>
      <select
        defaultValue={defValue || "select"}
        onChange={productKey ? handleChange : onChange}>
        <option
          value='select'
          disabled>
          Choose
        </option>
        {options?.map((opt) => (
          <option
            key={opt}
            value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
