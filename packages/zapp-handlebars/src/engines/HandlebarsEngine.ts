import { IEngine } from '@zappjs/core';
import * as changeCase from 'change-case';
import { compile, registerHelper, HelperOptions } from 'handlebars';
import { plural, singular } from 'pluralize';

registerHelper(
  'case',
  (
    str: string,
    casing: 'camel'
      | 'constant'
      | 'dot'
      | 'header'
      | 'lower'
      | 'lcFirst'
      | 'no'
      | 'param'
      | 'pascal'
      | 'path'
      | 'sentence'
      | 'snake'
      | 'swap'
      | 'title'
      | 'upper'
      | 'ucFirst',
    opts: HelperOptions
  ) => {
    if (!changeCase[casing]) {
      throw new Error(`Unknown casing: ${casing}`);
    }
    return changeCase[casing](str);
  }
);

registerHelper('plural', (str: string, opts: HelperOptions) => plural(str));

registerHelper('singular', (str: string, opts: HelperOptions) => singular(str));

export const HandlebarsEngine: IEngine = (spec = {}, template = '') => {
  return compile(template)(spec);
};
