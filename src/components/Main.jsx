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
        <Route path="/location" element={<Locations />} />
        <Route path="/episode" element={<Episodes />} />
        <Route path="/character" element={<Characters />} />
      </Routes>
    </main>
  );
}
