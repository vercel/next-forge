import { Apps } from "./components/apps";
import { CallToAction } from "./components/cta";
import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { Social } from "./components/social";

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
