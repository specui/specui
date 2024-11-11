import { generate } from '@specui/core';

export default async function TailwindFile() {
  return await generate({
    template: /* css */ `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `,
  });
}
