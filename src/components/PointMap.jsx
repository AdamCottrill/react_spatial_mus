import React, { useState } from "react";

import ReactMapGL, {
  WebMercatorViewport,
  Popup,
  NavigationControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export const PointMap = ({
  markers,
  height,
  width,
  popupInfo,
  setPopupInfo,
}) => {
  const navStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
  };

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

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {markers}

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.dd_lon}
            latitude={popupInfo.dd_lat}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <div>
              {popupInfo.space} - {popupInfo.space_des}
            </div>
          </Popup>
        )}

        <Source type="geojson" data={pt}>
          <Layer {...pointLayer} />
        </Source>

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </>
  );
};
