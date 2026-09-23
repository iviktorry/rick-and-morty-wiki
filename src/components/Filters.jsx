import { Search } from "lucide-react";

export default function Filters() {
  return (
    <form className="mx-auto w-fit lg:fixed lg:top-80 lg:left-0">
      <div className="flex items-center gap-2">
        <Search />
        <input type="text" className="w-50 ring" />
      </div>
    </form>
  );
}
