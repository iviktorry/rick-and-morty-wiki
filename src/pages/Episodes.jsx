import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import Character from "../components/Character";
import FilterOption from "../components/FilterOption";
import Filters from "../components/Filters";

function EpisodeCard({ episode }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const characterIds = episode.characters
      .map((url) => url.split("/").pop())
      .filter(Boolean);

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
        }
      });

    return () => controller.abort();
  }, [episode.characters]);

  return (
    <div className="flex flex-1 flex-col items-center gap-4 text-center">
      <h2 className="text-lg font-medium">
        {episode.episode}: {episode.name}
      </h2>
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
          <p>There are no characters in this episode.</p>
        )}
      </div>
    </div>
  );
}

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handlePageChange(newPage) {
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
        setEpisodes(res.results);
        setPages(res.info.pages);
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
  }, [currentPage]);

  const names = episodes.map((episode) => episode.name);

  function handleChange(value) {
    setFilter(value);
  }

  const filteredEpisodes = episodes.filter((episode) =>
    filter !== "" ? episode.name === filter : episode,
  );
  return (
    <section className="flex flex-1 flex-col items-center gap-10">
      <Filters>
        <FilterOption
          label="Choose an episode"
          options={names}
          handleChange={handleChange}
        />
      </Filters>
      {filteredEpisodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}

      <Pages
        pages={pages}
        currentPage={currentPage}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}
