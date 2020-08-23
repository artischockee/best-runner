import React from "react";
import { Provider } from 'react-redux';
import { Router } from "react-router-dom";
import { Redux } from "../store/types";
import history from "../services/router/history";
import Routes from "../services/router/config";
import App from "./app";

interface Props {
  store: Redux.ApplicationStore;
}

export default function Root(props: Props) {
  return (
    <Provider store={props.store}>
      <Router history={history}>
        <App routes={Routes} />
      </Router>
    </Provider>
  );
}
