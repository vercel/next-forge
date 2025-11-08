"use client";

import { createQRCode } from "@/app/actions/qr";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import { handleError } from "@repo/design-system/lib/utils";
import { Download, Loader2 } from "lucide-react";
import QRCodeLib from "qrcode";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface QRCodeGeneratorProps {
  linkId: string;
  shortUrl: string;
}

export function QRCodeGenerator({ linkId, shortUrl }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState("512");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [loading, setLoading] = useState(false);

  // Generate QR code preview
  useEffect(() => {
    if (!canvasRef.current) return;

    QRCodeLib.toCanvas(
      canvasRef.current,
      `http://${shortUrl}`,
      {
        width: parseInt(size),
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorLevel,
      },
      (error) => {
        if (error) console.error(error);
      }
    );
  }, [shortUrl, fgColor, bgColor, size, errorLevel]);

  async function handleDownload() {
    try {
      const dataUrl = await QRCodeLib.toDataURL(`http://${shortUrl}`, {
        width: parseInt(size),
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorLevel,
      });

      // Create download link
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `qr-${shortUrl.replace(/\//g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("QR code downloaded!");
    } catch (error) {
      handleError(error);
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      const result = await createQRCode({
        linkId,
        size: parseInt(size),
        fgColor,
        bgColor,
        errorLevel,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("QR code saved!");
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
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>
          Generate and customize QR codes for your link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Preview */}
          <div className="flex flex-col items-center gap-4">
            <canvas
              ref={canvasRef}
              className="rounded-lg border bg-white p-4"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save QR Code
              </Button>
            </div>
          </div>

          {/* Customization */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size (pixels)</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="256">256x256</SelectItem>
                  <SelectItem value="512">512x512</SelectItem>
                  <SelectItem value="1024">1024x1024</SelectItem>
                  <SelectItem value="2048">2048x2048</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="errorLevel">Error Correction</Label>
              <Select
                value={errorLevel}
                onValueChange={(v) => setErrorLevel(v as typeof errorLevel)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Higher levels allow more damage but increase QR size
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fgColor">Foreground Color</Label>
              <div className="flex gap-2">
                <Input
                  id="fgColor"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bgColor">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="bgColor"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
