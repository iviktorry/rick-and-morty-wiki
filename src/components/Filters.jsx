import { Search } from "lucide-react";

export default function Filters() {
  return (
    <form className="mx-auto lg:top-70 lg:relative">
      <div className="flex gap-2 items-center">
        <Search />
        <input type="text" className="ring"/>
      </div>
    </form>
  );
}
