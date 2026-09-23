import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    // bg-[#eee6ce]
    <div className="font-custom flex min-h-lvh flex-col gap-4 bg-[#eee6ce] tracking-widest text-neutral-800">
      <Header />
      {/* <div className="flex w-full flex-col justify-end gap-4 lg:flex-row"> */}
      <Main />
      {/* </div> */}
    </div>
  );
}
