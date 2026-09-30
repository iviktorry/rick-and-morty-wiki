export default function FilterOption({
  id,
  label,
  options = [],
  handleChange,
  defaultOption,
  isLoading,
  value,
}) {
  return (
    <div className="flex flex-1 items-center gap-2">
      <label htmlFor={id} className="font-semibold whitespace-nowrap">
        {label}:
      </label>

      <select
        name={id}
        id={id}
        value={value}
        disabled={isLoading}
        onChange={(e) => handleChange(e.target.value)}
        className="h-8 w-full min-w-38 rounded-lg py-1 text-center ring-2 ring-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((option) => {
          const optValue = typeof option === "object" ? option.id : option;
          const optName = typeof option === "object" ? option.name : option;
          return (
            <option key={optValue} value={optValue}>
              {optName}
            </option>
          );
        })}
      </select>
    </div>
  );
}
