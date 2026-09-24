import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import Character from "../components/Character";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

export default function Characters({ filterText, handleSearch }) {
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
    <section className="flex flex-col gap-2 md:gap-4">
      <Filters />
      <SearchBar handleSearch={handleSearch} />

      <div className="grid w-fit grid-cols-1 gap-5 self-center sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredArray.map((character) => (
          <Character
            key={character.id}
            id={character.id}
            image={character.image}
            character={character}
            status={character.status}
            gender={character.gender}
            name={character.name}
            species={character.species}
          />
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
