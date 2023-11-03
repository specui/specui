import { IProcessor } from '@zappjs/core';
import * as babelPlugin from 'prettier/plugins/babel';
import * as postcssPlugin from 'prettier/plugins/postcss';
import * as estreePlugin from 'prettier/plugins/estree';
import * as htmlPlugin from 'prettier/plugins/html';
import * as markdownPlugin from 'prettier/plugins/markdown';
import * as typescriptPlugin from 'prettier/plugins/typescript';
import { format } from 'prettier/standalone';

export const PrettierProcessor: IProcessor<any> = (options) => {
  return async (input: string) => {
    const output = format(input, {
      parser: 'babel-ts',
      plugins: [
        babelPlugin,
        estreePlugin,
        htmlPlugin,
        markdownPlugin,
        postcssPlugin,
        typescriptPlugin,
      ],
      printWidth: 100,
      singleQuote: true,
      tabWidth: 2,
      useTabs: false,
      ...options,
    });
    return output;
  };
};
