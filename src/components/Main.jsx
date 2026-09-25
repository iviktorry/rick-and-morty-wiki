import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Locations from "../pages/Locations";
import Episodes from "../pages/Episodes";
import Characters from "../pages/Characters";

export default function Main() {
  return (
    <main className="flex h-full flex-1 flex-col items-center gap-4 pb-4 lg:gap-8 lg:pb-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character" element={<Characters />} />
        <Route path="/location" element={<Locations />} />
        <Route path="/episode" element={<Episodes />} />
      </Routes>
    </main>
  );
}
