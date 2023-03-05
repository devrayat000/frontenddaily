import Logo from "../icons/Logo";
import { HeaderLinks } from "./links";
import MediaQuery from "./MediaQuery";
import MenuButton from "./MenuButton";
import { CONTAINER_STYLES } from "./styles";

const Header = () => {
  return (
    <header className="sticky top-0 h-20 w-full bg-white z-50 shadow-lg shadow-slate-900/10">
      <section className={CONTAINER_STYLES}>
        <span className="text-slate-900 font-semibold text-lg flex items-center gap-3">
          <Logo height={36} /> Frontend Daily
        </span>

        <MediaQuery className="hidden sm:flex">
          <HeaderLinks />
        </MediaQuery>
        <MenuButton />
      </section>
    </header>
  );
};

export default Header;
