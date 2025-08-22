interface ObjectType {
  [key: string]: string | undefined;
}
interface FilterSelectProps {
  setSelectedBrand?: (brand: string) => void;
  isDisabled?: boolean;
  label: string;
  options: string[];
  defValue: string;
  onChange: (ObjectType) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  defValue,
  onChange,
  setSelectedBrand,
  isDisabled,
}) => {
  const keyName = label.toLowerCase();
  const selectClassNames = `w-full p-2 border  rounded-md bg-white text-sm ${
    isDisabled ? "border-gray-300" : "border-gray-800"
  }`;
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange({ [keyName]: e.target.value });
    if (keyName === "brand") {
      setSelectedBrand(e.target.value);
    }
  }
  return (
    <>
      <p
        className={`text-xs  mb-1 ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}>
        {label}
      </p>
      <select
        disabled={isDisabled}
        value={defValue}
        onChange={handleChange}
        className={selectClassNames}>
        <option
          value='all'
          className={`text-xs ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}>
          {isDisabled ? "Pick a Brand" : "All"}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterSelect;
