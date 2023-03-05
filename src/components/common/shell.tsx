import Footer from "./Footer";
import Header from "./header";

const Shell: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Shell;
