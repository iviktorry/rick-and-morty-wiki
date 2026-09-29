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

  function handleSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setCurrentPage(1);
    setSearchText(formData.get("search"));
  }

  function handleFilterChange(setterFunc, value) {
    setCurrentPage(1);
    setterFunc(value);
  }

  function handlePageChange(newPage) {
    setIsLoading(true);
    setCurrentPage(newPage);
  }

  useEffect(() => {
    const controller = new AbortController();
    document.title = "Characters | Wiki";

    const params = new URLSearchParams();
    params.set("page", currentPage);
    if (status.toLowerCase()) params.set("status", status);
    if (gender.toLowerCase()) params.set("gender", gender);
    if (species.toLowerCase()) params.set("species", species);
    if (searchText.toLowerCase()) params.set("name", searchText);

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
        setCharacters(res.results);
        setPages(res.info.pages);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`Uploading error: ${error}`);
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
      <SearchBar handleSearch={handleSearch} />
      <Filters>
        <FilterOption
          label="Status"
          id="status"
          defaultOption="Not selected"
          options={["Alive", "Dead", "unknown"]}
          isLoading={isLoading}
          handleChange={(value) => handleFilterChange(setStatus, value)}
        />
        <FilterOption
          label="Gender"
          id="gender"
          defaultOption="Not selected"
          options={["Male", "Female", "Genderless", "unknown"]}
          isLoading={isLoading}
          handleChange={(value) => handleFilterChange(setGender, value)}
        />
        <FilterOption
          label="Species"
          id="species"
          defaultOption="Not selected"
          isLoading={isLoading}
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

      <div
        className={`${characters.length ? "grid w-fit grid-cols-1 gap-5 self-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : ""}`}
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
          <p>Nothing was found for your search.</p>
        )}
      </div>
      <Pages
        pages={pages}
        currentPage={currentPage}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}
