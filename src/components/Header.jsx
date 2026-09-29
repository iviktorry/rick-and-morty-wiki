import { NavLink } from "react-router-dom";

export default function Header() {
  function navLinkStyles({ isActive }) {
    return `transition-all duration-300 ease-linear md:hover:[text-shadow:_0.5px_0_0_currentColor,_-0.5px_0_0_currentColor] ${isActive ? "[text-shadow:_0.5px_0_0_currentColor,_-0.5px_0_0_currentColor] text-lg" : ""} `;
  }
  return (
    <header className="flex flex-col items-center justify-between gap-2 pt-2 sm:h-9 sm:flex-row sm:gap-0">
      <h1>
        <NavLink end to="/" className={navLinkStyles}>
          Rick and Morty Wiki
        </NavLink>
      </h1>
      <nav>
        <ul className="flex flex-row items-center justify-between gap-4 sm:w-xs">
          <li>
            <NavLink to="/characters" className={navLinkStyles}>
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink to="/locations" className={navLinkStyles}>
              Location
            </NavLink>
          </li>
          <li>
            <NavLink to="/episodes" className={navLinkStyles}>
              Episodes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
