import Localiser from "@artischocke/localiser";
import en from "../constants/localeResources/en.json";
import AppContext from "../contexts/app";

const localiser = Localiser.init({
  localeResources: {
    en: en as Record<string, string>,
  },
  context: AppContext,
  localeContextPath: "data.locale",
  defaultLocale: "en",
});

export default localiser;
