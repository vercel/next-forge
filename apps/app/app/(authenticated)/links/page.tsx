import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Link2, Plus, QrCode, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getLinks } from "@/app/actions/links";
import { Header } from "../components/header";

export const metadata = {
  title: "Links",
  description: "Manage your short links and QR codes",
};

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <>
      <Header page="Links" pages={["Dashboard"]}>
        <Button asChild>
          <Link href="/links/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Link
          </Link>
        </Button>
      </Header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {links.length === 0 ? (
          <Card className="flex min-h-[400px] flex-col items-center justify-center">
            <CardContent className="flex flex-col items-center gap-4 pt-6">
              <div className="rounded-full bg-muted p-4">
                <Link2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold">No links yet</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Create your first short link to get started
                </p>
                <Button asChild>
                  <Link href="/links/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Link
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <Link key={link.id} href={`/links/${link.id}`}>
                <Card className="transition-all hover:border-primary hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 overflow-hidden">
                        <CardTitle className="truncate text-lg">
                          {link.title || link.slug}
                        </CardTitle>
                        <CardDescription className="mt-1 truncate">
                          {link.destination}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <code className="rounded bg-muted px-2 py-1 text-xs">
                          {link.domain}/{link.slug}
                        </code>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {link._count.clicks} clicks
                        </div>
                        {link._count.qrCodes > 0 && (
                          <div className="flex items-center gap-1">
                            <QrCode className="h-3 w-3" />
                            {link._count.qrCodes} QR codes
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Created {new Date(link.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
