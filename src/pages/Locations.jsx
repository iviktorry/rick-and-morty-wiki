import { useEffect, useState } from "react";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location`)
      .then((res) => res.json())
      .then((res) => setLocations(res.results));
  }, []);
  return (
    <div>
      <p>locations</p>
      {locations.map((location) => (
        <div key={location.id}>
          <p>
            {location.name}, {location.type}, {location.dimension},{" "}
            {location.url}, {location.created}
          </p>
          {location.residents.map((resident) => (
            <p key={resident}>{resident}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
