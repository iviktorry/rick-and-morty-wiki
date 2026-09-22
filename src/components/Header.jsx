export default function Header() {
  return (
    <header className="flex gap-4">
      <h1>Rick & Morty Wiki</h1>
      <nav>
        <ul className="flex gap-2">
          <li>Characters</li>
          <li>Episodes</li>
          <li>Location</li>
        </ul>
      </nav>
    </header>
  );
}
