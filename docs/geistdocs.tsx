export const Logo = () => (
  <p className="font-semibold text-xl tracking-tight">next-forge</p>
);

export const github = {
  owner: "vercel",
  repo: "next-forge",
};

export const nav = [
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Source",
    href: `https://github.com/${github.owner}/${github.repo}/`,
  },
];

export const suggestions = [
  "What is next-forge?",
  "What can I build with next-forge?",
  "How do packages and apps work?",
  "What is a monorepo?",
];

export const title = "next-forge Documentation";

export const prompt =
  "You are a helpful assistant specializing in answering questions about next-forge, a production-grade Turborepo template for Next.js apps";

export const translations = {
  en: {
    displayName: "English",
  },
};

export const basePath: string | undefined = undefined;

/**
 * Unique identifier for this site, used in markdown request tracking analytics.
 * Each site using geistdocs should set this to a unique value (e.g. "ai-sdk-docs", "next-docs").
 */
export const siteId: string | undefined = "next-forge";
