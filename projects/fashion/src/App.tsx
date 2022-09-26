import { ReactComponent as Logo } from "./assets/logo.svg";
import clsx from "clsx";

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
    </main>
  );
}

export default App;
