import { ActionIcon, Group, useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
// import {useCycle} from 'framer-motion'
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons";

import BrowserMockup from "../components/mockups/browser";
import PhoneMockup from "../components/mockups/phone";
import TabletMockup from "../components/mockups/tablet";
import useCycle from "../hooks/use-cycle";

const enum Device {
  LAPTOP,
  TABLET,
  MOBILE,
}

const devices = [
  { id: Device.LAPTOP, icon: IconDeviceLaptop },
  { id: Device.TABLET, icon: IconDeviceTablet },
  { id: Device.MOBILE, icon: IconDeviceMobile },
];

export default function Web() {
  const theme = useMantineTheme();
  const { width: x } = useViewportSize();

  const isMobile = x > 0 && x <= theme.breakpoints.sm;
  const isTablet = x > theme.breakpoints.sm && x <= theme.breakpoints.md;

  const [device, cycleDevice] = useCycle(
    devices.map((d) => d.id),
    () => (isMobile ? Device.MOBILE : isTablet ? Device.TABLET : Device.LAPTOP)
  );

  const frame = <iframe src="http://127.0.0.1:5173/" />;

  return (
    <div>
      <Group position="center" spacing="xl" mb="lg">
        {devices.map((d) => (
          <ActionIcon
            key={d.id}
            onClick={() => cycleDevice(d.id)}
            variant={d.id === device ? "filled" : "subtle"}
          >
            <d.icon />
          </ActionIcon>
        ))}
      </Group>

      {device === Device.MOBILE && <PhoneMockup>{frame}</PhoneMockup>}
      {device === Device.TABLET && <TabletMockup>{frame}</TabletMockup>}
      {device === Device.LAPTOP && <BrowserMockup>{frame}</BrowserMockup>}
    </div>
  );
}
