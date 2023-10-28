import { IGenerator, generate } from '@zappjs/core';
import { HandlebarsEngine } from '@zappjs/handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';

import { ILicenseSpec } from '../interfaces/ILicenseSpec';
import { LicenseSchema } from '../schemas/LicenseSchema';

export const LicenseGenerator: IGenerator<ILicenseSpec> = (spec) => {
  const templates = {
    'Apache-2.0': 'apache-2.hbs',
    'GPL-2.0-only': 'gpl-2.hbs',
    'GPL-3.0-only': 'gpl-3.hbs',
    ISC: 'isc.hbs',
    MIT: 'mit.hbs',
  };

  return generate({
    engine: HandlebarsEngine,
    schema: LicenseSchema,
    spec,
    template: readFileSync(
      join(__dirname, `../../src/templates/${templates[spec.license]}`),
      'utf8',
    ),
  });
};
