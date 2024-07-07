import { IGenerator, generate } from '@specui/core';
import { HandlebarsEngine } from '@specui/handlebars';

import { ILicenseSpec } from '../interfaces/ILicenseSpec';
import { LicenseSchema } from '../schemas/LicenseSchema';

import apache2Template from '../templates/apache-2.hbs';
import gpl2Template from '../templates/gpl-2.hbs';
import gpl3Template from '../templates/gpl-3.hbs';
import iscTemplate from '../templates/isc.hbs';
import mitTemplate from '../templates/mit.hbs';

export const LicenseGenerator: IGenerator<ILicenseSpec> = (spec) => {
  const templates = {
    'Apache-2.0': apache2Template,
    'GPL-2.0-only': gpl2Template,
    'GPL-3.0-only': gpl3Template,
    ISC: iscTemplate,
    MIT: mitTemplate,
  };

  return generate({
    engine: HandlebarsEngine,
    schema: LicenseSchema,
    spec,
    template: templates[spec.license],
  });
};
