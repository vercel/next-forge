import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";

const docsRoot = path.resolve(
  import.meta.dirname,
  "../../../docs/content/docs"
);

const clerkWebhookDocs = [
  "packages/authentication.mdx",
  "packages/webhooks/inbound.mdx",
].map((relativePath) => ({
  relativePath,
  source: readFileSync(path.join(docsRoot, relativePath), "utf8"),
}));

test("Clerk local webhook docs do not prepend https:// to the ngrok forwarding URL", () => {
  for (const { relativePath, source } of clerkWebhookDocs) {
    expect(source, relativePath).not.toContain("https://<YOUR_FORWARDING_URL>");
    expect(source, relativePath).toContain(
      "<YOUR_FORWARDING_URL>/webhooks/auth"
    );
    expect(source, relativePath).toContain(
      "https://fawn-two-nominally.ngrok-free.app/webhooks/auth"
    );
  }
});

test("inbound Clerk webhook docs keep the ngrok tunnel command", () => {
  const inbound = clerkWebhookDocs.find((doc) =>
    doc.relativePath.endsWith("inbound.mdx")
  );

  expect(inbound?.source).toContain(
    "ngrok http --url=<YOUR_FORWARDING_URL> 3002"
  );
});
