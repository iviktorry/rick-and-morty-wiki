import { NavLink } from "react-router-dom";

export default function Header() {
  function navLinkStyles({ isActive }) {
    return `transition-all duration-300 ease-linear md:hover:font-bold ${isActive ? "font-bold text-lg" : ""} `;
  }
  return (
    <header className="flex flex-col items-center justify-between pt-2 sm:flex-row">
      <h1>
        <NavLink to="/" className={navLinkStyles}>
          Rick and Morty Wiki
        </NavLink>
      </h1>
      <nav>
        <ul className="flex flex-row items-center justify-between gap-4 sm:w-xs">
          <li>
            <NavLink to="/character" className={navLinkStyles}>
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/location" className={navLinkStyles}>
              Location
            </NavLink>
          </li>
          <li>
            <NavLink to="/episode" className={navLinkStyles}>
              Episodes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
