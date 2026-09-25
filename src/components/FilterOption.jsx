export default function FilterOption({
  label,
  options = [],
  value,
  handleChange,
}) {
  return (
    <select
      name={label}
      id={label}
      value={value}
      onChange={(e) => handleChange(e.target.value)}

      className="h-8 w-full rounded-lg px-2 py-1 text-center ring-2 ring-neutral-800"
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
