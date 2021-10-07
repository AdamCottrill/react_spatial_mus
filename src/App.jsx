import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { StateMachineProvider, createStore } from "little-state-machine";
import "./App.css";

import { MapPage } from "./pages/Map";
import { Samples } from "./pages/Samples";
import { MapModal } from "./pages/MapModal";

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
  year: 2010,
  mu_type: "qma",
});

function App() {
  return (
    <StateMachineProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="row my-3 px-3">
            <div className="col-md-8">
              <h1>Spatial Management Units</h1>
            </div>
            <div className="col-md-4 d-flex justify-content-around">
              <Link to="/">Map</Link>
              <Link to="/samples">Samples</Link>
              <Link to="/modal">Modal Map</Link>
            </div>
          </div>
          <Switch>
            <Route path="/samples">
              <Samples />
            </Route>
            <Route path="/modal">
              <MapModal />
            </Route>
            <Route path="/">
              <MapPage />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </StateMachineProvider>
  );
}

export default App;
