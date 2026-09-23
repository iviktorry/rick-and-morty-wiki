import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form className="relative mx-auto flex w-full gap-2 md:w-2xl">
      <Search className="absolute top-1 left-1" />
      <input
        type="text"
        className="w-full rounded-lg py-1 pl-9 ring-2 ring-neutral-800"
      />
      <button className="rounded-lg bg-neutral-600 px-2 text-neutral-100 ring-2 ring-neutral-800 transition-all duration-300 ease-linear hover:bg-neutral-500">
        Search
      </button>
    </form>
  );
}
