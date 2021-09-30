import * as React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import { WebMercatorViewport } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export const Map = () => {
  const defaults = new WebMercatorViewport({
    width: 1000,
    height: 800,
  }).fitBounds(
    [
      [-84.7395009724404, 43.0008239366142],
      [-79.6546709677048, 46.3322449429032],
    ],
    {
      padding: 10,
    }
  );

  const [viewport, setViewport] = useState(defaults);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
};
