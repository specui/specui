import { IGenerator, generate } from '@zappjs/core';
import { HandlebarsEngine } from '@zappjs/handlebars';

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
