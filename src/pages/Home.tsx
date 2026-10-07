import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { JSX } from "react";

type Category = {
  title: string;
  desc: string;
  path: string;
  image: string;
};

export default function Home(): JSX.Element {
  useEffect(() => {
    document.title = "Rick and Morty Wiki";
  }, []);

  const categories: Category[] = [
    {
      title: "Characters",
      desc: "Meet 800+ dimension wanderers, aliens and clones",
      path: "/characters",
      image: "/images/characters.jpg",
    },
    {
      title: "Locations",
      desc: "Explore planets, space stations and microverses",
      path: "/locations",
      image: "/images/locations.webp",
    },
    {
      title: "Episodes",
      desc: "Check all seasons, release dates and episode codes",
      path: "/episodes",
      image: "/images/episodes.webp",
    },
  ];
  return (
    <section className="flex flex-1 flex-col justify-center gap-2 md:gap-6 text-center lg:text-lg">
      <h1 className="text-xl font-bold md:text-2xl">
        Welcome to the Rick and Morty Wiki!
      </h1>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-10">
        {categories.map((cat: Category): JSX.Element => (
          <Link
            to={cat.path}
            key={cat.title}
            className="relative overflow-hidden rounded-xl text-white transition-all duration-300 ease-linear focus-visible:scale-105 md:hover:scale-105 lg:rounded-2xl"
          >
            <p className="absolute inset-x-0 top-4 z-10 px-2 text-center">
              {cat.desc}
            </p>

            <div className="h-40 bg-black/20 md:h-60">
              <img
                src={cat.image}
                alt=""
                fetchPriority="high"
                className="aspect-video size-full object-cover brightness-50"
              />
            </div>

            <h2 className="absolute inset-x-0 bottom-5 text-center text-xl lg:text-2xl">
              {cat.title}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
