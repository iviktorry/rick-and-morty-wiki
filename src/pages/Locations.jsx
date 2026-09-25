import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import Character from "../components/Character";
import Filters from "../components/Filters";
import FilterOption from "../components/FilterOption";

export function LocationCard({ location }) {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const characterIds = location.residents
      .map((url) => url.split("/").pop())
      .filter(Boolean);

    if (characterIds.length === 0) return;

    fetch(`https://rickandmortyapi.com/api/character/${characterIds.join(",")}`)
      .then((res) => res.json())
      .then((res) => {
        setCharacters(Array.isArray(res) ? res : [res]);
      });
  }, [location.residents]);

  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <p className="text-lg font-medium">
        {location.name}: {location.type}
      </p>
      <div
        className={`${characters.length ? "grid w-fit grid-cols-1 gap-5 self-center sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : ""}`}
      >
        {characters.length ? (
          characters.map((character) => (
            <Character
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              gender={character.gender}
              species={character.species}
              character={character}
              image={character.image}
              origin={character.origin.name}
              location={character.location.name}
            />
          ))
        ) : (
          <p className="text-center">
            There are no residents on this location.
          </p>
        )}
      </div>
    </div>
  );
}

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location?page=${currentPage}`)
      .then((res) => {
        if (!res.ok) throw new Error(`server error: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setLocations(res.results);
        setPages(res.info.pages);
      });
  }, [currentPage]);

  const names = locations.map((location) => location.name);

  function handleChange(value) {
    setFilter(value);
  }

  const filteredLocations = locations.filter((location) =>
    filter !== "" ? location.name === filter : location,
  );
  return (
    <section className="flex flex-1 flex-col items-center gap-10">
      <Filters>
        <FilterOption
          label="Choose location"
          options={names}
          handleChange={handleChange}
        />
      </Filters>

      {filteredLocations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}

      <Pages
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
    </section>
  );
}
