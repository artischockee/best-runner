import React from "react";
import { useSelector } from "react-redux";
import TrainingTypesSelectors from "../../store/selectors/trainingTypesSelectors";
import { TrainingTypesReducerState } from "../../store/reducers/trainingTypesReducer";
import DictionariesUtils from "../../utils/dictionariesUtils";

export default class RecordRowHooks {
  static useTrainingTypes(): [
    TrainingTypesReducerState,
    ((id: number | string) => string | null)
  ] {
    const trainingTypes = useSelector(TrainingTypesSelectors.trainingTypes);

    const getTypeLabelById = React.useCallback((id: number | string) => {
      const typeEntry = trainingTypes.data.find((tt) => tt.id === id);
      if (typeEntry == null) return null;

      return DictionariesUtils.getTrainingTypeL10nKey(typeEntry.value);
    }, [trainingTypes]);

    return [trainingTypes, getTypeLabelById];
  }
}
