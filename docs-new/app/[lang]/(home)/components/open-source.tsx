import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const OpenSource = () => (
  <div className="flex h-full flex-col items-start justify-between gap-4 p-8">
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <StarIcon size={14} />
        <small>Open source</small>
      </div>
      <p className="font-semibold text-xl tracking-tight">
        next-forge is 100% open source, provided by{" "}
        <a
          className="text-primary underline"
          href="https://vercel.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Vercel
        </a>{" "}
        and maintained by a community of developers. It was originally developed
        by{" "}
        <a
          className="text-primary underline"
          href="https://x.com/haydenbleasel"
          rel="noopener noreferrer"
          target="_blank"
        >
          Hayden Bleasel
        </a>
        .
      </p>
    </div>
    <Button asChild variant="outline">
      <a
        href="https://github.com/vercel/next-forge"
        rel="noopener noreferrer"
        target="_blank"
      >
        Browse the source code
      </a>
    </Button>
  </div>
);
