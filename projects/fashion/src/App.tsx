import clsx from "clsx";

import { ReactComponent as BlobIcon } from "./assets/blob.svg";
import heroImage from "./assets/hero-image.png";
import { ReactComponent as Logo } from "./assets/logo.svg";

const links = [
  {
    label: "Catalogue",
    href: "#",
  },
  {
    label: "Fashion",
    href: "#",
  },
  {
    label: "Favourite",
    href: "#",
  },
  {
    label: "Lifestyle",
    href: "#",
  },
  {
    label: "Sign Up",
    href: "#",
    props: {
      className: "bg-black !text-white",
    },
  },
];

function App() {
  return (
    <main>
      <header className="flex justify-between px-20 py-8">
        <div className="flex items-center justify-betweenr gap-2">
          <Logo height={28} width="auto" />
          <h4 className="uppercase text-3xl font-black m-0">Fashion</h4>
        </div>
        <div className="flex gap-4 items-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...link.props}
              className={clsx(
                "text-black py-2 px-4 uppercase rounded-md no-underline",
                link.props?.className
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section
        id="hero"
        className="mx-16 my-8 rounded-3xl bg-hero bg-cover p-20 flex justify-between relative"
      >
        <section>
          <h1 className="uppercase text-6xl font-black leading-snug break-words max-w-title relative isolate">
            <span className="absolute top-0 -left-6 w-full h-mark bg-white -z-10 -rotate-2" />
            <span className="absolute top-1/2 -left-6 w-full h-mark bg-primary -z-10 -rotate-2" />
            LET’S EXPLORE UNIQUE CLOTHES.
          </h1>

          <p className="tracking-tight text-xl mb-0 mt-6">
            Live for Influential and Innovative fashion!
          </p>

          <section className="flex items-center gap-4 mt-10">
            <BlobIcon className="fill-primary" />
            <button
              type="button"
              className="text-white font-medium bg-black px-5 py-3 rounded-md"
            >
              Shop Now
            </button>
          </section>
        </section>

        <img
          src={heroImage}
          alt="Hero"
          className="absolute bottom-0 right-2 h-5/6 my-0"
        />
      </section>
    </main>
  );
}

export default App;
