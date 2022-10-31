import { useForm, ValidationError } from "@formspree/react";
import {
  Button,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

export default function GetInTouchSimple() {
  const [state, handleSubmit, reset] = useForm(process.env.NEXT_PUBLIC_FORM!);

  if (state.succeeded) {
    return (
      <Container size="xs">
        <Stack align="center">
          <Text>
            Thanks for contanting. We will get back to you as soon as
            possible.👌
          </Text>
          <Button onClick={reset}>Go Back</Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="xs">
      {/* @ts-ignore */}
      <form name="contact" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
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
            error={
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />
            }
          />
          <TextInput
            type="email"
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            required
            error={
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            }
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          required
          error={
            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
            />
          }
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          minRows={5}
          maxRows={10}
          autosize
          name="message"
          variant="filled"
          required
          error={
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          }
        />

        <Group position="center" mt="xl">
          <Button
            type="submit"
            size="md"
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            disabled={state.submitting}
          >
            Send message
          </Button>
        </Group>
        <ValidationError errors={state.errors} />
      </form>
    </Container>
  );
}
