"use client";

import { Player, PlayerRef } from "@remotion/player";
import { useRef } from "react";
import { JourneyVideo } from "@/remotion/JourneyVideo";

export default function RemotionPlayer() {
  const playerRef = useRef<PlayerRef>(null);

  return (
    <div className="aspect-video bg-void relative">
      <Player
        ref={playerRef}
        component={JourneyVideo}
        inputProps={{}}
        durationInFrames={1155}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        style={{
          width: "100%",
          height: "100%",
        }}
        controls
        autoPlay={false}
        loop
      />
    </div>
  );
}
