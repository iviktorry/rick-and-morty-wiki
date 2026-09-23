import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Locations from "../pages/Locations";
import Episodes from "../pages/Episodes";
import Characters from "../pages/Characters";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { useState } from "react";

export default function Main() {
  const [filterText, setFilterText] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = formData.get("search");
    setFilterText(search);
  }
  return (
    <main className="flex flex-col gap-4 px-4 pb-4 lg:gap-8 lg:pb-6">
      <SearchBar handleSearch={handleSearch} />
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <Filters />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/character"
              element={<Characters filterText={filterText} />}
            />
            <Route path="/location" element={<Locations />} />
            <Route path="/episode" element={<Episodes />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}
