interface SelectProps {
  defValue?: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  productKey?: string;
  className?: string;
  placeholder?: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  defValue = "",
  options = [],
  onChange,
  handleChange,
  productKey,
  className = "",
  placeholder,
  label,
}) => {
  return (
    <select
      value={defValue}
      onChange={productKey ? handleChange : onChange}
      className={`w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 ${className}`}>
      <option
        value=''
        disabled
        hidden>
        {label ||
          placeholder ||
          (options.length === 0
            ? "No options"
            : productKey?.replace(/([A-Z])/g, " $1").trim() || "Select")}
      </option>
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
