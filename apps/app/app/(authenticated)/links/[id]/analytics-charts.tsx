"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsChartsProps {
  stats: {
    countries: { country: string | null; count: number }[];
    devices: { device: string | null; count: number }[];
    browsers: { browser: string | null; count: number }[];
  };
}

export function AnalyticsCharts({ stats }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Countries Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Clicks by Country</CardTitle>
          <CardDescription>Geographic distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.countries.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Devices Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Clicks by Device</CardTitle>
          <CardDescription>Device type breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.devices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Browsers Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Clicks by Browser</CardTitle>
          <CardDescription>Browser usage statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.browsers.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="browser" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
