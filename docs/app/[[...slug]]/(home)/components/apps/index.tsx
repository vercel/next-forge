import {
  BookIcon,
  CurlyBracesIcon,
  DatabaseIcon,
  GlobeIcon,
  LaptopIcon,
  MailIcon,
  ServerIcon,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ApiImage from "./api.png";
import AppImage from "./app.png";
import DocsImage from "./docs.png";
import EmailImage from "./email.png";
import StorybookImage from "./storybook.png";
import StudioImage from "./studio.png";
import WebImage from "./web.png";

const apps = [
  {
    icon: LaptopIcon,
    name: "app",
    title: "Lightning-fast app template",
    description:
      "Start building your app with a shadcn/ui template that's already set up with everything you need — Tailwind, Clerk and more.",
    image: AppImage,
  },
  {
    icon: ServerIcon,
    name: "api",
    title: "Cross-platform API",
    description:
      "Create an API microservice for many different apps, with a type-safe database ORM and webhook handlers.",
    image: ApiImage,
  },
  {
    icon: MailIcon,
    name: "email",
    title: "React-based email templates",
    description:
      "Create and preview email templates with a React-based email library, then send them with a simple API powered by Resend.",
    image: EmailImage,
  },
  {
    icon: GlobeIcon,
    name: "web",
    title: "Robust, type-safe website",
    description:
      "A twblocks website template with a type-safe blog, bulletproof SEO and legal pages, powered by BaseHub.",
    image: WebImage,
  },
  {
    icon: BookIcon,
    name: "docs",
    title: "Stunning documentation",
    description:
      "Simple, beautiful out of the box and easy to maintain documentation. Pages are automatically generated from your markdown files.",
    image: DocsImage,
  },
  {
    icon: DatabaseIcon,
    name: "studio",
    title: "Visual database editor",
    description:
      "Use Prisma to generate a type-safe client for your database, and Prisma Studio to visualize and edit it.",
    image: StudioImage,
  },
  {
    icon: CurlyBracesIcon,
    name: "storybook",
    title: "A frontend workshop",
    description:
      "Built-in Storybook instance, allowing you to create reusable components and pages that can be tested and previewed in isolation.",
    image: StorybookImage,
  },
];

const App = ({ app }: { app: (typeof apps)[number] }) => (
  <div className="relative flex flex-col gap-8 overflow-hidden p-8 pb-0">
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <app.icon size={14} />
        <small>/apps/{app.name}</small>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl sm:truncate">{app.title}</h2>
        <p className="text-balance text-muted-foreground sm:line-clamp-2">
          {app.description}
        </p>
      </div>
    </div>
    <div className="h-48 overflow-hidden md:h-80">
      <Image
        alt=""
        className="h-auto w-full overflow-hidden rounded-md border object-cover object-left shadow-sm"
        src={app.image}
      />
    </div>
  </div>
);

export const Apps = () => (
  <section className="grid sm:grid-cols-2" id="apps">
    {apps.map((app, index) => (
      <div
        className={cn(
          index % 2 && "sm:border-l",
          index > 0 && "border-t sm:border-t-0",
          index > 1 && "!border-t"
        )}
        key={index}
      >
        <App app={app} />
      </div>
    ))}
    {apps.length % 2 === 1 && (
      <div className="h-full w-full border-t border-l bg-dashed" />
    )}
  </section>
);
