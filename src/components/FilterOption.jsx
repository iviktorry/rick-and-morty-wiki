export default function FilterOption({ label, option1, option2, option3 }) {
  return (
    <div className="flex gap-3">
      <label htmlFor={label}>{label}</label>
      <select
        name={label}
        id={label}
        className="rounded-lg px-2 py-1 ring-2 ring-neutral-800"
      >
        <option className="w-fit" value={option1}>
          {option1}
        </option>
        <option className="w-fit" value={option2}>
          {option2}
        </option>
        <option className="w-fit" value={option3}>
          {option3}
        </option>
      </select>
    </div>
  );
}
