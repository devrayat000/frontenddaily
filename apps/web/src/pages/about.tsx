import { RichText } from "@graphcms/rich-text-react-renderer";
import {
  Container,
  Group,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import Image from "next/future/image";

import me from "~/assets/me.png";
import about from "~/components/common/about.json";

const AboutPage = () => {
  return (
    <Container size="md">
      <Group spacing="xs" noWrap>
        <figure>
          <Image
            {...me}
            alt="Zul Ikram Musaddik Rayat"
            loading="lazy"
            style={{ zoom: "50%" }}
          />
        </figure>

        <section>
          <Title order={2} size="h1">
            About Frontend Daily
          </Title>

          <TypographyStylesProvider>
            <RichText content={about.content.raw as any} />
          </TypographyStylesProvider>
        </section>
      </Group>
    </Container>
  );
};

export default AboutPage;
