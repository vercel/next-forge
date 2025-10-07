#!/usr/bin/env node

import { program } from "commander";
import { initialize } from "./initialize.js";
import { update } from "./update.js";

program
  .command("init")
  .description("Initialize a new next-forge project")
  .option("--name <name>", "Name of the project")
  .option(
    "--package-manager <manager>",
    "Package manager to use (npm, yarn, bun, pnpm)"
  )
  .option("--disable-git", "Disable git initialization")
  .action(initialize);

program
  .command("update")
  .description("Update the project from one version to another")
  .option("--from <version>", "Version to update from e.g. 1.0.0")
  .option("--to <version>", "Version to update to e.g. 2.0.0")
  .action(update);

program.parse(process.argv);
