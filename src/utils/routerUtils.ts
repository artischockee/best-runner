import CommonUtils from "./commonUtils";
import { Router } from "../services/router/types";
import { UtilTypes } from "../types/utilTypes";

export default class RouterUtils {
  /**
   * Processes specified page with format like '/:id', where 'id' is a
   * URL parameter that must be replaced with real value taken from 'params'
   */
  static getProcessedPath(
    path: Router.RouterPathsKey,
    params?: Partial<Router.RouteParams>
  ): string {
    if (params == null) return path as string;

    const regExp = /:([A-z]+)/g;

    const matches = CommonUtils.getAllMatchesByRegExp(regExp, path as string);

    if (matches.length === 0) return path as string;

    let formattedPath = path as string;

    matches.forEach((match) => {
      formattedPath = formattedPath.replace(match[0], params[match[1]]);
    });

    return formattedPath;
  }

  /**
   * Processes search params and returns a stringified version of URLSearchParams.
   *
   * Examples:
   *
   * ({ foo: 'bar' }) => 'foo=bar'
   * ({ foo: ['bar', 'baz'] }) => 'foo=bar&foo=baz'
   * ({ foo: 'bar', baz: ['oof', 'ofo'], bra: 'bra-bra' }) => 'foo=bar&baz=oof&baz=ofo&bra=bra-bra'
   */
  static getProcessedSearch(searchParams?: UtilTypes.SearchParams): string {
    if (searchParams == null) return "";

    const innerSearchParams: string[][] = [];

    Object.entries(searchParams).forEach((entry) => {
      const index = entry[0];
      const value = entry[1];

      if (Array.isArray(value)) {
        value.forEach((_value) => {
          innerSearchParams.push([index, _value]);
        });
      } else {
        innerSearchParams.push([index, value]);
      }
    });

    const urlSearchParams = new URLSearchParams(innerSearchParams);

    return urlSearchParams.toString();
  }
}
