import { useEffect, useState } from "react";
import Pages from "../components/Pages";

export default function Characters({ filterText }) {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`server mistake: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        setCharacters(res.results);
        setPages(res.info.pages);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`Uploading error: ${error}`);
        }
      });
    return () => controller.abort();
  }, [currentPage]);

  const filteredArray = characters.filter((character) =>
    character.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <section className="flex flex-col gap-6">
      <div className="grid w-fit grid-cols-1 gap-5 self-center lg:self-end sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredArray.map((character) => (
          <div
            key={character.id}
            className="aspect-3/4.5 max-w-75 justify-self-center overflow-hidden rounded-lg ring-2 ring-neutral-800 transition-all duration-200 ease-linear hover:scale-101"
          >
            <div className="relative w-full overflow-hidden">
              <img
                src={character.image}
                alt={`${character}'s portrait image`}
                className="size-full border-b-2 border-neutral-800 object-cover"
              />

              <span
                className={`absolute top-2 left-2 max-w-[48%] rounded-xl px-2 leading-tight text-neutral-100 ring-2 ring-neutral-800 ${character.status === "Alive" ? "bg-lime-600" : character.status === "Dead" ? "bg-orange-700" : "bg-neutral-600"} `}
              >
                {character.status}
              </span>
              <span
                className={`absolute top-2 right-2 max-w-[48%] rounded-xl px-2 leading-tight text-neutral-100 ring-2 ring-neutral-800 ${character.species === "Human" ? "bg-cyan-700" : character.species === "Alien" ? "bg-lime-600" : "bg-orange-700"}`}
              >
                {character.species}
              </span>
            </div>
            <div className="flex flex-col items-center px-2 pb-1 text-center">
              <p
                className="text flex items-center gap-1"
                title={character.name}
              >
                <span className="line-clamp-1 text-xl font-medium">
                  {character.name}
                </span>
                -<span>{character.gender}</span>
              </p>
              <div>
                <span className="text-xs text-neutral-600">Is from</span>
                <span className="line-clamp-1" title={character.origin.name}>
                  {character.origin.name}
                </span>
                <span className="text-xs text-neutral-600">
                  Last known location
                </span>
                <span className="line-clamp-1" title={character.location.name}>
                  {character.location.name}
                </span>
              </div>
            </div>
            {/* <span>{character.created}</span> */}
            {/* {item.origin}, {item.location}, {character.url} */}
          </div>
        ))}
      </div>
      <Pages
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
