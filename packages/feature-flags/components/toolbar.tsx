import { VercelToolbar } from "@vercel/toolbar/next";
import { keys } from "../keys";

export const Toolbar = () => (keys().FLAGS_SECRET ? <VercelToolbar /> : null);
