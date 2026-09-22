import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between">
      <h1>
        <Link to="/">Rick & Morty Wiki</Link>
      </h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/character">Characters</Link>
          </li>
          <li>
            <Link to="/episode">Episodes</Link>
          </li>
          <li>
            <Link to="/location">Location</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
