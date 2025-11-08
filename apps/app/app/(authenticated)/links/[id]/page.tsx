import { getLink, getLinkStats } from "@/app/actions/links";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Copy, ExternalLink, QrCode, Trash2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "../../components/header";
import { CopyButton } from "./copy-button";
import { DeleteButton } from "./delete-button";
import { QRCodeGenerator } from "./qr-code-generator";
import { StatsCards } from "./stats-cards";
import { AnalyticsCharts } from "./analytics-charts";

export default async function LinkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const link = await getLink(params.id);
  const stats = await getLinkStats(params.id, 30);

  if (!link || !stats) {
    notFound();
  }

  const shortUrl = `${link.domain}/r/${link.slug}`;

  return (
    <>
      <Header page={link.title || link.slug} pages={["Links", "Details"]}>
        <DeleteButton linkId={link.id} />
      </Header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Link Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Link Details</CardTitle>
            <CardDescription>Manage your short link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Short URL</label>
              <div className="mt-1 flex items-center gap-2">
                <code className="flex-1 rounded bg-muted px-3 py-2 text-sm">
                  {shortUrl}
                </code>
                <CopyButton text={`http://${shortUrl}`} />
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`http://${shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Destination</label>
              <div className="mt-1 flex items-center gap-2">
                <code className="flex-1 truncate rounded bg-muted px-3 py-2 text-sm">
                  {link.destination}
                </code>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={link.destination}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>{" "}
                {new Date(link.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="text-muted-foreground">Total Clicks:</span>{" "}
                {stats.totalClicks}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <StatsCards stats={stats} />

        {/* Analytics Charts */}
        <AnalyticsCharts stats={stats} />

        {/* QR Code Generator */}
        <QRCodeGenerator linkId={link.id} shortUrl={shortUrl} />
      </div>
    </>
  );
}
