import React, { useState } from "react";

import ReactMapGL, { WebMercatorViewport, Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export const PointMap = ({ points, height, width }) => {
  const wmViewport = new WebMercatorViewport({
    width: width,
    height: height,
  }).fitBounds(
    [
      [-84.7395009724404, 43.0008239366142],
      [-79.6546709677048, 46.3322449429032],
    ],
    {
      padding: 10,
    }
  );

  const [viewport, setViewport] = useState(wmViewport);

  const markers = (points) => {
    return points.map(([lon, lat]) => {
      return (
        <Marker key={`${lon}-${lat}`} longitude={lon} latitude={lat}>
          <svg width="12" height="14" transform="translate(-5,-11)">
            <circle
              cx={4}
              cy={4}
              r={4}
              opacity="0.5"
              stroke="black"
              fill="red"
            />
          </svg>
        </Marker>
      );
    });
  };

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {markers(points)}
      </ReactMapGL>
    </>
  );
};
