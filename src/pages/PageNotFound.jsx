import { Link } from "react-router-dom";
import portalGif from "../assets/images/portal-gif.gif";

export default function PageNotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center sm:max-w-xl md:text-lg">
      <p>
        It looks like you jumped into the wrong portal, mortal. This page does
        not exist in any of the known dimensions of the Multiverse.
      </p>
      <div className="size-73 overflow-hidden sm:size-100">
        <img
          src={portalGif}
          alt="green portal gif"
          className="sm:object-none"
        />
      </div>
      <Link
        to="/"
        className="transition-all duration-300 ease-linear md:hover:font-bold"
      >
        Return to Dimension C-137
      </Link>
    </section>
  );
}
