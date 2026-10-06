import { Link } from "react-router-dom";
import portalGif from "../assets/portal-gif.gif";
import portalImg from "../assets/portal.png";
import { useEffect } from "react";
import type { JSX } from "react";

export default function PageNotFound(): JSX.Element {
  useEffect(() => {
    document.title = "Page not found | Wiki";
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center sm:max-w-xl md:text-lg">
      <h1 className="text-2xl font-medium">Page not found</h1>
      <p>
        It looks like you jumped into the wrong portal, mortal. This page does
        not exist in any of the known dimensions of the Multiverse.
      </p>
      <picture className="flex size-73 overflow-hidden sm:size-100">
        <source srcSet={portalImg} media="(prefers-reduced-motion: reduce)" />
        <img src={portalGif} alt="green portal" className="sm:object-none" />
      </picture>
      <Link
        to="/"
        className="transition-all duration-300 ease-linear hover:[text-shadow:0.5px_0_0_currentColor,-0.5px_0_0_currentColor] focus-visible:[text-shadow:0.5px_0_0_currentColor,-0.5px_0_0_currentColor]"
      >
        Return to Dimension C-137
      </Link>
    </section>
  );
}
