export default class DictionariesUtils {
  static getTrainingTypeL10nKey(value: string) {
    return value;

    // FIXME: can't use localiser.l() because of issues
    // return `dictionaries/trainingTypes/${value}`;
  }
}
