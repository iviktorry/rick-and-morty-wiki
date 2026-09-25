import { useEffect, useState } from "react";
import Pages from "../components/Pages";
import Character from "../components/Character";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import FilterOption from "../components/FilterOption";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = formData.get("search");
    setSearchText(search);
  }

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

  const filteredCharacters = characters.filter((character) => {
    const matchesSpecies =
      species !== "" ? character.species === species : character;
    const matchesGender =
      gender !== "" ? character.gender === gender : character;
    const matchesStatus =
      status !== "" ? character.status === status : character;

    const matcherSearch =
      searchText !== ""
        ? character.name.toLowerCase().includes(searchText.toLowerCase())
        : character;

    return matchesSpecies && matcherSearch && matchesGender && matchesStatus;
  });

  return (
    <section className="flex min-h-full flex-1 flex-col gap-2 md:gap-4">
      <Filters>
        <FilterOption
          label="Status"
          options={["Alive", "Dead", "unknown"]}
          handleChange={setStatus}
        />
        <FilterOption
          label="Gender"
          options={["Male", "Female", "Genderless", "unknown"]}
          handleChange={setGender}
        />
        <FilterOption
          label="Species"
          options={[
            "Human",
            "Alien",
            "Humanoid",
            "Poopybutthole",
            "Mythological Creature",
          ]}
          handleChange={setSpecies}
        />
      </Filters>
      <SearchBar handleSearch={handleSearch} />

      <div
        className={`${filteredCharacters.length ? "grid w-fit grid-cols-1 gap-5 self-center sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "flex-1"}`}
      >
        {filteredCharacters.length ? (
          filteredCharacters.map((character) => (
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
          ))
        ) : (
          <p className="text-center">
            Sorry, nothing was found on your search.
          </p>
        )}
      </div>
      <Pages
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
