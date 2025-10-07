import { Callout } from "fumadocs-ui/components/callout";
import * as StepsComponents from "fumadocs-ui/components/steps";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Authors } from "./components/authors";
import { Mermaid } from "./components/mermaid";
import { VercelButton } from "./components/vercel";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ...TabsComponents,
    ...StepsComponents,
    Authors,
    VercelButton,
    Warning: ({ children }) => <Callout type="warning">{children}</Callout>,
    Tip: ({ children }) => <Callout type="info">{children}</Callout>,
    Info: ({ children }) => <Callout type="info">{children}</Callout>,
    Note: ({ children }) => <Callout type="info">{children}</Callout>,
    Mermaid,
  };
}
