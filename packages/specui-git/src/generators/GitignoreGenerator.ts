import { IGenerator, generate } from '@specui/core';
import { HandlebarsEngine } from '@specui/handlebars';

import { IGitignoreSpec } from '../interfaces/IGitignoreSpec';
import { GitignoreSchema } from '../schemas/GitignoreSchema';
import template from '../templates/gitignore.hbs';

export const GitignoreGenerator: IGenerator<IGitignoreSpec> = (spec) =>
  generate({
    engine: HandlebarsEngine,
    schema: GitignoreSchema,
    spec,
    template,
  });
