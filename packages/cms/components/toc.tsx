import { RichText } from "basehub/react-rich-text";
import type { ComponentProps } from "react";

type TableOfContentsProperties = Omit<
  ComponentProps<typeof RichText>,
  "children"
> & {
  readonly data: ComponentProps<typeof RichText>["children"];
};

export const TableOfContents = ({
  data,
  ...props
}: TableOfContentsProperties) => (
  <div>
    <RichText
      // @ts-expect-error "idk"
      components={{
        ol: ({ children }) => (
          <ol className="flex list-none flex-col gap-2 text-sm">{children}</ol>
        ),
        ul: ({ children }) => (
          <ul className="flex list-none flex-col gap-2 text-sm">{children}</ul>
        ),
        li: ({ children }) => <li className="pl-3">{children}</li>,
        a: ({ children, href }) => (
          <a
            className="line-clamp-3 flex rounded-sm text-foreground text-sm underline decoration-foreground/0 transition-colors hover:decoration-foreground/50"
            href={`#${href?.split("#").at(1)}`}
          >
            {children}
          </a>
        ),
      }}
      {...props}
    >
      {data}
    </RichText>
  </div>
);
