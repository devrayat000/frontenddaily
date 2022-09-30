import {
  Button,
  Container,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

export default function GetInTouchSimple() {
  //   const form = useForm({
  //     initialValues: {
  //       name: '',
  //       email: '',
  //       subject: '',
  //       message: '',
  //     },
  //     validate: {
  //       name: (value) => value.trim().length < 2,
  //       email: (value) => !/^\S+@\S+$/.test(value),
  //       subject: (value) => value.trim().length === 0,
  //     },
  //   });

  return (
    <Container
      size="xs"

      //   onSubmit={form.onSubmit(() => { })}
    >
      {/* @ts-ignore */}
      <form netlify>
        <article>
          <Title order={2} size="h1" weight={900} align="center">
            Get in touch
          </Title>

          <Text align="center" mt="md" component="p" color="dimmed">
            Feel free to get in touch with me with anything related to
            FrontendDaily or you can just say hi 👋 I will get back to you as
            soon as I can.
          </Text>
        </article>

        <SimpleGrid
          cols={2}
          mt="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
          />
          <TextInput
            type="email"
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            required
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          required
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          required
        />

        <Group position="center" mt="xl">
          <Button
            type="submit"
            size="md"
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            Send message
          </Button>
        </Group>
      </form>
    </Container>
  );
}
