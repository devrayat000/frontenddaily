import { AppShell } from "@mantine/core";

import Footer from "./Footer";
import Header from "./header";

const Shell: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AppShell fixed header={<Header />} footer={<Footer />}>
      {children}
    </AppShell>
  );
};

export default Shell;
