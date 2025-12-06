"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ComponentProps } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useChatContext } from "@/hooks/geistdocs/use-chat";
import { useIsMobile } from "@/hooks/use-mobile";
import { i18n, i18nProvider } from "@/lib/geistdocs/i18n";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "../ui/tooltip";
import { SearchDialog } from "./search";

type GeistdocsProviderProps = ComponentProps<typeof RootProvider> & {
  className?: string;
  lang?: string;
};

export const GeistdocsProvider = ({
  search,
  className,
  lang = i18n.defaultLanguage,
  ...props
}: GeistdocsProviderProps) => {
  const { isOpen } = useChatContext();
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "transition-all",
        isOpen && !isMobile && "pr-96!",
        className
      )}
    >
      <TooltipProvider>
        <RootProvider
          i18n={i18nProvider(lang)}
          search={{
            SearchDialog,
            ...search,
          }}
          {...props}
        />
      </TooltipProvider>
      <Analytics />
      <Toaster />
      <SpeedInsights />
    </div>
  );
};
