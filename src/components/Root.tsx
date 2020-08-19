import React from "react";
import { Router } from "react-router-dom";
import history from "../services/router/history";
import Routes from "../services/router/config";
import App from "./app";

export default function Root() {
  return (
    <Router history={history}>
      <App routes={Routes} />
    </Router>
  );
}
