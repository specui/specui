import { IEngine } from '@specui/core';
import * as changeCase from 'change-case';
import Handlebars from 'handlebars/dist/handlebars';
import { plural, singular } from 'pluralize';

Handlebars.registerHelper(
  'case',
  (
    str: string,
    casing:
      | 'camelCase'
      | 'constantCase'
      | 'dotCase'
      | 'noCase'
      | 'pascalCase'
      | 'pathCase'
      | 'sentenceCase'
      | 'snakeCase',
    opts: Handlebars.HelperOptions,
  ) => {
    // if (!changeCase[casing]) {
    //   throw new Error(`Unknown casing: ${casing}`);
    // }
    // return changeCase[casing](str);
    return str;
  },
);

Handlebars.registerHelper('plural', (str: string, opts: Handlebars.HelperOptions) => plural(str));

Handlebars.registerHelper('singular', (str: string, opts: Handlebars.HelperOptions) =>
  singular(str),
);

export const HandlebarsEngine: IEngine = (spec = {}, template = '') => {
  return Handlebars.compile(template)(spec);
};
