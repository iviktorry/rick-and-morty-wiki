import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    document.title = "Rick and Morty Wiki";
  });

  const categories = [
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
    <section className="flex flex-1 flex-col justify-center gap-6 text-center lg:text-lg">
      <h2 className="text-2xl font-medium md:text-3xl">
        Welcome to the Rick and Morty Wiki!
      </h2>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-10">
        {categories.map((cat) => (
          <Link
            to={cat.path}
            key={cat.title}
            className="relative overflow-hidden rounded-xl text-white transition-all duration-300 ease-linear md:hover:scale-103 lg:rounded-2xl"
          >
            <p className="absolute inset-x-0 top-4 z-10 px-2 text-center">
              {cat.desc}
            </p>

            <div className="h-40 bg-black/20 md:h-60">
              <img
                src={cat.image}
                alt=""
                className="aspect-video size-full object-cover brightness-40"
              />
            </div>

            <h3 className="absolute inset-x-0 bottom-5 text-center text-xl lg:text-2xl">
              {cat.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
