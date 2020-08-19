import React from "react";
import RouterPaths from "../../constants/routerPaths";

export declare namespace Router {
  type RouteComponent =
    | React.LazyExoticComponent<any>
    | ((props: RouteComponentProps) => React.ReactElement);

  interface Route {
    path: string;
    component: RouteComponent;
    settings: RouteSettings;
    componentSettings: ComponentSettings;
    subRoutes?: Route[];
  }

  interface RouteSettings {
    exact: boolean;
    isPrivate: boolean;
  }

  interface ComponentSettings {
    usePageWrapper: boolean;
    useHeader: boolean;
  }

  type RouterPathsKey = keyof typeof RouterPaths;

  type RouteParams = Record<string, any>;

  interface RouteComponentProps {
    subRoutes?: Route[];
  }
}
