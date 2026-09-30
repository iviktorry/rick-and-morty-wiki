import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import Character from "../components/Character";
import FilterOption from "../components/FilterOption";
import Filters from "../components/Filters";

function EpisodeCard({ episode }) {
  const characterIds = episode.characters
    .map((url) => url.split("/").pop())
    .filter(Boolean);

  const [characters, setCharacters] = useState([]);
  const [isCharLoading, setIsCharLoading] = useState(characterIds.length > 0);
  const [charError, setCharError] = useState(null);

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
          console.error(`Fetch error ${error}`);
          setCharError("Failed to load characters for this episode.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsCharLoading(false);
        }
      });

    return () => controller.abort();
  }, [episode.characters, characterIds]);

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

export default function Episodes() {
  const [episodesList, setEpisodesList] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEpId, setSelectedEpId] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [error, setError] = useState(null);

  function handlePageChange(newPage) {
    setError(null);
    setIsLoading(true);
    setCurrentPage(newPage);
  }

  useEffect(() => {
    const controller = new AbortController();
    document.title = "Episodes | Wiki";

    fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server mistake: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setEpisodesList(res.results);
        setPages(res.info.pages);
        if (res.results.length > 0) {
          setSelectedEpId(res.results[0].id);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`Fetch error: ${error}`);
          setError("Could not load episodes. Please try again.");
        }
      });

    return () => controller.abort();
  }, [currentPage]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://rickandmortyapi.com/api/episode/${selectedEpId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server mistake: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setCurrentEpisode(res);
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
  }, [selectedEpId]);

  function handleFilterChange(value) {
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
