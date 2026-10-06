import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import CharacterEl from "../components/Character";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import FilterOption from "../components/FilterOption";
import type { JSX, SubmitEvent } from "react";
import { Dispatch, SetStateAction } from "react";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type CharacterPageResponse = {
  results: Character[];
  info: {
    pages: number;
    count: number;
    next: string | null;
    prev: string | null;
  };
};

export default function Characters(): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function handleSearch(event: SubmitEvent) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const searchValue = formData.get("search");
    setCurrentPage(1);
    setSearchText(String(searchValue || ""));
  }

  function handleFilterChange(
    setterFunc: Dispatch<SetStateAction<string>>,
    value: string,
  ): void {
    setError(null);
    setCurrentPage(1);
    setterFunc(value);
  }

  function handlePageChange(newPage: number): void {
    setError(null);
    setCurrentPage(newPage);
  }

  useEffect(() => {
    const controller = new AbortController();
    document.title = "Characters | Wiki";

    const params = new URLSearchParams();
    params.set("page", String(currentPage));
    if (status) params.set("status", status);
    if (gender) params.set("gender", gender);
    if (species) params.set("species", species);
    if (searchText) params.set("name", searchText);

    async function getCharactersInfo(): Promise<void> {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?${params.toString()}`,
          {
            signal: controller.signal,
          },
        );
        if (res.status === 404) {
          setCharacters([]);
          setPages(0);
          return;
        }
        if (!res.ok) throw new Error(`server mistake ${res.status}`);
        const data: CharacterPageResponse = await res.json();
        setCharacters(data.results);
        setPages(data.info.pages);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(`uploading error: ${error}`);
          setError("Could not load characters. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getCharactersInfo();
    return () => controller.abort();
  }, [currentPage, gender, species, status, searchText]);

  return (
    <section className="flex flex-1 flex-col items-center gap-6 text-center">
      <SearchBar
        handleSearch={handleSearch}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
        setError={setError}
      />
      <Filters>
        <FilterOption
          label="Status"
          id="status"
          value={status}
          isLoading={isLoading}
          defaultOption="Not selected"
          options={["Alive", "Dead", "unknown"]}
          handleChange={(value) => handleFilterChange(setStatus, value)}
        />
        <FilterOption
          label="Gender"
          id="gender"
          value={gender}
          defaultOption="Not selected"
          isLoading={isLoading}
          options={["Male", "Female", "Genderless", "unknown"]}
          handleChange={(value) => handleFilterChange(setGender, value)}
        />
        <FilterOption
          label="Species"
          id="species"
          defaultOption="Not selected"
          options={[
            "Human",
            "Alien",
            "Humanoid",
            "Poopybutthole",
            "Mythological Creature",
          ]}
          value={species}
          isLoading={isLoading}
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
          {characters.map((character: Character) => (
            <CharacterEl
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
