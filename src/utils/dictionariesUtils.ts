export default class DictionariesUtils {
  static getTrainingTypeL10nKey(value: string) {
    // FIXME: can't use localiser.l() because of issues
    return `dictionaries/trainingTypes/${value}`;
  }
}
