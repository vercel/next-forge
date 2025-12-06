"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

type VideoProps = ComponentProps<typeof ReactPlayer> & {
  aspectRatio: string;
};

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-black" />,
});

export const Video = ({ aspectRatio, ...props }: VideoProps) => (
  <div className="relative w-full" style={{ aspectRatio }}>
    <ReactPlayer
      {...props}
      height="100%"
      style={{
        position: "absolute",
      }}
      width="100%"
    />
  </div>
);
