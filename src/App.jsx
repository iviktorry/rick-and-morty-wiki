import Filters from "./components/Filters";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    // bg-[#eee6ce]
    <div className="font-custom flex min-h-lvh flex-col gap-4 text-neutral-800 bg-[#eee6ce] tracking-widest">
      <Header />
      <div className="flex w-full flex-col gap-4 lg:flex-row justify-end">
        <Filters />
        <Main />
      </div>
    </div>
  );
}
