import Filters from "./components/Filters";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    // bg-[#eee6ce]
    <div className="font-custom flex min-h-lvh flex-col gap-4 bg-[#eee6ce] tracking-wider">
      <Header />
      <div className="flex w-full flex-1 flex-col lg:flex-row">
        <Filters />
        <Main />
      </div>
    </div>
  );
}
