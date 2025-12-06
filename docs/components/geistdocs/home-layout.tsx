import { DocsLayout as FumadocsDocsLayout } from "fumadocs-ui/layouts/docs";
import type { ComponentProps, ReactNode } from "react";
import { i18n } from "@/lib/geistdocs/i18n";

type HomeLayoutProps = {
  tree: ComponentProps<typeof FumadocsDocsLayout>["tree"];
  children: ReactNode;
};

export const HomeLayout = ({ tree, children }: HomeLayoutProps) => (
  <FumadocsDocsLayout
    containerProps={{
      className: "p-0! max-w-full mx-0 [&_[data-sidebar-placeholder]]:hidden",
      style: {
        display: "flex",
        flexDirection: "column",
      },
    }}
    i18n={i18n}
    nav={{
      enabled: false,
    }}
    searchToggle={{
      enabled: false,
    }}
    sidebar={{
      className: "md:hidden",
    }}
    tabMode="auto"
    themeSwitch={{
      enabled: false,
    }}
    tree={tree}
  >
    {children}
  </FumadocsDocsLayout>
);
