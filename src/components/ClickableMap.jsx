import React, { useState } from "react";

import ReactMapGL, { WebMercatorViewport, Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export const ClickableMap = ({ point, setPoint }) => {
  const wmViewport = new WebMercatorViewport({
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

  const [viewport, setViewport] = useState(wmViewport);

  const showCoordinates = (pt) => {
    const [lon, lat] = pt;
    if (lon && lat) {
      return (
        <>
          <ul>
            <li> Latitude: {lat.toFixed(3)}</li>
            <li> Longitude: {lon.toFixed(3)}</li>
          </ul>
        </>
      );
    } else {
      return <h5>Please select a point.</h5>;
    }
  };

  const marker = (point) => {
    const [lon, lat] = point;
    if (lon && lat) {
      //const [cx, cy] = project([lon, lat]);
      return (
        <Marker longitude={lon} latitude={lat}>
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
    } else {
      return null;
    }
  };

  return (
    <>
      {showCoordinates(point)}
      <ReactMapGL
        {...viewport}
        onClick={(e) => setPoint(e.lngLat)}
        mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {marker(point)}
      </ReactMapGL>
    </>
  );
};
