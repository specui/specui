import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';
import { kebabCase, pascalCase } from '@specui/utils';

import { AbsoluteFill, Composition, Sequence, Spec } from '../../../interfaces/Spec';

export function getDynamic(spec: Spec) {
  return Object.entries(spec.compositions || {}).map(([compositionName, composition]) => ({
    spec: composition,
    params: {
      name: compositionName,
    },
  }));
}

export default async function CompositionFile({
  spec,
  params,
}: {
  spec: Composition;
  params: { name: string };
}) {
  function getAbsoluteFillProps(absoluteFill?: AbsoluteFill) {
    if (!absoluteFill) {
      return '';
    }

    const props: string[] = [];

    const propNames: 'style'[] = ['style'];
    propNames.forEach((prop) => {
      if (typeof absoluteFill[prop] !== 'undefined') {
        props.push(`${prop}={${absoluteFill[prop]}}`);
      }
    });

    return props.join(' ');
  }

  function getComponentImports() {
    if (!spec.sequences) {
      return [];
    }

    const imports = [
      ...new Set(
        spec.sequences
          ?.map((sequence) => sequence.component)
          .filter((component) => typeof component !== 'undefined'),
      ),
    ];
    return imports;
  }

  function getSequenceProps(sequence?: Sequence) {
    if (!sequence) {
      return '';
    }

    const props: string[] = [];

    const propNames: ('durationInFrames' | 'from')[] = ['durationInFrames', 'from'];
    propNames.forEach((prop) => {
      if (typeof sequence[prop] !== 'undefined') {
        props.push(`${prop}={${sequence[prop]}}`);
      }
    });

    return props.join(' ');
  }

  function getSequenceComponentProps(props?: Record<string, boolean | number | string>) {
    if (!props) {
      return '';
    }

    const results: string[] = [];

    Object.entries(props).forEach(([name, value]) => {
      const finalValue = typeof value === 'string' ? `"${value}"` : `{${value}}`;
      results.push(`${name}=${finalValue}`);
    });

    return results.join(' ');
  }

  return await generate({
    processor: PrettierProcessor(),
    template: /* ts */ `
      import { AbsoluteFill, Sequence } from "remotion";
      ${getComponentImports()
        .map(
          (component) =>
            `import { ${pascalCase(component)} } from '../components/${kebabCase(component)}';`,
        )
        .join('\n')}
      
      export const Composition = () => {
        return (
          <AbsoluteFill ${getAbsoluteFillProps(spec.absoluteFill)}>
            ${(spec.sequences || [])
              .map(
                (sequence) => /* ts */ `
                  <Sequence ${getSequenceProps(sequence)}>
                    <${sequence.component ? pascalCase(sequence.component) : 'div'}
                      ${getSequenceComponentProps(sequence.props)}
                    />
                  </Sequence>
                `,
              )
              .join('')}
          </AbsoluteFill>
        );
      };
    `,
  });
}
