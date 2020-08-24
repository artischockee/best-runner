import { css, Global } from "@emotion/core";
import React from "react";
import { Route as ReactRouterRoute, Switch } from "react-router-dom";
import { Router } from "../../services/router/types";
import LayoutBuilder from "../layoutBuilder";
import AppHooks from "./AppHooks";
import StyleConstants from "../../constants/styleConstants";
import { useDispatch } from "react-redux";
import TrainingTypesActions from "../../store/actions/trainingTypesActions";

interface Props {
  routes: Router.Route[];
}

export default function App(props: Props) {
  const dispatch = useDispatch();

  AppHooks.useConsoleReport();

  React.useEffect(() => {
    dispatch(TrainingTypesActions.fetchTrainingTypes({ firstRequest: true }));
  }, []);

  function renderEmotionGlobals() {
    return (
      <Global
        styles={css`
          .btn-primary {
            background-color: ${StyleConstants.colors.accent};
            border-color: ${StyleConstants.colors.accent};

            outline: none;

            :hover,
            :focus {
              background-color: ${StyleConstants.colors.accentHover};
              border-color: ${StyleConstants.colors.accentHover};
            }

            :not(:disabled):not(.disabled):active {
              background-color: ${StyleConstants.colors.accentHover};
              border-color: ${StyleConstants.colors.accentHover};
            }

            :not(:disabled):not(.disabled):active:focus,
            :focus {
              box-shadow: 0 0 0 0.2rem ${StyleConstants.colors.accentShadow};
            }
          }
        `}
      />
    );
  }

  return (
    <React.Fragment>
      {renderEmotionGlobals()}
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
    </React.Fragment>
  );
}
