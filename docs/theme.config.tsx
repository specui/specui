import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useConfig, type DocsThemeConfig } from "nextra-theme-docs";

import { XIcon } from './components/XIcon';

const config: DocsThemeConfig = {
  logo: (
    <Stack alignItems="center" direction="row" gap={1}>
      <Image alt="Zapp Logo" width={24} height={24} src="/logo.png" style={{ borderRadius: 3 }} />
      <Typography>Zapp</Typography>
    </Stack>
  ),
  docsRepositoryBase: 'https://github.com/zappjs/zappjs/blob/main/docs',
  useNextSeoProps: function SEO() {
    const { frontMatter } = useConfig();

    const defaultTitle = frontMatter.overrideTitle || 'Zapp';

    return {
      description: frontMatter.description,
      defaultTitle,
      titleTemplate: `%s – Zapp`,
    };
  },
  project: {
    link: 'https://github.com/zappjs/zappjs',
  },
  toc: {
    float: true,
    backToTop: true,
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  navbar: {
    extraContent: (
      <>
        <a
          href="https://twitter.com/zappjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <XIcon size={24} />
        </a>
      </>
    ),
  },
  footer: {
    text: <span>&copy; {new Date().getFullYear()} Austin Code Shop LLC</span>,
  },
};

export default config;
