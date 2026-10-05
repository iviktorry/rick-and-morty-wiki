import Header from "./components/Header";
import Main from "./components/Main";
import type { JSX } from "react";

export default function App(): JSX.Element {
  return (
    <div className="font-custom flex min-h-lvh flex-col gap-4 bg-orange-100 px-4 tracking-widest text-neutral-800">
      <Header />
      <Main />
    </div>
  );
}
