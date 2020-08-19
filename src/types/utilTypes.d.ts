import React from "react";

export declare namespace UtilTypes {
  type SearchParams = Record<string, string | string[]>;

  // TODO: remove to some new types file (e.g. reactHooks.d.ts)
  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
}
