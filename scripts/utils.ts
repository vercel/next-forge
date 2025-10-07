import { type ExecSyncOptions, exec as execRaw } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

export const url = "https://github.com/vercel/next-forge";

export const cleanFileName = (file: string) =>
  file.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\\/g, "/");

export const execSyncOpts: ExecSyncOptions = { stdio: "ignore" };

export const internalContentDirs = [join(".github", "workflows"), "docs"];

export const internalContentFiles = [
  join(".github", "CONTRIBUTING.md"),
  join(".github", "FUNDING.yml"),
  join(".github", "SECURITY.md"),
  ".autorc",
  "CHANGELOG.md",
  "license.md",
];

export const allInternalContent = [
  ...internalContentDirs,
  ...internalContentFiles,
];

export const semver = /^\d+\.\d+\.\d+$/;

export const tempDirName = "next-forge-update";

export const exec = promisify(execRaw);

export const supportedPackageManagers = ["npm", "yarn", "bun", "pnpm"];

export const getAvailableVersions = async (): Promise<string[]> => {
  const changelog = await readFile("CHANGELOG.md", "utf-8");
  const versionRegex = /# v(\d+\.\d+\.\d+)/g;
  const matches = [...changelog.matchAll(versionRegex)];

  return matches
    .map((match) => match[1])
    .sort((a, b) => {
      const [aMajor, aMinor, aPatch] = a.split(".").map(Number);
      const [bMajor, bMinor, bPatch] = b.split(".").map(Number);
      if (aMajor !== bMajor) {
        return bMajor - aMajor;
      }
      if (aMinor !== bMinor) {
        return bMinor - aMinor;
      }
      return bPatch - aPatch;
    });
};
