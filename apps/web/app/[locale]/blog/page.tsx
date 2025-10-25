import { blog } from "@repo/cms";
import { Feed } from "@repo/cms/components/feed";
import { Image } from "@repo/cms/components/image";
import { cn } from "@repo/design-system/lib/utils";
import { getDictionary } from "@repo/internationalization";
import type { Blog, WithContext } from "@repo/seo/json-ld";
import { JsonLd } from "@repo/seo/json-ld";
import { createMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";

type BlogProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: BlogProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata(dictionary.web.blog.meta);
};

const BlogIndex = async ({ params }: BlogProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  const jsonLd: WithContext<Blog> = {
    "@type": "Blog",
    "@context": "https://schema.org",
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto flex flex-col gap-14">
          <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
              {dictionary.web.blog.meta.title}
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Feed queries={[blog.postsQuery]}>
              {async ([data]) => {
                "use server";

                if (!data.blog.posts.items.length) {
                  return null;
                }

                return data.blog.posts.items.map((post, index) => (
                  <Link
                    className={cn(
                      "flex cursor-pointer flex-col gap-4 hover:opacity-75",
                      !index && "md:col-span-2"
                    )}
                    href={`/blog/${post._slug}`}
                    key={post._slug}
                  >
                    <Image
                      alt={post.image.alt ?? ""}
                      height={post.image.height}
                      src={post.image.url}
                      width={post.image.width}
                    />
                    <div className="flex flex-row items-center gap-4">
                      <p className="text-muted-foreground text-sm">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="max-w-3xl text-4xl tracking-tight">
                        {post._title}
                      </h3>
                      <p className="max-w-3xl text-base text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ));
              }}
            </Feed>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
