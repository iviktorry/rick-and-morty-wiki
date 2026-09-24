import FilterOption from "./FilterOption";

export default function Filters() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-center text-xl font-medium">Filters</p>
      <FilterOption
        label="Status"
        option1="Alive"
        option2="Dead"
        option3="Else"
      />
      <FilterOption
        label="Gender"
        option1="Male"
        option2="Female"
        option3="Else"
      />
      <FilterOption
        label="Species"
        option1="Human"
        option2="Alien"
        option3="Else"
      />
    </div>
  );
}
