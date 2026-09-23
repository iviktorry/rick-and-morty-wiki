import { useEffect, useState } from "react";

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode`)
      .then((res) => res.json())
      .then((res) => setEpisodes(res.results));
  }, []);
  return (
    <section>
      <p>episodes</p>
      {episodes.map((episode) => (
        <div key={episode.id}>
          <p>
            {episode.episode}, {episode.name}, {episode.air_date}, {episode.url}
            , {episode.created}
          </p>
          {episode.characters.map((character) => (
            <p key={character}>{character}</p>
          ))}
        </div>
      ))}
    </section>
  );
}
