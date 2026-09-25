export default function FilterOption({
  label,
  options = [],
  value,
  handleChange,
}) {
  return (
    <>
      <select
        name={label}
        id={label}
        value={value}
        onChange={(e) => handleChange(e.target.value)}

        className="w-fit py-1"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
