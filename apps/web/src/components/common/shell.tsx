import { AppShell } from "@mantine/core";

import Header from "./header";

const Shell: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AppShell fixed header={<Header />}>
      {children}
    </AppShell>
  );
};

export default Shell;
