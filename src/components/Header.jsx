import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  function navLinkStyles({ isActive }) {
    return `transition-all duration-300 ease-linear md:hover:font-bold ${isActive ? "font-bold text-lg" : ""} `;
  }
  return (
    <header className="flex flex-col items-center justify-between px-4 sm:flex-row">
      <h1>
        <Link to="/">
          <img
            src={logo}
            alt="rick and morty logo image"
            className="max-w-55"
          />
        </Link>
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
