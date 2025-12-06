import Link from "next/link";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Installer } from "./installer";

const NextLogo = (props: ComponentProps<"svg">) => (
  <svg
    viewBox=".5 -.2 1023 1024.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Next.js</title>
    <path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z" />
    <path d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z" />
  </svg>
);

const TurborepoLogo = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <title>Turborepo</title>
    <linearGradient
      gradientUnits="userSpaceOnUse"
      id="a"
      x1="19.672"
      x2="1.96713"
      y1="2.5292"
      y2="20.234"
    >
      <stop offset="0" stopColor="#0096ff" />
      <stop offset="1" stopColor="#ff1e56" />
    </linearGradient>
    <path
      d="m17.9856 6.28879c-6.4499 0-11.69727 5.24741-11.69727 11.69721s5.24737 11.6972 11.69727 11.6972c6.4498 0 11.6972-5.2474 11.6972-11.6972s-5.2474-11.69721-11.6972-11.69721zm0 17.75061c-3.3437 0-6.0534-2.7098-6.0534-6.0534s2.7097-6.0534 6.0534-6.0534c3.3436 0 6.0533 2.7098 6.0533 6.0534s-2.7097 6.0534-6.0533 6.0534z"
      fill="currentColor"
    />
    <path
      clipRule="evenodd"
      d="m18.9661 4.3674v-4.3674c9.4928.507533 17.0339 8.36667 17.0339 17.9858 0 9.6192-7.5411 17.4762-17.0339 17.9859v-4.3674c7.0749-.5054 12.6774-6.4172 12.6774-13.6185s-5.6025-13.11305-12.6774-13.6184zm-11.29647 22.5493c-1.87548-2.1652-3.08441-4.9229-3.30005-7.9506h-4.36958c.226538 4.2367 1.92122 8.0813 4.57651 11.0415l3.09094-3.0909zm9.33607 9.055v-4.3674c-3.0299-.2157-5.7876-1.4224-7.9528-3.3001l-3.09094 3.091c2.96243 2.6574 6.80704 4.3499 11.04154 4.5765z"
      fill="url(#a)"
      fillRule="evenodd"
    />
  </svg>
);

export const Hero = () => (
  <section className="flex flex-col items-center justify-center gap-6 px-4 py-16 sm:px-16 sm:py-24">
    <h1 className="max-w-3xl text-balance text-center font-semibold text-4xl leading-tight tracking-tighter! sm:text-5xl md:max-w-4xl md:text-6xl lg:leading-[1.1]">
      Production-grade{" "}
      <TurborepoLogo className="pointer-events-none mx-1.5 inline-block h-8 w-auto translate-y-0.5 select-none align-baseline sm:h-[38px] md:h-[48px] md:translate-y-1" />
      Turborepo template for{" "}
      <NextLogo className="pointer-events-none mx-1.5 inline-block h-8 w-auto translate-y-0.5 select-none align-baseline sm:h-[38px] md:h-[48px] md:translate-y-1 dark:invert" />
      Next.js apps
    </h1>
    <p className="max-w-xl text-balance text-center text-muted-foreground md:max-w-2xl md:text-lg">
      A monorepo template designed to have everything you need to build your new
      SaaS app as thoroughly as possible. Free and open source, forever.
    </p>
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 sm:flex-row">
      <Installer />
      <Button asChild size="lg">
        <Link href="/docs">Read the docs</Link>
      </Button>
    </div>
  </section>
);
