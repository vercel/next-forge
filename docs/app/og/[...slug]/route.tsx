import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { source } from "@/lib/source";

const loadGoogleFont = async (font: string, text: string, weights: string) => {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weights}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
};

type GetContext = RouteContext<"/og/[...slug]">;

export const GET = async (_request: NextRequest, context: GetContext) => {
  const { slug } = await context.params;
  const page = source.getPage(slug.slice(0, -1));

  if (!page) {
    return new Response("Not found", { status: 404 });
  }

  const { title, description } = page.data;
  const text = `next-forge ${title} ${description}`;

  return new ImageResponse(
    <div tw="bg-neutral-100 relative flex flex-col justify-between w-full h-full">
      <div
        style={{
          backgroundSize: "48px 48px",
          backgroundImage:
            "linear-gradient(to right, #BBB 1px, transparent 1px), linear-gradient(to bottom, #BBB 1px, transparent 1px)",
        }}
        tw="flex absolute left-0 top-0 w-full h-full opacity-10"
      />
      <div tw="absolute left-36 top-12 z-10 w-12 h-12 bg-white opacity-10" />
      <div tw="absolute left-96 top-24 z-10 w-12 h-12 bg-white opacity-10" />
      <div tw="absolute left-144 top-36 z-10 w-12 h-12 bg-white opacity-10" />
      <div tw="absolute left-192 top-48 z-10 w-12 h-12 bg-white opacity-10" />
      <div tw="absolute left-240 top-24 z-10 w-12 h-12 bg-white opacity-10" />
      <div tw="absolute left-288 top-72 z-10 w-12 h-12 bg-white opacity-10" />
      <div tw="absolute left-48 top-60 z-10 w-12 h-12 bg-white opacity-10" />

      <div tw="flex top-12 left-12 z-10">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: "satori" */}
        <svg
          fill="none"
          height="48"
          viewBox="0 0 96 96"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <clipPath id="a">
            <path d="m0 0h96v96h-96z" />
          </clipPath>
          <g clip-path="url(#a)">
            <path
              clip-rule="evenodd"
              d="m48 0h-48l48 48h-48l48 48h48l-48-48h48z"
              fill="#000"
              fill-rule="evenodd"
            />
          </g>
        </svg>
      </div>
      <div
        style={{ fontFamily: "Geist" }}
        tw="flex flex-col bottom-0 left-0 right-0 relative z-10 p-12"
      >
        <p tw="text-lg m-0 text-black/80 font-semibold">next-forge</p>
        <h1
          style={{ fontFamily: "Geist Semibold" }}
          tw="my-4 text-6xl font-bold text-black"
        >
          {page.data.title}
        </h1>
        <p tw="text-xl m-0 text-black/80 w-[70%]">{page.data.description}</p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist Semibold",
          data: await loadGoogleFont("Geist", text, "600"),
          style: "normal",
        },
        {
          name: "Geist",
          data: await loadGoogleFont("Geist", text, "400"),
          style: "normal",
        },
      ],
    }
  );
};
