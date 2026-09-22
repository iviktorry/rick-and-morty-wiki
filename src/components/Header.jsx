import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex gap-4">
      <h1>
        <Link to="/">Rick & Morty Wiki</Link>
      </h1>
      <nav>
        <ul className="flex gap-2">
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/episodes">Episodes</Link>
          </li>
          <li>
            <Link to="/locations">Location</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
