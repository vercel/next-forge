"use client";

import { createLink } from "@/app/actions/links";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import { handleError } from "@repo/design-system/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function CreateLinkForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createLink({
        destination,
        slug: slug || undefined,
        title: title || undefined,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Link created successfully!");
        router.push(`/links/${result.link?.id}`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Short Link</CardTitle>
        <CardDescription>
          Create a new short link with an optional custom slug
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination URL *</Label>
            <Input
              id="destination"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              The URL you want to shorten
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Custom Slug (optional)</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                localhost:3000/
              </span>
              <Input
                id="slug"
                type="text"
                placeholder="my-link"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                }
                pattern="[a-z0-9-]+"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Leave empty to generate a random slug
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              type="text"
              placeholder="My Campaign Link"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              A friendly name to identify this link
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Link
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
