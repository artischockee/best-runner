import { Redux } from "../types";

export default class TrainingTypesSelectors {
  static trainingTypes = (state: Redux.RootState) => state.trainingTypes;
}
