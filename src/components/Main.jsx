import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Locations from "../pages/Locations";
import Episodes from "../pages/Episodes";
import Characters from "../pages/Characters";

export default function Main() {
  return (
    <main className="px-4 pb-4 mx-auto lg:mx-0">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Locations />} />
        <Route path="/episode" element={<Episodes />} />
        <Route path="/character" element={<Characters />} />
      </Routes>
    </main>
  );
}
