import type { JSX } from "react";

export type CharacterProps = {
  id: number;
  index: number;
  image: string;
  status: string;
  gender: string;
  name: string;
  species: string;
  origin: string;
  location: string;
};

export default function Character({
  id,
  image,
  index,
  status,
  gender,
  name,
  species,
  origin,
  location,
}: CharacterProps): JSX.Element {
  return (
    <article className="aspect-3/5 w-75 justify-self-center overflow-hidden rounded-lg ring-2 ring-neutral-800 transition-all duration-200 ease-linear hover:scale-101">
      <div className="relative aspect-square size-75 border-b-2 border-neutral-800">
        <img
          src={image}
          alt={`${name}'s portrait image`}
          loading={index < 4 ? "eager" : "lazy"}
          fetchPriority={index === 1 ? "high" : "auto"}
          className="size-full object-cover"
        />

        <span
          className={`absolute top-2 left-2 max-w-[48%] rounded-lg px-2 leading-tight text-neutral-100 ring-2 ring-neutral-800 ${status === "Alive" ? "bg-lime-600" : status === "Dead" ? "bg-orange-700" : "bg-neutral-600"} `}
        >
          {status}
        </span>
        <span
          className={`absolute top-2 right-2 max-w-[48%] rounded-lg px-2 leading-tight text-neutral-100 ring-2 ring-neutral-800 ${gender === "Male" ? "bg-blue-600" : gender === "Female" ? "bg-orange-700" : "bg-neutral-600"}`}
        >
          {gender}
        </span>
        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-600 px-2 leading-tight text-neutral-100 ring-2 ring-neutral-800">
          {id}
        </span>
      </div>
      <div className="flex flex-col items-center px-2 pt-4 pb-1 text-center">
        <h3 className="line-clamp-2 text-xl font-bold" title={name}>
          {name}
        </h3>
        <span>{species}</span>
        <span className="pt-2 text-xs text-neutral-700">Originated</span>
        <span className="line-clamp-1" title={origin}>
          {origin}
        </span>
        <span className="pt-2 text-xs text-neutral-700">
          Last known location
        </span>
        <span className="line-clamp-1" title={location}>
          {location}
        </span>
      </div>
    </article>
  );
}
