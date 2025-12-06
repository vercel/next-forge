import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Installer } from "./installer";

export const CallToAction = () => (
  <footer className="flex flex-col items-center justify-center gap-8 px-8 py-16 sm:py-24">
    <div className="inline-flex rounded-full border bg-secondary px-4 py-1.5 font-medium text-sm shadow-sm">
      Get started
    </div>
    <p className="text-center font-semibold text-3xl leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
      Ready to build something amazing? <br className="hidden sm:block" />
      Clone this repo and start building.
    </p>
    <div className="mx-auto flex max-w-full flex-col items-center justify-center gap-2 sm:max-w-lg sm:flex-row">
      <Installer />
      <Button asChild size="lg">
        <Link href="/docs">Read the docs</Link>
      </Button>
    </div>
  </footer>
);
