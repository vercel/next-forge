import { copyFile, mkdir, readFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  cancel,
  intro,
  isCancel,
  log,
  outro,
  select,
  spinner,
} from "@clack/prompts";
import {
  allInternalContent,
  cleanFileName,
  getAvailableVersions,
  run,
  tempDirName,
  url,
} from "./utils.js";

const compareVersions = (a: string, b: string) => {
  const [aMajor, aMinor, aPatch] = a.split(".").map(Number);
  const [bMajor, bMinor, bPatch] = b.split(".").map(Number);
  if (aMajor !== bMajor) {
    return aMajor - bMajor;
  }
  if (aMinor !== bMinor) {
    return aMinor - bMinor;
  }
  return aPatch - bPatch;
};

const createTemporaryDirectory = async (name: string) => {
  const cwd = process.cwd();
  const tempDir = join(cwd, name);

  await rm(tempDir, { recursive: true, force: true });
  await mkdir(tempDir, { recursive: true });
};

const cloneRepository = (name: string) => {
  run("git", ["clone", url, name]);
};

const getFiles = (version: string) => {
  run("git", ["checkout", version]);

  const result = run("git", ["ls-files"], { stdio: "pipe" });
  const files = result.stdout.toString().trim().split("\n");

  return files;
};

const updateFiles = async (files: string[]) => {
  const cwd = process.cwd();
  const tempDir = join(cwd, tempDirName);

  for (const file of files) {
    const sourcePath = join(tempDir, file);
    const destPath = join(cwd, file);

    await mkdir(dirname(destPath), { recursive: true });

    await copyFile(sourcePath, destPath);
  }
};

const deleteTemporaryDirectory = async () =>
  await rm(tempDirName, { recursive: true, force: true });

const getCurrentVersion = async (): Promise<string | undefined> => {
  const packageJsonPath = join(process.cwd(), "package.json");
  const packageJsonContents = await readFile(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(packageJsonContents) as { version?: string };

  return packageJson.version;
};

const selectVersion = async (
  label: string,
  availableVersions: string[],
  initialValue: string | undefined
) => {
  const version = await select({
    message: `Select a version to update ${label}:`,
    options: availableVersions.map((v) => ({ value: v, label: `v${v}` })),
    initialValue,
    maxItems: 10,
  });

  if (isCancel(version)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return version.toString();
};

const getDiff = (
  from: { version: string; files: string[] },
  to: { version: string; files: string[] }
) => {
  const filesToUpdate: string[] = [];

  for (const file of to.files) {
    if (allInternalContent.some((ic) => file.startsWith(ic))) {
      continue;
    }

    if (!from.files.includes(file)) {
      filesToUpdate.push(file);
      continue;
    }

    const result = run(
      "git",
      ["diff", from.version, to.version, "--", cleanFileName(file)],
      { stdio: "pipe", maxBuffer: 1024 * 1024 * 1024 }
    );

    const hasChanged = result.stdout.toString().trim() !== "";

    if (hasChanged) {
      filesToUpdate.push(file);
    }
  }

  return filesToUpdate;
};

export const update = async (options: { from?: string; to?: string }) => {
  try {
    intro("Let's update your next-forge project!");

    const cwd = process.cwd();
    const availableVersions = await getAvailableVersions();
    let currentVersion = await getCurrentVersion();

    if (currentVersion && !availableVersions.includes(currentVersion)) {
      currentVersion = undefined;
    }

    const fromVersion =
      options.from ||
      (await selectVersion("from", availableVersions, currentVersion));

    if (fromVersion === availableVersions[0]) {
      outro("You are already on the latest version!");
      return;
    }

    const upgradeableVersions = availableVersions.filter(
      (v) => compareVersions(v, fromVersion) > 0
    );

    const [nextVersion] = upgradeableVersions;

    const toVersion =
      options.to ||
      (await selectVersion("to", upgradeableVersions, nextVersion));

    const from = `v${fromVersion}`;
    const to = `v${toVersion}`;

    const s = spinner();

    s.start(`Preparing to update from ${from} to ${to}...`);

    s.message("Creating temporary directory...");
    await createTemporaryDirectory(tempDirName);

    s.message("Cloning next-forge...");
    cloneRepository(tempDirName);

    s.message("Moving into repository...");
    process.chdir(tempDirName);

    s.message(`Getting files from version ${from}...`);
    const fromFiles = getFiles(from);

    s.message(`Getting files from version ${to}...`);
    const toFiles = getFiles(to);

    s.message(`Computing diff between versions ${from} and ${to}...`);
    const diff = getDiff(
      {
        version: from,
        files: fromFiles,
      },
      {
        version: to,
        files: toFiles,
      }
    );

    s.message("Moving back to original directory...");
    process.chdir(cwd);

    s.message(`Updating ${diff.length} files...`);
    await updateFiles(diff);

    s.message("Cleaning up...");
    await deleteTemporaryDirectory();

    s.stop(`Successfully updated project from ${from} to ${to}!`);

    outro("Please review and test the changes carefully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`;

    log.error(`Failed to update project: ${message}`);
    process.exit(1);
  }
};
