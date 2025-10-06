import type { Thing, WithContext } from "schema-dts";

type JsonLdProps = {
  code: WithContext<Thing>;
};

export const JsonLd = ({ code }: JsonLdProps) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
    // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a JSON-LD script, not user-generated content."
    type="application/ld+json"
  />
);

export * from "schema-dts";
