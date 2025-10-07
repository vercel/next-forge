"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const [svg, setSvg] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const currentChartRef = useRef<string>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    if (currentChartRef.current === chart || !container) {
      return;
    }

    currentChartRef.current = chart;

    async function renderChart() {
      const { default: mermaid } = await import("mermaid");

      try {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          fontFamily: "inherit",
          themeCSS: "margin: 1.5rem auto 0;",
          theme: resolvedTheme === "dark" ? "dark" : "default",
        });
        const { svg, bindFunctions } = await mermaid.render(
          id,
          chart.replaceAll("\\n", "\n")
        );

        bindFunctions?.(container as Element);
        setSvg(svg);
      } catch (_error) {}
    }

    renderChart();
  }, [chart, id, resolvedTheme]);

  return <div dangerouslySetInnerHTML={{ __html: svg }} ref={containerRef} />;
}
