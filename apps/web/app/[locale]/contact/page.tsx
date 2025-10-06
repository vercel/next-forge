import { getDictionary } from "@repo/internationalization";
import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import { ContactForm } from "./components/contact-form";

type ContactProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: ContactProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata(dictionary.web.contact.meta);
};

const Contact = async ({ params }: ContactProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return <ContactForm dictionary={dictionary} />;
};

export default Contact;
