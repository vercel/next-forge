import { copyFile, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  cancel,
  intro,
  isCancel,
  log,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";
import {
  detectPackageManager,
  installDependencies as nypmInstallDependencies,
  type PackageManagerName,
} from "nypm";
import {
  internalContentDirs,
  internalContentFiles,
  run,
  url,
} from "./utils.js";

const supportedPackageManagers: PackageManagerName[] = [
  "bun",
  "npm",
  "yarn",
  "pnpm",
];

const cloneNextForge = (
  name: string,
  packageManager: PackageManagerName,
  branch?: string
) => {
  const exampleUrl = branch ? `${url}/tree/${branch}` : url;

  run("npx", [
    "create-next-app@latest",
    name,
    "--example",
    exampleUrl,
    "--disable-git",
    "--skip-install",
    `--use-${packageManager}`,
  ]);
};

const deleteInternalContent = async () => {
  for (const folder of internalContentDirs) {
    await rm(folder, { recursive: true, force: true });
  }

  for (const file of internalContentFiles) {
    await rm(file, { force: true });
  }
};

const installDependencies = async (packageManager: PackageManagerName) => {
  await nypmInstallDependencies({
    packageManager: { name: packageManager, command: packageManager },
    silent: true,
  });
};

const initializeGit = () => {
  run("git", ["init"]);
  run("git", ["add", "."]);
  run("git", ["commit", "-m", "✨ Initial commit"]);
};

const setupEnvironmentVariables = async () => {
  const files = [
    { source: join("apps", "api"), target: ".env.local" },
    { source: join("apps", "app"), target: ".env.local" },
    { source: join("apps", "web"), target: ".env.local" },
    { source: join("packages", "cms"), target: ".env.local" },
    { source: join("packages", "database"), target: ".env" },
    { source: join("packages", "internationalization"), target: ".env.local" },
  ];

  for (const { source, target } of files) {
    await copyFile(join(source, ".env.example"), join(source, target));
  }
};

const setupOrm = (packageManager: PackageManagerName) => {
  const filterCommand = packageManager === "npm" ? "--workspace" : "--filter";

  run(packageManager, ["run", "build", filterCommand, "@repo/database"]);
};

const updatePackageManagerConfiguration = async (
  projectDir: string,
  packageManager: PackageManagerName
) => {
  const packageJsonPath = join(projectDir, "package.json");
  const packageJsonFile = await readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonFile);

  if (packageManager === "pnpm") {
    packageJson.packageManager = "pnpm@10.31.0";
  } else if (packageManager === "npm") {
    packageJson.packageManager = "npm@10.8.1";
  } else if (packageManager === "yarn") {
    packageJson.packageManager = "yarn@1.22.22";
  }

  const newPackageJson = JSON.stringify(packageJson, null, 2);

  await writeFile(packageJsonPath, `${newPackageJson}\n`);
};

const updateWorkspaceConfiguration = async (
  projectDir: string,
  packageManager: PackageManagerName
) => {
  const packageJsonPath = join(projectDir, "package.json");
  const packageJsonFile = await readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonFile);

  if (packageManager === "pnpm") {
    packageJson.workspaces = undefined;
    const pnpmWorkspace = "packages:\n  - 'apps/*'\n  - 'packages/*'\n";
    await writeFile(join(projectDir, "pnpm-workspace.yaml"), pnpmWorkspace);
  }

  const newPackageJson = JSON.stringify(packageJson, null, 2);

  await writeFile(packageJsonPath, `${newPackageJson}\n`);

  await rm("bun.lock", { force: true });
};

const updateInternalPackageDependencies = async (path: string) => {
  const pkgJsonFile = await readFile(path, "utf8");
  const pkgJson = JSON.parse(pkgJsonFile);

  if (pkgJson.dependencies) {
    const entries = Object.entries(pkgJson.dependencies);

    for (const [dep, version] of entries) {
      if (version === "workspace:*") {
        pkgJson.dependencies[dep] = "*";
      }
    }
  }

  if (pkgJson.devDependencies) {
    const entries = Object.entries(pkgJson.devDependencies);

    for (const [dep, version] of entries) {
      if (version === "workspace:*") {
        pkgJson.devDependencies[dep] = "*";
      }
    }
  }

  const newPkgJson = JSON.stringify(pkgJson, null, 2);

  await writeFile(path, `${newPkgJson}\n`);
};

const updateInternalDependencies = async (projectDir: string) => {
  const rootPackageJsonPath = join(projectDir, "package.json");
  await updateInternalPackageDependencies(rootPackageJsonPath);

  const workspaceDirs = ["apps", "packages"];

  for (const dir of workspaceDirs) {
    const dirPath = join(projectDir, dir);
    const packages = await readdir(dirPath);

    for (const pkg of packages) {
      const path = join(dirPath, pkg, "package.json");
      await updateInternalPackageDependencies(path);
    }
  }
};

const getName = async () => {
  const value = await text({
    message: "What is your project named?",
    placeholder: "my-app",
    validate(value: string) {
      if (value.length === 0) {
        return "Please enter a project name.";
      }
    },
  });

  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return value.toString();
};

const getPackageManager = async (): Promise<PackageManagerName> => {
  const detected = await detectPackageManager(process.cwd());

  if (detected) {
    return detected.name;
  }

  const value = await select({
    message: "Which package manager would you like to use?",
    options: supportedPackageManagers.map((choice) => ({
      value: choice,
      label: choice,
    })),
    initialValue: "bun" as PackageManagerName,
  });

  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return value as PackageManagerName;
};

export const initialize = async (options: {
  name?: string;
  packageManager?: PackageManagerName;
  disableGit?: boolean;
  branch?: string;
}) => {
  try {
    intro("Let's start a next-forge project!");

    const cwd = process.cwd();
    const name = options.name || (await getName());
    const packageManager =
      options.packageManager || (await getPackageManager());

    if (!supportedPackageManagers.includes(packageManager)) {
      throw new Error("Invalid package manager");
    }

    const s = spinner();
    const projectDir = join(cwd, name);

    s.start("Cloning next-forge...");
    cloneNextForge(name, packageManager, options.branch);

    s.message("Moving into repository...");
    process.chdir(projectDir);

    if (packageManager !== "bun") {
      s.message("Updating package manager configuration...");
      await updatePackageManagerConfiguration(projectDir, packageManager);

      s.message("Updating workspace config...");
      await updateWorkspaceConfiguration(projectDir, packageManager);

      if (packageManager !== "pnpm") {
        s.message("Updating workspace dependencies...");
        await updateInternalDependencies(projectDir);
      }
    }

    s.message("Setting up environment variable files...");
    await setupEnvironmentVariables();

    s.message("Deleting internal content...");
    await deleteInternalContent();

    s.message("Installing dependencies...");
    await installDependencies(packageManager);

    s.message("Setting up ORM...");
    setupOrm(packageManager);

    if (!options.disableGit) {
      s.message("Initializing Git repository...");
      initializeGit();
    }

    s.stop("Project initialized successfully!");

    outro(
      "Please make sure you install the Mintlify CLI and Stripe CLI before starting the project."
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : `Failed to initialize project: ${error}`;

    log.error(message);
    process.exit(1);
  }
};
