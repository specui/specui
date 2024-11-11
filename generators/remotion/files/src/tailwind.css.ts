import { generate } from '@specui/core';

export default async function TailwindGenerator() {
  return await generate({
    template: /* css */ `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `,
  });
}
