interface SelectProps {
  defaultValue?: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  productKey?: boolean;
  className?: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  onChange,
  handleChange,
  productKey,
  className = "",
  defaultValue,
  label,
}) => {
  return (
    <select
      defaultValue={defaultValue || "Default"}
      onChange={productKey ? handleChange : onChange}
      className={`border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 ${className} py-1.5 text-sm`}>
      {!defaultValue && (
        <option
          value={defaultValue || "Default"}
          disabled={defaultValue ? true : false}>
          {label || defaultValue}
        </option>
      )}
      {options.map((opt) => (
        <option
          key={opt}
          value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default Select;
