import { IEngine } from '@zappjs/core';
import { safeDump } from 'js-yaml';

export const YamlEngine: IEngine = async (spec) => {
  return safeDump(spec, { noRefs: true, lineWidth: 250, skipInvalid: true });
}
