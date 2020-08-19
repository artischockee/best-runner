import React from "react";
import { Route as ReactRouterRoute, Switch } from "react-router-dom";
import { Router } from "../../services/router/types";
import LayoutBuilder from "../layoutBuilder";
import AppHooks from "./AppHooks";

interface Props {
  routes: Router.Route[];
}

export default function App(props: Props) {
  AppHooks.useConsoleReport();

  return (
    <Switch>
      {props.routes.map((route) => {
        // const Route = route.settings.isPrivate ? null : ReactRouterRoute; // TODO: 'PrivateRoute' instead of 'null'
        return (
          <ReactRouterRoute
            key={route.path}
            path={route.path}
            exact={route.settings.exact}
            render={() => (
              <LayoutBuilder
                component={route.component}
                subRoutes={route.subRoutes}
                componentSettings={route.componentSettings}
              />
            )}
          />
        );
      })}
    </Switch>
  );
}
