import React from "react";
import LocalStorage from "../../services/storage/localStorage";
import LocaleConstants from "../../constants/localeConstants";
import { AppContext as AppContextModule } from "./types";

interface BaseAppContext {
  data: AppContextModule.State;
  dispatch: React.Dispatch<AppContextModule.Action>;
}

export const AppContextDefaultValue = {
  locale: LocalStorage.locale.get() || LocaleConstants.defaultLocale,
};

const AppContext = React.createContext<BaseAppContext>({
  data: {
    ...AppContextDefaultValue,
  },
  dispatch: () => console.log("TODO: Empty dispatch"),
});

export default AppContext;
