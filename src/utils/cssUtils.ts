import classNames from "classnames";
import Utils from "./utils";
import StyleConstants from "../constants/styleConstants";

type Modifiers = string[] | Record<string, unknown>;

export default class CssUtils {
  /**
   * Merges specified modifiers with the base class, according to the BEM methodology
   * You can use different cases (modifier separator is shown as default ('--'):
   *
   * Case 1. One BEM block, several modifiers:
   * ('button', ['bold', 'text']) => 'button button--bold button--text'
   *
   * Case 2. One BEM block+modifier, several modifiers:
   * ('header__title', ['bold', 'text']) => 'header__title header__title--bold header__title--text'
   *
   * You can also use object of modifiers instead of an array, for sure.
   */
  static mergeModifiers(baseClass: string, modifiers?: Modifiers): string {
    if (baseClass == null) return "";
    if (modifiers == null || !Utils.isObject(modifiers)) return baseClass;

    let result = baseClass;

    classNames(modifiers)
      .split(" ")
      .forEach((modifier: string) => {
        if (!modifier) return;
        result += ` ${baseClass}--${modifier}`;
      });

    return result;
  }

  /**
   * ('button', 'header') => 'button header__button'
   *
   * ('button', null) => 'button'
   *
   * ('button', 'header', ['small']) => 'button button--small header__button'
   *
   * ('button', null, ['small']) => 'button button--small'
   *
   * ('button', null, null) => 'button'
   */
  static mixClasses(baseClass: string, mixedClass?: string, modifiers?: Modifiers): string {
    if (baseClass == null) return "";
    if (mixedClass == null) {
      if (modifiers == null) {
        return baseClass;
      }
      return this.mergeModifiers(baseClass, modifiers);
    }

    const baseWithModifiers = this.mergeModifiers(baseClass, modifiers);

    return `${baseWithModifiers} ${mixedClass}__${baseClass}`;
  }

  /**
   * Calculates rem value based on provided number of pixels and context (default font size by def.)
   * @param pixels {number}
   * @param context {number}
   * @returns {string}
   */
  static rem(pixels: number, context = StyleConstants.sizes.defaultFontSize): string {
    return `${pixels / context}rem`;
  }
}
