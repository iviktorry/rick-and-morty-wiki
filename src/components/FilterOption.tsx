import type { JSX } from "react";
import type { Location } from "../pages/Locations";
import type { Episode } from "../pages/Episodes";

type FilterOptionProps<T extends string | number> = {
  id: number | string;
  label: string;
  options: string[] | Location[] | Episode[];
  handleChange: (value: T) => void;
  defaultOption?: string;
  value: T;
  isLoading: boolean;
};

export default function FilterOption<T extends string | number>({
  id,
  label,
  options = [],
  handleChange,
  defaultOption,
  value,
  isLoading,
}: FilterOptionProps<T>): JSX.Element {
  return (
    <div className="flex flex-1 items-center gap-2">
      <label htmlFor={String(id)} className="font-semibold whitespace-nowrap">
        {label}:
      </label>

      <select
        name={String(id)}
        id={String(id)}
        value={value}
        disabled={isLoading}
        onChange={(e) => {
          const val = e.target.value;
          const parsedVal = (
            typeof value === "number" ? Number(val) : val
          ) as T;
          handleChange(parsedVal);
        }}
        className="h-8 w-full min-w-38 rounded-lg py-1 text-center ring-2 ring-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map(
          (option: { name: string; id: number } | string): JSX.Element => {
            const optValue: number | string =
              typeof option === "object" ? option.id : option;
            const optName: string =
              typeof option === "object" ? option.name : option;
            return (
              <option key={optValue} value={optValue}>
                {optName}
              </option>
            );
          },
        )}
      </select>
    </div>
  );
}
