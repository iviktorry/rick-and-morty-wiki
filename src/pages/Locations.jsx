import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import Character from "../components/Character";
import Filters from "../components/Filters";
import FilterOption from "../components/FilterOption";

export function LocationCard({ location }) {
  const characterIds = location.residents
    .map((url) => url.split("/").pop())
    .filter(Boolean);

  const [characters, setCharacters] = useState([]);
  const [charError, setCharError] = useState(null);
  const [isCharLoading, setIsCharLoading] = useState(characterIds.length > 0);

  useEffect(() => {
    const controller = new AbortController();

    if (!characterIds || characterIds.length === 0) return;

    fetch(
      `https://rickandmortyapi.com/api/character/${characterIds.join(",")}`,
      { signal: controller.signal },
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Server mistake: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setCharacters(Array.isArray(res) ? res : [res]);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
          setCharError("Failed to load residents for this location.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsCharLoading(false);
        }
      });

    return () => controller.abort();
  }, [location.residents, characterIds]);

  return (
    <div className="flex flex-1 flex-col items-center gap-4 text-center">
      <h2 className="text-lg font-medium">
        {location.name}: {location.type}
      </h2>

      {isCharLoading && <p>Loading characters...</p>}
      {!isCharLoading && charError && <p>{charError}</p>}
      {!isCharLoading && !charError && characters.length === 0 && (
        <p>There are no residents in this location.</p>
      )}
      {!isCharLoading && !charError && characters.length > 0 && (
        <div className="grid w-fit grid-cols-1 gap-5 self-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {characters.map((character) => (
            <Character
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              gender={character.gender}
              species={character.species}
              image={character.image}
              origin={character.origin.name}
              location={character.location.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Locations() {
  const [locationList, setLocationList] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocId, setSelectedLocId] = useState(1);
  const [currentLoc, setCurrentLoc] = useState(null);
  const [error, setError] = useState(null);

  function handlePageChange(newPage) {
    setError(null);
    setIsLoading(true);
    setCurrentPage(newPage);
  }

  useEffect(() => {
    const controller = new AbortController();
    document.title = "Locations | Wiki";

    fetch(`https://rickandmortyapi.com/api/location?page=${currentPage}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`server error: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setLocationList(res.results);
        setPages(res.info.pages);
        if (res.results.length > 0) {
          setSelectedLocId(res.results[0].id);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
          setError("Could not load locations. Please try again.");
        }
      });

    return () => controller.abort();
  }, [currentPage]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://rickandmortyapi.com/api/location/${selectedLocId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`server error: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setCurrentLoc(res);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [selectedLocId]);

  function handleChange(value) {
    setError(null);
    setIsLoading(true);
    setSelectedLocId(value);
  }

  return (
    <section className="flex flex-1 flex-col items-center gap-10">
      <Filters>
        <FilterOption
          label="Choose location"
          id="location"
          isLoading={isLoading}
          options={locationList}
          handleChange={handleChange}
          value={selectedLocId}
        />
      </Filters>

      <h1 className="sr-only">Locations</h1>

      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && currentLoc && (
        <LocationCard key={currentLoc.id} location={currentLoc} />
      )}

      <Pages
        pages={pages}
        currentPage={currentPage}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}
