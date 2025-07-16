import type { Author } from '@/components/authors';
import { source } from '@/lib/source';
import { ImageResponse } from 'next/og';
import type { ReactNode } from 'react';

const bgColor = '#0a0a0a';
const fgColor = '#fafafa';
const fgOpacity = 0.1;

export function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?slug=<slug>
    const slug = searchParams.get('slug');

    if (!slug) {
      return new Response('Failed to generate the image.', {
        status: 500,
      });
    }

    const slugs = slug.split('/');
    const page = source.getPage(slugs);

    if (!page) {
      return new Response('Failed to generate the image. Page not found', {
        status: 500,
      });
    }

    const mdxContent = page.data.content;

    const authors = parseAuthor(mdxContent);

    return new ImageResponse(
      <Background>
        <div tw="flex h-full w-full flex-col">
          <LogoBadge />
          <div tw="flex flex-grow items-center">
            <div tw="flex flex-col">
              <span
                style={{
                  fontFamily: 'Geist',
                  fontWeight: 400,
                  fontSize: '56px',
                  lineHeight: '64px',
                }}
                tw="text-white"
              >
                {page.data.title}
              </span>
              <span
                style={{
                  fontFamily: 'Geist',
                  fontWeight: 500,
                  fontSize: '32px',
                  marginTop: '16px',
                  marginBottom: '32px',
                }}
                tw="text-white"
              >
                {page.data.description}
              </span>
              {authors.length > 0 && (
                <div
                  tw="flex flex-wrap items-center"
                  style={{
                    gap: '8px', // gap-2
                  }}
                >
                  {authors.map((author) => (
                    <div
                      key={author.user.id}
                      tw="relative flex items-center rounded-xl border bg-[#262626] p-2 pr-4 font-normal"
                      style={{
                        gap: '12px', // gap-3
                      }}
                    >
                      <div tw="relative flex">
                        <div tw="h-8 w-8 overflow-hidden rounded-full border flex">
                          {/* biome-ignore lint/nursery/noImgElement: https://vercel.com/docs/og-image-generation/examples#dynamic-external-image */}
                          <img
                            tw="m-0 h-full w-full object-cover"
                            src={`https://next-forge.com/images/authors/${author.company.id}/${author.user.id}.jpg`}
                            alt=""
                            width={32}
                            height={32}
                          />
                        </div>
                        <div tw="-bottom-1 -right-1 absolute h-4 w-4 overflow-hidden rounded-full border object-cover flex">
                          {/* biome-ignore lint/nursery/noImgElement: https://vercel.com/docs/og-image-generation/examples#dynamic-external-image */}
                          <img
                            tw="m-0 h-full w-full object-cover"
                            src={`https://next-forge.com/images/authors/${author.company.id}/logo.jpg`}
                            alt=""
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                      <div tw="flex flex-col text-white">
                        <span tw="font-semibold text-[13px] leading-tight">
                          {author.user.name}
                        </span>
                        <span tw="text-[11px] text-muted-foreground leading-tight">
                          {author.company.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Background>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (_e: unknown) {
    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}

function LogoBadge() {
  return (
    <div tw="py-2 px-6 rounded-full bg-white flex mx-auto justify-center items-center">
      {/* biome-ignore lint/nursery/noImgElement: https://vercel.com/docs/og-image-generation/examples#dynamic-external-image */}
      <img
        width="20"
        height="20"
        alt="next-forge"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAJ0lEQVR42mNgaGD4jxfWMxACo0aMGjFqxPAwYjS4Ro0YNWLUCJgRAGR5/hC+uib5AAAAAElFTkSuQmCC"
        tw="mr-2"
      />
      <div tw="font-bold text-lg">next-forge.com</div>
    </div>
  );
}

function Background({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='${encodeURI(fgColor)}' fill-opacity='${fgOpacity}' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E")`,
      }}
      tw="flex w-full h-full p-16"
    >
      <div tw="flex w-full h-full items-center">{children}</div>
      <span
        tw="bg-white py-2 pl-6 pr-8 rounded-l-full absolute right-0 bottom-12 items-center"
        style={{
          fontFamily: 'Geist',
          fontWeight: 300,
          fontSize: '22px',
        }}
      >
        Production-grade
        {/* biome-ignore lint/nursery/noImgElement: https://vercel.com/docs/og-image-generation/examples#dynamic-external-image */}
        <img
          width="20"
          height="20"
          alt="turborepo"
          src="data:image/svg+xml,%3Csvg%20fill%3D%22none%22%20viewBox%3D%220%200%2036%2036%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20class%3D%22pointer-events-none%20mx-1.5%20inline-block%20h-8%20w-auto%20translate-y-0.5%20select-none%20align-baseline%20sm%3Ah-%5B38px%5D%20md%3Ah-%5B48px%5D%20md%3Atranslate-y-1%22%3E%3Ctitle%3ETurborepo%3C%2Ftitle%3E%3ClinearGradient%20id%3D%22a%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%2219.672%22%20x2%3D%221.96713%22%20y1%3D%222.5292%22%20y2%3D%2220.234%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230096ff%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23ff1e56%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3Cpath%20d%3D%22m17.9856%206.28879c-6.4499%200-11.69727%205.24741-11.69727%2011.69721s5.24737%2011.6972%2011.69727%2011.6972c6.4498%200%2011.6972-5.2474%2011.6972-11.6972s-5.2474-11.69721-11.6972-11.69721zm0%2017.75061c-3.3437%200-6.0534-2.7098-6.0534-6.0534s2.7097-6.0534%206.0534-6.0534c3.3436%200%206.0533%202.7098%206.0533%206.0534s-2.7097%206.0534-6.0533%206.0534z%22%20fill%3D%22currentColor%22%3E%3C%2Fpath%3E%3Cpath%20clip-rule%3D%22evenodd%22%20d%3D%22m18.9661%204.3674v-4.3674c9.4928.507533%2017.0339%208.36667%2017.0339%2017.9858%200%209.6192-7.5411%2017.4762-17.0339%2017.9859v-4.3674c7.0749-.5054%2012.6774-6.4172%2012.6774-13.6185s-5.6025-13.11305-12.6774-13.6184zm-11.29647%2022.5493c-1.87548-2.1652-3.08441-4.9229-3.30005-7.9506h-4.36958c.226538%204.2367%201.92122%208.0813%204.57651%2011.0415l3.09094-3.0909zm9.33607%209.055v-4.3674c-3.0299-.2157-5.7876-1.4224-7.9528-3.3001l-3.09094%203.091c2.96243%202.6574%206.80704%204.3499%2011.04154%204.5765z%22%20fill%3D%22url(%23a)%22%20fill-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
          tw="ml-2 mr-1"
        />{' '}
        Turborepo template for
        {/* biome-ignore lint/nursery/noImgElement: https://vercel.com/docs/og-image-generation/examples#dynamic-external-image */}
        <img
          width="20"
          height="20"
          alt="turborepo"
          src="data:image/svg+xml,%3Csvg%20viewBox%3D%22.5%20-.2%201023%201024.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22pointer-events-none%20mx-1.5%20inline-block%20h-8%20w-auto%20translate-y-0.5%20select-none%20align-baseline%20sm%3Ah-%5B38px%5D%20md%3Ah-%5B48px%5D%20md%3Atranslate-y-1%20dark%3Ainvert%22%3E%3Ctitle%3ENext.js%3C%2Ftitle%3E%3Cpath%20d%3D%22m478.5.6c-2.2.2-9.2.9-15.5%201.4-145.3%2013.1-281.4%2091.5-367.6%20212-48%2067-78.7%20143-90.3%20223.5-4.1%2028.1-4.6%2036.4-4.6%2074.5s.5%2046.4%204.6%2074.5c27.8%20192.1%20164.5%20353.5%20349.9%20413.3%2033.2%2010.7%2068.2%2018%20108%2022.4%2015.5%201.7%2082.5%201.7%2098%200%2068.7-7.6%20126.9-24.6%20184.3-53.9%208.8-4.5%2010.5-5.7%209.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8%2067.3-1%20149.6-.3%20144.1-.4%20149.9-2.2%20153.3-2.6%204.9-4.6%206.9-8.8%209.1-3.2%201.6-6%201.9-21.1%201.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6%203.1-3.9c1.6-2.1%205-4.8%207.4-6.1%204.1-2%205.7-2.2%2023-2.2%2020.4%200%2023.8.8%2029.1%206.6%201.5%201.6%2057%2085.2%20123.4%20185.9s157.2%20238.2%20201.8%20305.7l81%20122.7%204.1-2.7c36.3-23.6%2074.7-57.2%20105.1-92.2%2064.7-74.3%20106.4-164.9%20120.4-261.5%204.1-28.1%204.6-36.4%204.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4%20309.4c4.8%202.4%208.7%207%2010.1%2011.8.8%202.6%201%2058.2.8%20183.5l-.3%20179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132%201-134.3%201.6-5.6%205.1-10%209.9-12.6%204.1-2.1%205.6-2.3%2021.3-2.3%2014.8%200%2017.4.2%2020.7%202z%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m784.3%20945.1c-3.5%202.2-4.6%203.7-1.5%202%202.2-1.3%205.8-4%205.2-4.1-.3%200-2%201-3.7%202.1zm-6.9%204.5c-1.8%201.4-1.8%201.5.4.4%201.2-.6%202.2-1.3%202.2-1.5%200-.8-.5-.6-2.6%201.1zm-5%203c-1.8%201.4-1.8%201.5.4.4%201.2-.6%202.2-1.3%202.2-1.5%200-.8-.5-.6-2.6%201.1zm-5%203c-1.8%201.4-1.8%201.5.4.4%201.2-.6%202.2-1.3%202.2-1.5%200-.8-.5-.6-2.6%201.1zm-7.6%204c-3.8%202-3.6%202.8.2.9%201.7-.9%203-1.8%203-2%200-.7-.1-.6-3.2%201.1z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
          tw="ml-2 mr-1"
        />{' '}
        Next.js apps
      </span>
    </div>
  );
}

function parseAuthor(mdxContent: string): Author[] {
  // biome-ignore lint/performance/useTopLevelRegex: <explanation>
  const match = mdxContent.match(/<Authors\s+data=\{([\s\S]*?)\}\s*\/>/);

  if (match) {
    const rawData = match[1];
    return JSON.parse(
      rawData
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // quote keys
        .replace(/'([^']+)'/g, '"$1"') // single quotes to double
        .replace(/},\s*(?=])/g, '}') // remove trailing comma before closing ]
        .replace(/},\s*(?=})/g, '}') // remove trailing comma before closing }
        .replace(/",\s*(?=})/g, '"') // remove trailing comma before closing }
        .replace(/},\s*(?={)/g, '},') // keep commas between objects
    ) as Author[];
  }
  return [];
}
