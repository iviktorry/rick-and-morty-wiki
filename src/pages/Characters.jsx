import { useEffect, useState } from "react";

export default function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((res) => res.json())
      .then((res) => setCharacters(res.results));
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {characters.map((character) => (
          <div
            key={character.id}
            className="aspect-3/4 justify-self-center overflow-hidden rounded-lg ring"
          >
            <div className="relative w-full overflow-hidden">
              <img
                src={character.image}
                alt={`${character}'s portrait image`}
                className="size-full object-cover"
              />

              <span
                className={`absolute top-2 left-2 rounded-xl px-2 ring-2 ring-neutral-100 ${character.status === "Alive" ? "bg-lime-500" : character.status === "Dead" ? "bg-red-600" : "bg-blue-400"} `}
              >
                {character.status}
              </span>
              <span
                className={`absolute top-2 right-2 rounded-xl px-2 ring-2 ring-neutral-100 ${character.species === "Human" ? "bg-blue-400" : character.species === "Alien" ? "bg-lime-500" : "bg-red-600"}`}
              >
                {character.species}
              </span>
            </div>

            <div className="flex flex-col p-2 text-center">
              <span>{character.name}</span>
              <span>{character.gender}</span>
            </div>
            {/* <span>{character.created}</span> */}
            {/* {character.episode.map((episode) => (
              <p key={episode} className="w-full">
                {episode}
              </p>
            ))} */}
          </div>
          //  {item.origin}, {item.location},  {character.url}
        ))}
      </div>
    </section>
  );
}
