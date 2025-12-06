import type { Metadata } from "next";
import { Apps } from "./components/apps";
import { CallToAction } from "./components/cta";
import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { Social } from "./components/social";

export const metadata: Metadata = {
  title: "Production-grade Turborepo template for Next.js apps | next-forge",
  description:
    "A monorepo template designed to have everything you need to build your new SaaS app as thoroughly as possible. Free and open source, forever.",
};

const Home = () => (
  <main className="container mx-auto px-0 pb-24">
    <Hero />
    <div className="divide-y border-x border-y">
      <Apps />
      <Features />
      <Social />
      <CallToAction />
    </div>
  </main>
);

export default Home;
