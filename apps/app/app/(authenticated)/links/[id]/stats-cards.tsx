import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Globe, Monitor, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalClicks: number;
    countries: { country: string | null; count: number }[];
    devices: { device: string | null; count: number }[];
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const topCountry = stats.countries[0];
  const topDevice = stats.devices[0];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalClicks}</div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Country</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {topCountry?.country || "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">
            {topCountry ? `${topCountry.count} clicks` : "No data"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Device</CardTitle>
          <Monitor className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">
            {topDevice?.device || "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">
            {topDevice ? `${topDevice.count} clicks` : "No data"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
