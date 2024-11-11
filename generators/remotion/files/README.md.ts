import { generate } from '@specui/core';
import { PrettierProcessor } from '@specui/prettier';

const template = `# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Try it out!

\`\`\`
npm install -g @specui/cli
specui generate -f
npm install
npm run dev
\`\`\`
`;

export default async function ReadmeFile() {
  return await generate({
    processor: PrettierProcessor({ parser: 'markdown' }),
    template,
  });
}
