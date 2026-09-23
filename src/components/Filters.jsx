import FilterButton from "./FilterButton";

export default function Filters() {
  return (
    <div className="w-full md:max-w-2xl lg:w-sm">
      <p className="text-xl font-medium">Filters</p>
      <div className="mt-2 rounded-lg">
        <details className="border-b-2 border-neutral-800 py-2">
          <summary>Status</summary>
          <div className="flex flex-wrap items-start gap-2 py-2">
            <FilterButton text="Alive" />
            <FilterButton text="Dead" />
            <FilterButton text="Unknown" />
          </div>
        </details>
        <details className="border-b-2 border-neutral-800 py-2">
          <summary className="marker:list-">Species</summary>
          <div className="flex flex-wrap items-start gap-2 py-2">
            <FilterButton text="Human" />
            <FilterButton text="Alien" />
            <FilterButton text="Unknown" />
          </div>
        </details>
        <details className="border-b-2 border-neutral-800 py-2">
          <summary>Gender</summary>
          <div className="flex flex-wrap items-start gap-2 py-2">
            <FilterButton text="Male" />
            <FilterButton text="Female" />
            <FilterButton text="Unknown" />
          </div>
        </details>
      </div>
    </div>
  );
}
