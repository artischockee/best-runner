import { lazy } from "react";
import { Router } from "./types";
import RouterPaths from "../../constants/routerPaths";

const IndexPage = lazy(() => import("../../pages/indexPage"));
const Page404 = lazy(() => import("../../pages/page404"));

const Routes: Router.Route[] = [
  {
    path: RouterPaths.indexPage,
    component: IndexPage,
    settings: {
      exact: true,
      isPrivate: false,
    },
    componentSettings: {
      usePageWrapper: true,
      useHeader: true,
    },
  },
  {
    path: RouterPaths.page404,
    component: Page404,
    settings: {
      exact: false,
      isPrivate: false,
    },
    componentSettings: {
      usePageWrapper: true,
      useHeader: true,
    },
  },
];

export default Routes;
