import { useEffect, useState } from "react";

export default function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((res) => res.json())
      .then((res) => setCharacters(res.results));
  }, []);

  return (
    <div>
      <p>characters</p>
      <div className="grig grid-cols-3 gap-5">
        {characters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt="" />
            <p>
              {character.name}, {character.status}, {character.species},{" "}
              {character.species}, {character.gender}, {character.url}{" "}
              {character.created}
            </p>
            {/* {character.episode.map((episode) => (
              <p key={episode} className="w-full">
                {episode}
              </p>
            ))} */}
          </div>
          //  {item.origin}, {item.location},
        ))}
      </div>
    </div>
  );
}
