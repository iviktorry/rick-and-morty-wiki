import { Search } from "lucide-react";

export default function Filters() {
  return (
    <form className="mx-auto w-fit lg:mx-2 lg:mt-70">
      <div className="flex items-center gap-2">
        <Search />
        <input type="text" className="ring" />
      </div>
    </form>
  );
}
