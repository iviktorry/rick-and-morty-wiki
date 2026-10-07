import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import CharacterEl from "../components/Character";
import Filters from "../components/Filters";
import FilterOption from "../components/FilterOption";
import type { JSX } from "react";
import type { Character } from "./Characters";

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

export function LocationCard({
  location,
}: {
  location: Location;
}): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [charError, setCharError] = useState<string | null>(null);
  const [isCharLoading, setIsCharLoading] = useState<boolean>(false);

  const characterIds = location.residents
    .map((url) => url.split("/").pop())
    .filter(Boolean);

  useEffect(() => {
    const controller = new AbortController();

    if (!characterIds || characterIds.length === 0) return;

    async function getLocationCharacters(): Promise<void> {
      try {
        setIsCharLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${characterIds.join(",")}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`Server mistake: ${res.status}`);
        const data: Character | Character[] = await res.json();
        setCharacters(Array.isArray(data) ? data : [data]);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
          setCharError("Failed to load residents for this location.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsCharLoading(false);
        }
      }
    }

    getLocationCharacters();
    return () => controller.abort();
  }, [location.residents]);

  return (
    <div className="flex flex-1 flex-col items-center gap-4 text-center">
      <h2 className="text-lg font-bold">
        {location.name}: {location.type}
      </h2>

      {isCharLoading && <p>Loading characters...</p>}
      {!isCharLoading && charError && <p>{charError}</p>}
      {!isCharLoading && !charError && characters.length === 0 && (
        <p>There are no residents in this location.</p>
      )}
      {!isCharLoading && !charError && characters.length > 0 && (
        <div className="grid w-fit grid-cols-1 gap-5 self-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {characters.map(
            (character: Character, index: number): JSX.Element => (
              <CharacterEl
                key={character.id}
                id={character.id}
                index={index}
                name={character.name}
                status={character.status}
                gender={character.gender}
                species={character.species}
                image={character.image}
                origin={character.origin.name}
                location={character.location.name}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default function Locations(): JSX.Element {
  const [locationList, setLocationList] = useState([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [isSelectedLoading, setIsSelectedLoading] = useState<boolean>(true);
  const [selectedLocId, setSelectedLocId] = useState<number>(1);
  const [currentLoc, setCurrentLoc] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handlePageChange(newPage: number): void {
    setError(null);
    setCurrentPage(newPage);
  }

  useEffect(() => {
    const controller = new AbortController();
    document.title = "Locations | Wiki";

    async function getLocationPages(): Promise<void> {
      try {
        setIsListLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/location?page=${currentPage}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error(`server error: ${res.status}`);
        const data = await res.json();
        setLocationList(data.results);
        setPages(data.info.pages);
        if (data.results.length > 0) {
          setSelectedLocId(data.results[0].id);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
          setError("Could not load locations. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsListLoading(false);
        }
      }
    }

    getLocationPages();
    return () => controller.abort();
  }, [currentPage]);

  useEffect(() => {
    const controller = new AbortController();

    async function getCurrentLocation(): Promise<void> {
      try {
        setIsSelectedLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/location/${selectedLocId}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error(`server error: ${res.status}`);
        const data: Location = await res.json();
        setCurrentLoc(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
          setError(`Could not load selected location. Please try again`);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSelectedLoading(false);
        }
      }
    }

    getCurrentLocation();
    return () => controller.abort();
  }, [selectedLocId]);

  function handleFilterChange(value: number): void {
    setError(null);
    setSelectedLocId(value);
  }

  return (
    <section className="flex flex-1 flex-col items-center gap-10">
      <Filters>
        <FilterOption
          label="Choose location"
          id="location"
          options={locationList}
          isLoading={isListLoading || isSelectedLoading}
          handleChange={handleFilterChange}
          value={selectedLocId}
        />
      </Filters>

      <h1 className="sr-only">Locations</h1>

      {(isListLoading || isSelectedLoading) && <p>Loading...</p>}
      {!isListLoading && !isSelectedLoading && error && <p>{error}</p>}
      {!isListLoading && !isSelectedLoading && !error && currentLoc && (
        <LocationCard key={currentLoc.id} location={currentLoc} />
      )}

      <Pages
        pages={pages}
        currentPage={currentPage}
        isLoading={isListLoading}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}
