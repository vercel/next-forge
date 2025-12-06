import { Apps } from "./components/apps";
import { CallToAction } from "./components/cta";
import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { OpenSource } from "./components/open-source";
import { Review } from "./components/review";
import { Social } from "./components/social";

const Home = () => (
  <main className="container mx-auto divide-y border-x px-0">
    <Hero />
    <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div className="sm:col-span-2">
        <Review />
      </div>
      <div className="sm:col-span-1">
        <OpenSource />
      </div>
    </div>
    <div className="h-8 bg-dashed" />
    <Apps />
    <Features />
    <Social />
    <CallToAction />
  </main>
);

export default Home;
