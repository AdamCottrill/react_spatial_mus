import React, { useState } from "react";

import ReactMapGL, { WebMercatorViewport, Popup } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export const PointMap = ({
  markers,
  height,
  width,
  popupInfo,
  setPopupInfo,
}) => {
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
      </ReactMapGL>
    </>
  );
};
