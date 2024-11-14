import { setNested } from '@specui/utils';
import { type LanguageModelV1, streamText } from 'ai';
import { parse, stringify } from 'yaml';

import { systemPrompt } from '../prompts/system';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function stream(
  ai: LanguageModelV1,
  prompt: string,
  spec: any,
  specFilePath = join(process.cwd(), '.specui', 'spec.yml'),
) {
  // Call the AI API to generate the spec and stream the response
  const { textStream } = await streamText({
    model: ai,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `
  Given the following YAML, please provide the necessary changes in the form of paths and their corresponding values. Each path should be an array representing the path to the element in the YAML structure, and the value should be the new value to be set at that path. If a value needs to be deleted, return \`"<<<undefined>>>"\` for that value.
  
  Return the changes as a YAML array of objects, each with two fields:
  - "path": an array representing the path to the element.
  - "value": the new value to be set at the specified path.
  
  Do not return the full YAML, only the paths and values for the changes.
  
  The prompt: ${prompt}
  
  ${spec ? `The existing YAML:\n\n${stringify(spec)}` : ''}
  
  Sample Output:
  - path: ["name"]
    value: updated name
  - path: ["components", "header", "elements", 0, "class"]
    value: ["bg-green-500", "p-4", "flex", "justify-between"]
  `,
      },
    ],
  });

  // Process the stream incrementally
  let accumulatedResponse = '';

  for await (const textPart of textStream) {
    accumulatedResponse += textPart
      .replace('```yaml', '')
      .replace('yaml', '')
      .replace('```json', '')
      .replace('json', '')
      .replace('```', '');

    try {
      // Parse the incremental changes from the current response
      const changes = parse(accumulatedResponse);

      // Apply the changes using the setNested function
      for (const change of changes) {
        const { path, value } = change;
        setNested(spec ?? {}, path, value);
      }

      // Convert the updated YAML object back to a YAML string
      const updatedYaml = stringify(spec ?? {});

      // Write the updated YAML back to the file after each change
      await writeFile(specFilePath, updatedYaml, 'utf8');
    } catch (e) {
      // Ignore errors during partial parsing, as the full data might not have arrived yet
    }
  }

  // Once the stream has fully ended, update the final YAML
  const finalYaml = stringify(spec);
  await writeFile(
    specFilePath,
    `# yaml-language-server: $schema=./schema.json\n${finalYaml}`,
    'utf8',
  );
}
