import Image from "next/image";
import { cn } from "@/lib/utils";
import Arcjet from "./arcjet.svg";
import BaseHub from "./basehub.svg";
import BetterStack from "./better-stack.svg";
import Clerk from "./clerk.svg";
import Cmdk from "./cmdk.svg";
import GoogleAnalytics from "./google-analytics.svg";
import Liveblocks from "./liveblocks.svg";
import Lucide from "./lucide.svg";
import Neon from "./neon.svg";
import Posthog from "./posthog.svg";
import Prisma from "./prisma.svg";
import Radix from "./radix.svg";
import React from "./react.svg";
import ReactEmail from "./react-email.svg";
import Recharts from "./recharts.svg";
import Resend from "./resend.svg";
import Sentry from "./sentry.svg";
import Stripe from "./stripe.svg";
import Svix from "./svix.svg";
import Tailwind from "./tailwind.svg";
import TypeScript from "./typescript.svg";
import Ultracite from "./ultracite.svg";
import Vercel from "./vercel.svg";
import Zod from "./zod.svg";

const rows = [
  {
    row: [
      {
        label: "BetterStack",
        src: BetterStack,
        className: "[animation-delay:-26s] [animation-duration:30s]",
      },
      {
        label: "Clerk",
        src: Clerk,
        className: "[animation-delay:-8s] [animation-duration:30s]",
      },
      {
        label: "Ultracite",
        src: Ultracite,
        className: "[animation-delay:-18s] [animation-duration:30s]",
      },
      {
        label: "Resend",
        src: Resend,
        className: "[animation-delay:-22s] [animation-duration:30s]",
      },
    ],
  },
  {
    row: [
      {
        label: "BaseHub",
        src: BaseHub,
        className: "[animation-delay:-40s] [animation-duration:40s]",
      },
      {
        label: "Google Analytics",
        src: GoogleAnalytics,
        className: "[animation-delay:-20s] [animation-duration:40s]",
      },
      {
        label: "Lucide",
        src: Lucide,
        className: "[animation-delay:-30s] [animation-duration:40s]",
      },
      {
        label: "PostHog",
        src: Posthog,
        className: "[animation-delay:-35s] [animation-duration:40s]",
      },
    ],
  },
  {
    row: [
      {
        label: "Prisma",
        src: Prisma,
        className: "[animation-delay:-10s] [animation-duration:40s]",
      },
      {
        label: "Radix UI",
        src: Radix,
        className: "[animation-delay:-32s] [animation-duration:40s]",
      },
      {
        label: "Arcjet",
        src: Arcjet,
        className: "[animation-delay:-22s] [animation-duration:40s]",
      },
      {
        label: "Liveblocks",
        src: Liveblocks,
        className: "[animation-delay:-28s] [animation-duration:40s]",
      },
    ],
  },
  {
    row: [
      {
        label: "React Email",
        src: ReactEmail,
        className: "[animation-delay:-45s] [animation-duration:45s]",
      },
      {
        label: "Sentry",
        src: Sentry,
        className: "[animation-delay:-23s] [animation-duration:45s]",
      },
      {
        label: "React",
        src: React,
        className: "[animation-delay:-34s] [animation-duration:45s]",
      },
      {
        label: "CMDK",
        src: Cmdk,
        className: "[animation-delay:-39s] [animation-duration:45s]",
      },
    ],
  },
  {
    row: [
      {
        label: "Stripe",
        src: Stripe,
        className: "[animation-delay:-55s] [animation-duration:60s]",
      },
      {
        label: "Tailwind CSS",
        src: Tailwind,
        className: "[animation-delay:-20s] [animation-duration:60s]",
      },
      {
        label: "Neon",
        src: Neon,
        className: "[animation-delay:-38s] [animation-duration:60s]",
      },
      {
        label: "Recharts",
        src: Recharts,
        className: "[animation-delay:-45s] [animation-duration:60s]",
      },
    ],
  },
  {
    row: [
      {
        label: "TypeScript",
        src: TypeScript,
        className: "[animation-delay:-9s] [animation-duration:40s]",
      },
      {
        label: "Svix",
        src: Svix,
        className: "[animation-delay:-28s] [animation-duration:40s]",
      },
      {
        label: "Vercel",
        src: Vercel,
        className: "[animation-delay:-18s] [animation-duration:40s]",
      },
      {
        label: "Zod",
        src: Zod,
        className: "[animation-delay:-33s] [animation-duration:40s]",
      },
    ],
  },
];

export const Features = () => (
  <section className="dark h-[400px] sm:h-[800px]" id="features">
    <div
      aria-hidden="true"
      className="relative h-full overflow-hidden bg-background py-24 ring-inset sm:py-32"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 mx-auto w-full max-w-[90%] text-center">
        <div className="relative z-10">
          <p className="mx-auto mt-2 max-w-3xl text-pretty font-semibold text-4xl text-foreground/10 tracking-tight sm:text-5xl md:text-6xl">
            Built with the best tools for modern developers
          </p>
        </div>
      </div>
      <div className="absolute inset-0 grid grid-cols-1 pt-0 [container-type:inline-size]">
        {rows.map((rowData, index) => (
          <div className="group relative" key={index}>
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[length:12px_100%] bg-gradient-to-r from-[2px] from-background/15 to-[2px] dark:from-foreground/15" />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[length:12px_100%] bg-gradient-to-r from-[2px] from-background/5 to-[2px] group-last:hidden dark:from-foreground/5" />
            {rowData.row.map((logo, _logoIndex) => (
              <div
                className={cn(
                  logo.className,
                  "absolute top-[50px] flex items-center gap-2 whitespace-nowrap px-3 py-1",
                  "rounded-full bg-gradient-to-t from-50% from-secondary/50 to-secondary/50 ring-1 ring-background/10 ring-inset backdrop-blur-sm dark:from-background/50 dark:to-secondary/50 dark:ring-foreground/10",
                  "[--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:running] [animation-timing-function:linear]",
                  "shadow-[0_0_15px_rgba(255,255,255,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                )}
                key={logo.label}
              >
                <Image alt="" className="size-4" src={logo.src} />
                <span className="font-medium text-foreground text-sm/6">
                  {logo.label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);
