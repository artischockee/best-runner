import "./index.scss";
import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import Root from "./components/Root";
import rootReducer from "./store/reducers/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
