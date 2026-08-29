import { Composition } from "remotion";
import { JourneyVideo } from "./JourneyVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="JourneyThroughTime"
        component={JourneyVideo}
        durationInFrames={1155}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
