import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

const Vercel = () => (
  <svg
    className="-translate-y-[0.5px] h-[18px] w-[18px] fill-current"
    fill="none"
    height="22"
    viewBox="0 0 235 203"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Vercel</title>
    <path d="M117.082 0L234.164 202.794H0L117.082 0Z" fill="currentColor" />
  </svg>
);

const Slash = () => (
  <svg
    className="size-4 text-[#00000014]"
    height={16}
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width={16}
  >
    <title>Slash</title>
    <path
      clipRule="evenodd"
      d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
      fill="var(--color-border)"
      fillRule="evenodd"
    />
  </svg>
);

export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/vercel/next-forge",
  links: [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Docs",
      url: "/docs",
    },
  ],
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <Vercel />
        <Slash />
        <p className="font-semibold text-lg tracking-tight">next-forge</p>
      </div>
    ),
  },
};
