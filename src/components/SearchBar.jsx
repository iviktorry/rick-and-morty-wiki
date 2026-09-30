import { Search, X } from "lucide-react";

export default function SearchBar({
  handleSearch,
  setSearchText,
  setCurrentPage,
}) {
  return (
    <form
      onReset={() => {
        setSearchText("");
        setCurrentPage(1);
      }}
      onSubmit={handleSearch}
      className="relative mx-auto flex h-8 w-full gap-3 md:w-2xl"
    >
      <div className="relative h-full w-full">
        <Search
          className="absolute top-1 left-1 text-neutral-500"
          aria-hidden="true"
        />
        <input
          type="text"
          name="search"
          aria-label="Search characters"
          className="h-full w-full rounded-lg pl-9 ring-2 ring-neutral-800"
        />

        <button
          type="reset"
          aria-label="Clear all text"
          className="absolute top-1 right-1 text-neutral-500 transition-all duration-200 ease-linear hover:text-neutral-800 focus-visible:text-neutral-800"
        >
          <X aria-hidden="true" className="size-full" />
        </button>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-neutral-600 px-2 text-neutral-100 ring-2 ring-neutral-800 transition-all duration-300 ease-linear hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-2 focus-visible:outline-white"
      >
        Search
      </button>
    </form>
  );
}
