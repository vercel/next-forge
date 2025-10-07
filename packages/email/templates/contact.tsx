import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ContactTemplateProps = {
  readonly name: string;
  readonly email: string;
  readonly message: string;
};

export const ContactTemplate = ({
  name,
  email,
  message,
}: ContactTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>New email from {name}</Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Section className="mt-8 rounded-md bg-zinc-200 p-px">
            <Section className="rounded-[5px] bg-white p-8">
              <Text className="mt-0 mb-4 font-semibold text-2xl text-zinc-950">
                New email from {name}
              </Text>
              <Text className="m-0 text-zinc-500">
                {name} ({email}) has sent you a message:
              </Text>
              <Hr className="my-4" />
              <Text className="m-0 text-zinc-500">{message}</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

ContactTemplate.PreviewProps = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  message: "I'm interested in your services.",
};

export default ContactTemplate;
