import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import Character from "../components/Character";
import FilterOption from "../components/FilterOption";
import Filters from "../components/Filters";

function EpisodeCard({ episode }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const characterIds = episode.characters
      .map((url) => url.split("/").pop())
      .filter(Boolean);

    if (characterIds === 0) {
      return;
    }

    fetch(`https://rickandmortyapi.com/api/character/${characterIds.join(",")}`)
      .then((res) => res.json())
      .then((res) => {
        setCharacters(Array.isArray(res) ? res : [res]);
      })
      .catch((error) => console.error(error));
  }, [episode.characters]);

  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <p className="text-lg font-medium">
        {episode.episode}: {episode.name}
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
            There are no characters in this episode.
          </p>
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

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
      .then((res) => {
        if (!res.ok) throw new Error(`server mistake: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setEpisodes(res.results);
        setPages(res.info.pages);
      });
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
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
    </section>
  );
}
