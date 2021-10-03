import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { WebMercatorViewport } from "react-map-gl";
import { useQuery } from "react-query";
import { useStateMachine } from "little-state-machine";

import { getSamples } from "../services/api";
import { Spinner } from "./Spinner";
import { Alert } from "./Alert";

import { colours } from "../colours";

import "mapbox-gl/dist/mapbox-gl.css";

export const Map = () => {
  const { state } = useStateMachine();
  const { mu_type } = state;

  const { isLoading, error, data } = useQuery(["samples", mu_type], () =>
    getSamples(mu_type)
  );

  let markers = [];
  // Only rerender markers if props.data has changed
  if (data) {
    const distinct = {};
    data.forEach((sam) => {
      const pt = `${sam.dd_lat.toFixed(3)}-${sam.dd_lon.toFixed(3)}`;
      distinct[pt] = { dd_lat: sam.dd_lat, dd_lon: sam.dd_lon, mu: sam.area };
    });

    const mus = [...new Set(data.map((x) => x.area))];

    // create an object that will map unique mu's to fill color
    const fillMap = {};
    mus.forEach((x, i) => {
      fillMap[x] = x ? colours[i % colours.length] : "#ffffff";
    });

    // for (const [key, val] of Object.entries(distinct)) {
    //   markers.push(
    //     <Marker key={key} longitude={val.dd_lon} latitude={val.dd_lat}>
    //       <div>
    //         <svg>
    //           <circle
    //             cx="5"
    //             cy="5"
    //             r="5"
    //             fill={fillMap[val.mu]}
    //             stroke="black"
    //             opacity="0.3"
    //           />
    //         </svg>
    //       </div>
    //     </Marker>
    //   );
    // }

    markers = data.map((x) => (
      <Marker key={x.slug} longitude={x.dd_lon} latitude={x.dd_lat}>
        <div>
          <svg>
            <circle
              cx="5"
              cy="5"
              r="5"
              fill={fillMap[x.area]}
              stroke="black"
              opacity="0.3"
            />
          </svg>
        </div>
      </Marker>
    ));
  }

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
    >
      {data && markers}
    </ReactMapGL>
  );
};
