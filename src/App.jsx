import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { StateMachineProvider, createStore } from "little-state-machine";
import "./App.css";

import { Map } from "./components/Map";
import { SideBar } from "./components/SideBar";
import { SampleTable } from "./components/SampleTable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //refetchOnMount: false,
      refetchInterval: Infinity,
    },
  },
});

createStore({
  mu_type: "qma",
});

function App() {
  return (
    <StateMachineProvider>
      <QueryClientProvider client={queryClient}>
        <div className="row my-3">
          <h1>Spatial Management Units</h1>
        </div>
        <div className="row">
          <div className="col-md-3">
            <h3>SideBar</h3>
            <SideBar />
          </div>
          <div className="col-md-9">
            <Map />
            <SampleTable />
          </div>
        </div>
      </QueryClientProvider>
    </StateMachineProvider>
  );
}

export default App;
