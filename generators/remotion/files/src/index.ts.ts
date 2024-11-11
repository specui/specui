import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

export default async function IndexGenerator() {
  return await generate({
    processor: PrettierProcessor(),
    template: /* js */ `
      // This is your entry file! Refer to it when you render:
      // npx remotion render <entry-file> HelloWorld out/video.mp4
      
      import { registerRoot } from "remotion";
      import { RemotionRoot } from "./Root";
      
      registerRoot(RemotionRoot);
    `,
  });
}
