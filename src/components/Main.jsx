import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Locations from "../pages/Locations";
import Episodes from "../pages/Episodes";
import Characters from "../pages/Characters";

export default function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </main>
  );
}
