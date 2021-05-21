import React, { useEffect } from "react";
import Clappr from "clappr";
import PlaybackRatePlugin from "clappr-playback-rate-plugin";
import ClapprMarkersPlugin from "clappr-markers-plugin";

const ClapprComponent = ({ id, source, mute, height, width, autoPlay }) => {
  let clappr_player = null;

  useEffect(() => {
    clappr_player = new Clappr.Player({
      parentId: `#${id}`,
      source: source,
      mute,
      height,
      width,
      autoPlay,
      plugins: [PlaybackRatePlugin, ClapprMarkersPlugin],
      markersPlugin: {
        markers: [
          new ClapprMarkersPlugin.StandardMarker(0, "The beginning!"),
          new ClapprMarkersPlugin.StandardMarker(5, "Something interesting."),
          new ClapprMarkersPlugin.StandardMarker(9, "The conclusion."),
        ],
        tooltipBottomMargin: 17, // optional
      },
      playbackRateConfig: {
        defaultValue: 1,
        options: [
          { value: 0.5, label: "0.5x" },
          { value: 1, label: "1x" },
          { value: 2, label: "2x" },
        ],
        // rateSuffix: 'x',
      },
    });

    clappr_player.getPlugin("markers-plugin");

    return () => {
      clappr_player.destroy();
      clappr_player = null;
    };
  }, []);

  return (
    <div>
      <p id={id}></p>
    </div>
  );
};

export const Live = () => {
  return (
    <div>
      <ClapprComponent
        id="video"
        source="https://5dd3981940faa.streamlock.net:443/mystartuptv/mystartuptv/playlist.m3u8"
        height={500}
        width={1116}
        mute={true}
        autoPlay={true}
      />
    </div>
  );
};

export default Live;
