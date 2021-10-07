import * as React from "react";
import { useState } from "react";
import ReactMapGL, { WebMercatorViewport, SVGOverlay } from "react-map-gl";
import { useQuery } from "react-query";
import { useStateMachine } from "little-state-machine";

import { getSamples } from "../services/api";
import { Spinner } from "./Spinner";
import { Alert } from "./Alert";

import { colours } from "../colours";

import "mapbox-gl/dist/mapbox-gl.css";

export const Map = () => {
  const { state } = useStateMachine();
  const { mu_type, year } = state;

  const { isLoading, error, data } = useQuery(["samples", mu_type], () =>
    getSamples(mu_type, year)
  );

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

  const useDistinctQuery = () =>
    useQuery(["samples", mu_type, year], () => getSamples(mu_type, year), {
      select: React.useCallback((data) => {
        const distinct = {};
        data.forEach((sam) => {
          const pt = `${sam.dd_lat.toFixed(3)}-${sam.dd_lon.toFixed(3)}`;
          distinct[pt] = {
            dd_lat: sam.dd_lat,
            dd_lon: sam.dd_lon,
            mu: sam.area,
          };
        });
        return distinct;
      }, []),
    });

  const pts = useDistinctQuery();

  function redraw({ project }) {
    let myMarkers = [];
    let mus2 = [];
    const fillMap = {};

    if (pts.data) {
      let tmp = [];
      for (const [key, val] of Object.entries(pts.data)) {
        tmp.push(val.mu);
      }
      mus2 = [...new Set(tmp)];

      mus2.forEach((x, i) => {
        fillMap[x] = x ? colours[i % colours.length] : "#ffffff";
      });

      for (const [key, val] of Object.entries(pts.data)) {
        const [cx, cy] = project([val.dd_lon, val.dd_lat]);

        myMarkers.push(
          <circle
            key={key}
            cx={cx}
            cy={cy}
            r={4}
            stroke="black"
            opacity="0.3"
            fill={fillMap[val.mu]}
          />
        );
      }
    }
    return myMarkers;
  }

  return (
    <ReactMapGL
      {...viewport}
      //onClick={(e) => console.log("e.lngLat = ", e.lngLat)}
      mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <SVGOverlay redraw={redraw} />
    </ReactMapGL>
  );
};
