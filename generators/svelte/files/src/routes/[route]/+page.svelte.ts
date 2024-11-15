import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

import type { Page } from '@/interfaces/Page';
import type { Spec } from '@/interfaces/Spec';
import { renderElements } from '../../../../utils/renderElements';
import { renderStyles } from '../../../../utils/renderStyles';
import { renderImports } from '../../../../utils/renderImports';

export function getDynamic(spec: Spec) {
  return Object.entries(spec.pages || {}).map(([route, page]) => ({
    spec: page,
    params: {
      route,
    },
  }));
}

export default async function PageFile({ spec }: { spec: Page }) {
  return await generate({
    processor: PrettierProcessor({
      parser: 'html',
    }),
    template: /* html */ `
      <script>
        import { ${renderImports(spec.elements).join(',')} } from '@skeletonlabs/skeleton';
      </script>

      ${renderElements(spec.elements)}
      <style>
        ${renderStyles(spec.elements)}
      </style>
    `,
  });
}
