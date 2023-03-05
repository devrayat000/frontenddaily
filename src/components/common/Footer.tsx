import { FooterLinks } from "./links";
import MediaQuery from "./MediaQuery";
import { CONTAINER_STYLES } from "./styles";

const Footer = () => {
  return (
    <footer className="h-20 sticky bottom-0 w-full shadow-lg shadow-slate-900/10 z-50 bg-white border-t border-slate-200">
      <section className={CONTAINER_STYLES}>
        <MediaQuery className="hidden sm:flex">
          <FooterLinks />
        </MediaQuery>

        <p className="my-0">©FrontendDaily 2022</p>
      </section>
    </footer>
  );
};

export default Footer;
