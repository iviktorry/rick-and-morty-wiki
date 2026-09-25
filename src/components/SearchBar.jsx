import { Search } from "lucide-react";

export default function SearchBar({ handleSearch }) {
  return (
    <form
      onSubmit={handleSearch}
      className="relative mx-auto flex h-8 w-full gap-3 md:w-2xl"
    >
      <Search className="absolute top-1 left-1 text-neutral-600" />
      <input
        type="text"
        name="search"
        className="w-full rounded-lg pl-9 ring-2 ring-neutral-800"
      />
      <button
        type="submit"
        className="rounded-lg bg-neutral-600 px-2 text-neutral-100 ring-2 ring-neutral-800 transition-all duration-300 ease-linear hover:bg-neutral-500"
      >
        Search
      </button>
    </form>
  );
}
