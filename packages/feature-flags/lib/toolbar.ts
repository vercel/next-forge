import { withVercelToolbar } from "@vercel/toolbar/plugins/next";
import { keys } from "../keys";

export const withToolbar = (config: object) =>
  keys().FLAGS_SECRET ? withVercelToolbar()(config) : config;
