import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import CharacterEl from "../components/Character";
import FilterOption from "../components/FilterOption";
import Filters from "../components/Filters";
import { JSX } from "react";
import type { Character } from "./Characters";

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  url: string;
  created: string;
  characters: string[];
};

function EpisodeCard({ episode }: { episode: Episode }): JSX.Element {
  const characterIds = episode.characters
    .map((url) => url.split("/").pop())
    .filter(Boolean);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isCharLoading, setIsCharLoading] = useState<boolean>(
    characterIds.length > 0,
  );
  const [charError, setCharError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (!characterIds || characterIds.length === 0) return;

    async function getEpisodeCharacters(): Promise<void> {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${characterIds.join(",")}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`Server mistake: ${res.status}`);
        const data: Character[] = await res.json();
        setCharacters(Array.isArray(data) ? data : [data]);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(`Fetch error ${error}`);
          setCharError("Failed to load characters for this episode.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsCharLoading(false);
        }
      }
    }

    getEpisodeCharacters();
    return () => controller.abort();
  }, [episode.characters]);

  return (
    <div className="flex flex-1 flex-col items-center gap-4 text-center">
      <h2 className="text-lg font-medium">
        {episode.episode}: {episode.name}
      </h2>

      {isCharLoading && <p>Loading...</p>}
      {!isCharLoading && charError && <p>{charError}</p>}
      {!isCharLoading && !charError && characters.length === 0 && (
        <p>There are no characters in this episode.</p>
      )}
      {!isCharLoading && !charError && characters.length > 0 && (
        <div className="grid w-fit grid-cols-1 gap-5 self-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {characters.map((character: Character): JSX.Element => (
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
    </div>
  );
}

export default function Episodes(): JSX.Element {
  const [episodesList, setEpisodesList] = useState<Episode[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedEpId, setSelectedEpId] = useState<number>(1);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handlePageChange(newPage: number): void {
    setError(null);
    setIsLoading(true);
    setCurrentPage(newPage);
  }

  useEffect(() => {
    const controller = new AbortController();
    document.title = "Episodes | Wiki";

    async function getEpisodePages(): Promise<void> {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/episode?page=${currentPage}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error(`Server mistake: ${res.status}`);
        const data = await res.json();
        setEpisodesList(data.results);
        setPages(data.info.pages);
        if (data.results.length > 0) {
          setSelectedEpId(data.results[0].id);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
          setError("Could not load episodes. Please try again.");
        }
      }
    }

    getEpisodePages();
    return () => controller.abort();
  }, [currentPage]);

  useEffect(() => {
    const controller = new AbortController();

    async function getCurrentEpisode(): Promise<void> {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/episode/${selectedEpId}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error(`Server mistake: ${res.status}`);
        const data: Episode = await res.json();
        setCurrentEpisode(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
          setError(`Could not load selected episode. Please try again`);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getCurrentEpisode();
    return () => controller.abort();
  }, [selectedEpId]);

  function handleFilterChange(value: number): void {
    setError(null);
    setIsLoading(true);
    setSelectedEpId(value);
  }

  return (
    <section className="flex flex-1 flex-col items-center gap-10">
      <Filters>
        <FilterOption
          label="Choose an episode"
          id="episode"
          isLoading={isLoading}
          options={episodesList}
          handleChange={handleFilterChange}
          value={selectedEpId}
        />
      </Filters>

      <h1 className="sr-only">Episodes</h1>

      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && currentEpisode && (
        <EpisodeCard key={currentEpisode.id} episode={currentEpisode} />
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
