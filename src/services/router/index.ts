import history from "./history";
import { Router as RouterTypes } from "./types";
import RouterUtils from "../../utils/routerUtils";
import { UtilTypes } from "../../types/utilTypes";

export default class Router {
  static navigateTo(
    path: RouterTypes.RouterPathsKey,
    params?: Partial<RouterTypes.RouteParams>,
    searchParams?: UtilTypes.SearchParams
  ) {
    const processedPath = RouterUtils.getProcessedPath(path, params);
    const processedSearch = RouterUtils.getProcessedSearch(searchParams);

    history.push({
      pathname: processedPath,
      search: processedSearch,
    });
  }

  static appendSearchQuery(searchParams: UtilTypes.SearchParams) {
    const processedSearch = RouterUtils.getProcessedSearch(searchParams);

    history.push({ search: processedSearch });
  }

  static goBack() {
    history.back();
  }
}
