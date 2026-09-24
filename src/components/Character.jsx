export default function Character({
  id,
  image,
  status,
  gender,
  name,
  species,
  character,
}) {
  return (
    <div className="aspect-3/5 max-w-75 justify-self-center overflow-hidden rounded-lg ring-2 ring-neutral-800 transition-all duration-200 ease-linear hover:scale-101">
      <div className="relative w-full">
        <img
          src={image}
          alt={`${character}'s portrait image`}
          className="size-full border-b-2 border-neutral-800 object-cover"
        />

        <span
          className={`absolute top-2 left-2 max-w-[48%] rounded-lg px-2 leading-tight text-neutral-100 ring-2 ring-neutral-800 ${character.status === "Alive" ? "bg-lime-600" : character.status === "Dead" ? "bg-orange-700" : "bg-neutral-600"} `}
        >
          {status}
        </span>
        <span
          className={`absolute top-2 right-2 max-w-[48%] rounded-lg px-2 leading-tight text-neutral-100 ring-2 ring-neutral-800 ${character.gender === "Male" ? "bg-blue-600" : character.gender === "Female" ? "bg-orange-700" : "bg-neutral-600"}`}
        >
          {gender}
        </span>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-600 px-2 leading-tight text-neutral-100 ring-2 ring-neutral-800">
          {id}
        </span>
      </div>
      <div className="flex flex-col items-center px-2 pt-4 pb-1 text-center">
        <span className="line-clamp-2 text-xl font-medium" title={name}>
          {name}
        </span>
        <span>{species}</span>
        <span className="pt-2 text-xs text-neutral-600">
          Last known location
        </span>
        <span className="line-clamp-1" title={character.location.name}>
          {character.location.name}
        </span>
      </div>
    </div>
  );
}
