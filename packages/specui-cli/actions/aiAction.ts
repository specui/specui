import { getAi, stream } from '@specui/ai';

import { askQuestion } from '../utils/askQuestion';
import { loadSpec } from '../utils/loadSpec';
import { generate } from './generateAction';

export async function aiAction(options: { delete?: boolean; force?: boolean; message?: string }) {
  if (!options.message) {
    while (true) {
      const message = await askQuestion('> ');

      const ai = await getAi(process.env.OPEN_AI_API_KEY, 'openAi', 'gpt-4o-mini');
      const loadedSpec = await loadSpec();

      await stream(ai, message, loadedSpec?.spec);

      await generate({
        delete: options.delete,
        force: options.force,
      });
    }
  }

  const ai = await getAi(process.env.OPEN_AI_API_KEY, 'openAi', 'gpt-4o-mini');
  const loadedSpec = await loadSpec();

  await stream(ai, options.message, loadedSpec?.spec);

  await generate({
    delete: options.delete,
    force: options.force,
  });
}
