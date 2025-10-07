import path from "node:path";
import { getTableOfContents } from "fumadocs-core/server";
import { getSlugs, parseFilePath } from "fumadocs-core/source";
import {
  printErrors,
  readFiles,
  scanURLs,
  validateFiles,
} from "next-validate-link";

async function checkLinks() {
  // we read them all at once to avoid repeated file read
  const docsFiles = await readFiles("./content/docs/**/*.{md,mdx}");

  const scanned = await scanURLs({
    populate: {
      "[[...slug]]": docsFiles.map((file) => {
        const info = parseFilePath(path.relative("./content/docs", file.path));

        return {
          value: getSlugs(info),
          hashes: getTableOfContents(file.content).map((item) =>
            item.url.slice(1)
          ),
        };
      }),
    },
  });

  printErrors(
    await validateFiles(docsFiles, {
      scanned,
    }),
    true
  );
}

void checkLinks();
