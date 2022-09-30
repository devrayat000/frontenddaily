import {
  ActionIcon,
  Button,
  Container,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
// import {useCycle} from 'framer-motion'
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconExternalLink,
} from "@tabler/icons";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";

import projects from "~/components/home/Projects/data-full.json";
import BrowserMockup from "~/components/mockups/browser";
import PhoneMockup from "~/components/mockups/phone";
import TabletMockup from "~/components/mockups/tablet";
import useCycle from "~/hooks/use-cycle";

const enum Device {
  LAPTOP = "Desktop",
  TABLET = "Tablet",
  MOBILE = "Mobile",
}

const devices = [
  { id: Device.LAPTOP, icon: IconDeviceLaptop },
  { id: Device.TABLET, icon: IconDeviceTablet },
  { id: Device.MOBILE, icon: IconDeviceMobile },
];

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PreviewPage: NextPage<Props> = ({ project }) => {
  const theme = useMantineTheme();
  const { width: x } = useViewportSize();

  const isMobile = x > 0 && x <= theme.breakpoints.sm;
  const isTablet = x > theme.breakpoints.sm && x <= theme.breakpoints.md;

  const [device, cycleDevice] = useCycle(
    devices.map((d) => d.id),
    () => (isMobile ? Device.MOBILE : isTablet ? Device.TABLET : Device.LAPTOP)
  );

  const frame = <iframe src={project.preview} loading="lazy" />;

  return (
    <Container fluid>
      <Head>
        <link
          rel="preload"
          href={project.preview}
          as="document"
          type="text/html"
        />
      </Head>
      <Group position="center" mb="lg">
        <Group position="center" spacing="xl">
          {devices.map((d) => (
            <ActionIcon
              key={d.id}
              onClick={() => cycleDevice(d.id)}
              variant={d.id === device ? "outline" : "subtle"}
              color="gray"
              radius="xl"
              size="lg"
              title={d.id}
            >
              <d.icon />
            </ActionIcon>
          ))}
        </Group>

        <Group align="center">
          <Text component="em">or</Text>
          <Button
            variant="outline"
            color="gray"
            rightIcon={<IconExternalLink />}
            component="a"
            href={project.preview}
            rel="noreferrer"
            target="_blank"
          >
            Live
          </Button>
        </Group>
      </Group>

      {device === Device.MOBILE && <PhoneMockup>{frame}</PhoneMockup>}
      {device === Device.TABLET && <TabletMockup>{frame}</TabletMockup>}
      {device === Device.LAPTOP && (
        <BrowserMockup url={project.preview}>{frame}</BrowserMockup>
      )}
    </Container>
  );
};

export default PreviewPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.params?.slug as string;

  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
  );
  return {
    props: {
      project: projects.find((p) => p.slug === slug)!,
      slug,
    },
  };
};
