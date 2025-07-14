import { getMDXComponents } from '@/mdx-components';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { source } from '../../lib/source';
import { baseOptions } from '../layout.config';
import Home from './(home)';

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
        tree={source.pageTree}
        sidebar={{ hidden: true, collapsible: false }}
        nav={{ ...baseOptions.nav, mode: 'top' }}
        containerProps={{ className: 'landing-page' }}
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
      tree={source.pageTree}
      sidebar={{
        collapsible: false,
        tabs: [
          {
            title: 'Docs',
            url: '/docs',
          },
          {
            title: 'Apps',
            url: '/apps',
          },
          {
            title: 'Packages',
            url: '/packages',
          },
          {
            title: 'Migrations',
            url: '/migrations',
          },
          {
            title: 'Addons',
            url: '/addons',
          },
        ],
      }}
      tabMode="navbar"
      nav={{
        ...baseOptions.nav,
        mode: 'top',
      }}
    >
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        tableOfContent={{ style: 'clerk' }}
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
      title: 'Production-grade Turborepo template for Next.js apps',
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
      type: 'website',
      images: [
        {
          url: `/og?slug=${params.slug?.join('/') ?? ''}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default Page;
