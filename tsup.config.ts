import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["scripts/index.ts"],
  outDir: "dist",
  sourcemap: false,
  minify: true,
  dts: true,
  format: ["cjs", "esm"],
});
