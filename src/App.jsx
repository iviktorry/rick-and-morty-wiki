import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <div className="font-custom flex min-h-lvh flex-col bg-orange-100 tracking-wider">
      <Header />
      <Main />
    </div>
  );
}
