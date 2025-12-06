import Image from "next/image";

export const VercelButton = () => {
  const url = new URL("https://vercel.com/new/clone");

  url.searchParams.set("build-command", "turbo build");
  url.searchParams.set(
    "demo-description",
    "Comprehensive Turborepo template for Next.js apps."
  );
  url.searchParams.set(
    "demo-image",
    "//images.ctfassets.net/e5382hct74si/2XyyD0ftVZoyj9fHabQB2G/8e5779630676c645214ddb3729d8ff96/opengraph-image.png"
  );
  url.searchParams.set("demo-title", "next-forge");
  url.searchParams.set("demo-url", "https://www.next-forge.com/");
  url.searchParams.set(
    "env",
    [
      "DATABASE_URL",
      "RESEND_TOKEN",
      "RESEND_FROM",
      "CLERK_WEBHOOK_SECRET",
      "STRIPE_SECRET_KEY",
      "STRIPE_WEBHOOK_SECRET",
      "BASEHUB_TOKEN",
      "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
      "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
      "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
      "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
      "NEXT_PUBLIC_POSTHOG_KEY",
      "NEXT_PUBLIC_POSTHOG_HOST",
      "NEXT_PUBLIC_APP_URL",
      "NEXT_PUBLIC_WEB_URL",
      "NEXT_PUBLIC_DOCS_URL",
    ].join(",")
  );
  url.searchParams.set(
    "envLink",
    "https://www.next-forge.com/docs/setup/prerequisites"
  );
  url.searchParams.set("from", "templates");
  url.searchParams.set("project-name", "next-forge");
  url.searchParams.set("repository-name", "next-forge");
  url.searchParams.set(
    "repository-url",
    "https://github.com/vercel/next-forge"
  );
  url.searchParams.set("root-directory", "apps/app");
  url.searchParams.set("skippable-integrations", "1");

  return (
    <a href={url.toString()}>
      <Image
        alt="Deploy with Vercel"
        height={32}
        src="https://vercel.com/button"
        unoptimized
        width={103}
      />
    </a>
  );
};
