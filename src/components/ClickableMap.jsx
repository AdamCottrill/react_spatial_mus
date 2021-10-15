import React, { useState } from "react";

import ReactMapGL, {
  WebMercatorViewport,
  NavigationControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { MyMarker } from "./MyMarker";

export const ClickableMap = ({ point, setPoint }) => {
  const navStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
  };

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

  const marker = (point) => {
    const [lon, lat] = point;
    if (lon && lat) {
      //const [cx, cy] = project([lon, lat]);
      return <MyMarker lon={lon} lat={lat} onClick={() => {}} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <h5>Please select a point.</h5>
      <ReactMapGL
        {...viewport}
        onClick={(e) => setPoint(e.lngLat)}
        mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {marker(point)}
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </>
  );
};
