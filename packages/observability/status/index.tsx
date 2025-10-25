import "server-only";
import { keys } from "../keys";
import type { BetterStackResponse } from "./types";

const apiKey = keys().BETTERSTACK_API_KEY;
const url = keys().BETTERSTACK_URL;

export const Status = async () => {
  if (!(apiKey && url)) {
    return null;
  }

  let statusColor = "bg-muted-foreground";
  let statusLabel = "Unable to fetch status";

  try {
    const response = await fetch(
      "https://uptime.betterstack.com/api/v2/monitors",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch status");
    }

    const { data } = (await response.json()) as BetterStackResponse;

    const status =
      data.filter((monitor) => monitor.attributes.status === "up").length /
      data.length;

    if (status === 0) {
      statusColor = "bg-destructive";
      statusLabel = "Degraded performance";
    } else if (status < 1) {
      statusColor = "bg-warning";
      statusLabel = "Partial outage";
    } else {
      statusColor = "bg-success";
      statusLabel = "All systems normal";
    }
  } catch {
    statusColor = "bg-muted-foreground";
    statusLabel = "Unable to fetch status";
  }

  return (
    <a
      className="flex items-center gap-3 font-medium text-sm"
      href={url}
      rel="noreferrer"
      target="_blank"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusColor}`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${statusColor}`}
        />
      </span>
      <span className="text-muted-foreground">{statusLabel}</span>
    </a>
  );
};
