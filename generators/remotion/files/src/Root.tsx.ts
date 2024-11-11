import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

import { Spec } from '../../interfaces/Spec';

export default async function RootGenerator(spec: Spec) {
  return await generate({
    processor: PrettierProcessor(),
    template: /* ts */ `
      import './tailwind.css';
      import { Composition } from "remotion";
      ${Object.keys(spec.compositions || {})
        .map(
          (composition) =>
            `import { Composition as ${composition} } from './compositions/${composition}'`,
        )
        .join(';')}
      
      export const RemotionRoot: React.FC = () => {
        return (
          <>
            ${Object.entries(spec.compositions || {}).map(
              ([name, composition]) => /* js */ `
              <Composition
                id="${name}"
                component={${name}}
                durationInFrames={${composition.durationInFrames ?? 150}}
                fps={${composition.fps ?? 60}}
                width={${composition.width ?? 1920}}
                height={${composition.height ?? 1080}}
              />
            `,
            )}
          </>
        );
      };
    
    `,
  });
}
