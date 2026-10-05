import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Locations from "../pages/Locations";
import Episodes from "../pages/Episodes";
import Characters from "../pages/Characters";
import PageNotFound from "../pages/PageNotFound";
import type { JSX } from "react";

export default function Main(): JSX.Element {
  return (
    <main className="flex h-full flex-1 flex-col items-center gap-4 pb-4 lg:gap-8 lg:pb-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}
