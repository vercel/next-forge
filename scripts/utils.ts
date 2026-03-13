import { type SpawnSyncOptions, spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const url = "https://github.com/vercel/next-forge";

export const cleanFileName = (file: string) =>
  file.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\\/g, "/");

export const shellOption = process.platform === "win32";

export const run = (
  command: string,
  args: string[],
  options?: SpawnSyncOptions
) => {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: shellOption,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = result.stderr?.toString().trim();
    const message = stderr
      ? `Command failed: ${command} ${args.join(" ")}\n${stderr}`
      : `Command failed with exit code ${result.status}: ${command} ${args.join(" ")}`;
    throw new Error(message);
  }

  return result;
};

export const internalContentDirs = [join(".github", "workflows"), "docs"];

export const internalContentFiles = [
  join(".github", "CONTRIBUTING.md"),
  join(".github", "FUNDING.yml"),
  join(".github", "SECURITY.md"),
  ".changeset",
  "CHANGELOG.md",
  "license.md",
];

export const allInternalContent = [
  ...internalContentDirs,
  ...internalContentFiles,
];

export const semver = /^\d+\.\d+\.\d+$/;

export const tempDirName = "next-forge-update";

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
