import { useEffect, useState } from "react";

export default function Characters({ filterText }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((res) => res.json())
      .then((res) => setCharacters(res.results));
  }, []);

  const filteredArray = characters.filter((character) =>
    character.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <section className="grid w-fit grid-cols-1 gap-5 self-end sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {filteredArray.map((character) => (
        <div
          key={character.id}
          className="aspect-3/5 max-w-75 justify-self-center overflow-hidden rounded-lg ring-2 ring-neutral-800 transition-all duration-300 ease-linear hover:scale-101"
        >
          <div className="relative w-full overflow-hidden">
            <img
              src={character.image}
              alt={`${character}'s portrait image`}
              className="size-full border-b-2 border-neutral-800 object-cover"
            />

            <span
              className={`absolute top-2 left-2 rounded-xl px-2 text-neutral-100 ring-2 ring-neutral-800 ${character.status === "Alive" ? "bg-lime-600" : character.status === "Dead" ? "bg-orange-700" : "bg-neutral-600"} `}
            >
              {character.status}
            </span>
            <span
              className={`absolute top-2 right-2 rounded-xl px-2 text-neutral-100 ring-2 ring-neutral-800 ${character.species === "Human" ? "bg-cyan-700" : character.species === "Alien" ? "bg-lime-600" : "bg-orange-700"}`}
            >
              {character.species}
            </span>
          </div>

          <div className="flex flex-col items-center px-2 py-1 text-center">
            <p className="text flex items-center gap-1 pb-2">
              <span className="text-xl font-medium">{character.name}</span>-
              <span>{character.gender}</span>
            </p>
            <span className="text-xs text-neutral-600">Is from</span>
            <span className="pb-2">{character.origin.name}</span>
            <span className="text-xs text-neutral-600">
              Last known location
            </span>
            <span>{character.location.name}</span>
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
    </section>
  );
}
