import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import Character from "../components/Character";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import FilterOption from "../components/FilterOption";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSearch(event) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    setCurrentPage(1);
    setSearchText(formData.get("search"));
  }

  function handleFilterChange(setterFunc, value) {
    setError(null);
    setCurrentPage(1);
    setterFunc(value);
  }

  function handlePageChange(newPage) {
    setError(null);
    setIsLoading(true);
    setCurrentPage(newPage);
  }

  useEffect(() => {
    const controller = new AbortController();
    document.title = "Characters | Wiki";

    const params = new URLSearchParams();
    params.set("page", currentPage);
    if (status) params.set("status", status);
    if (gender) params.set("gender", gender);
    if (species) params.set("species", species);
    if (searchText) params.set("name", searchText);

    fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 404) {
          setCharacters([]);
          setPages(0);
          return null;
        }
        if (!res.ok) throw new Error(`server mistake: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        if (!res) return;
        setCharacters(res.results);
        setPages(res.info.pages);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`Uploading error: ${error}`);
          setError("Could not load characters. Please try again.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [currentPage, gender, species, status, searchText]);

  return (
    <section className="flex flex-1 flex-col items-center gap-6 text-center">
      <SearchBar
        handleSearch={handleSearch}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />
      <Filters>
        <FilterOption
          label="Status"
          id="status"
          defaultOption="Not selected"
          options={["Alive", "Dead", "unknown"]}
          isLoading={isLoading}
          value={status}
          handleChange={(value) => handleFilterChange(setStatus, value)}
        />
        <FilterOption
          label="Gender"
          id="gender"
          defaultOption="Not selected"
          options={["Male", "Female", "Genderless", "unknown"]}
          isLoading={isLoading}
          value={gender}
          handleChange={(value) => handleFilterChange(setGender, value)}
        />
        <FilterOption
          label="Species"
          id="species"
          defaultOption="Not selected"
          isLoading={isLoading}
          value={species}
          options={[
            "Human",
            "Alien",
            "Humanoid",
            "Poopybutthole",
            "Mythological Creature",
          ]}
          handleChange={(value) => handleFilterChange(setSpecies, value)}
        />
      </Filters>
      <h1 className="sr-only">Characters</h1>

      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && characters.length === 0 && (
        <p>Nothing was found for your search</p>
      )}
      {!isLoading && !error && characters.length > 0 && (
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

      <Pages
        pages={pages}
        currentPage={currentPage}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}
