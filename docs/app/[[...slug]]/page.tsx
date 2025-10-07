import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { source, getPageImage } from "../../lib/source";
import { baseOptions } from "../layout.config";
import Home from "./(home)";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const Page = async (props: PageProps) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!params.slug) {
    return (
      <DocsLayout
        {...baseOptions}
        containerProps={{ className: "landing-page" }}
        nav={{ ...baseOptions.nav, mode: "top" }}
        sidebar={{ hidden: true, collapsible: false }}
        tree={source.pageTree}
      >
        <Home />
      </DocsLayout>
    );
  }

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsLayout
      {...baseOptions}
      nav={{
        ...baseOptions.nav,
        mode: "top",
      }}
      sidebar={{
        collapsible: false,
        tabs: [
          {
            title: "Docs",
            url: "/docs",
          },
          {
            title: "Apps",
            url: "/apps",
          },
          {
            title: "Packages",
            url: "/packages",
          },
          {
            title: "Migrations",
            url: "/migrations",
          },
          {
            title: "Addons",
            url: "/addons",
          },
        ],
      }}
      tabMode="navbar"
      tree={source.pageTree}
    >
      <DocsPage
        full={page.data.full}
        tableOfContent={{ style: "clerk" }}
        toc={page.data.toc}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
};

export const generateStaticParams = async () => source.generateParams();

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!params.slug) {
    return {
      title: "Production-grade Turborepo template for Next.js apps",
      description:
        "A monorepo template designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, database ORM and more — it's all here.",
    };
  }

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "website",
      images: getPageImage(page).url,
    },
  };
}

export default Page;
