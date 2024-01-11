import { generate } from '@zappjs/core';
import { JsonEngine } from '@zappjs/json';
import { LicenseGenerator } from '@zappjs/license';
import { TomlEngine } from '@zappjs/toml';
import { readFile } from 'fs/promises';

import { IconGenerator } from './generators/IconGenerator';
import pkg from '../package.json';

interface Spec {
  name: string;
  title: string;
  description: string;
  domain: string;
  version?: string;
  license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
  author?: {
    name: string;
    email: string;
    url: string;
  };
  repository: string;
  url: string;
}

export default async function zapp(spec: Spec) {
  const icon = await readFile(`${__dirname}/icon.svg`);

  const icons: Record<string, Buffer> = {};

  const iconSizes = {
    '32x32.png': 32,
    '128x128.png': 128,
    '128x128@2x.png': 256,
    'icon.icns': 1024,
    'icon.ico': 32,
    'icon.png': 1024,
    'Square30x30Logo.png': 30,
    'Square44x44Logo.png': 44,
    'Square71x71Logo.png': 71,
    'Square89x89Logo.png': 89,
    'Square107x107Logo.png': 107,
    'Square142x142Logo.png': 142,
    'Square150x150Logo.png': 150,
    'Square284x284Logo.png': 284,
    'Square310x310Logo.png': 310,
    'StoreLogo.png': 48,
  };

  await Promise.all(
    Object.entries(iconSizes).map(async ([file, size]) => {
      icons[`src-tauri/icons/${file}`] = await IconGenerator({
        icon,
        size,
      });
    }),
  );

  return {
    ...icons,
    'src-tauri/Cargo.toml': await generate({
      engine: TomlEngine,
      spec: {
        package: {
          name: spec.name,
          version: spec.version,
          description: spec.description,
          authors: spec.author
            ? `${spec.author.name} <${spec.author.name}> (${spec.author.url})`
            : [],
          license: spec.license,
          repository: spec.repository,
          edition: '2021',
          'rust-version': '1.57',
        },
        'build-dependencies': {
          'tauri-build': {
            version: '1.2',
            features: [],
          },
        },
        dependencies: {
          serde_json: '1.0',
          serde: {
            version: '1.0',
            features: ['derive'],
          },
          tauri: {
            version: '1.2',
            features: ['macos-private-api', 'shell-open', 'system-tray'],
          },
          'tauri-plugin-positioner': {
            version: '1.0.4',
            features: ['system-tray'],
          },
        },
        features: {
          default: ['custom-protocol'],
          'custom-protocol': ['tauri/custom-protocol'],
        },
      },
    }),
    'src-tauri/tauri.conf.json': await generate({
      engine: JsonEngine,
      spec: {
        build: {
          devPath: spec.url,
          distDir: '../dist',
          withGlobalTauri: false,
        },
        package: {
          productName: spec.title,
          version: spec.version,
        },
        tauri: {
          allowlist: {
            all: false,
            shell: {
              all: false,
              open: true,
            },
          },
          bundle: {
            active: true,
            category: 'DeveloperTool',
            copyright: '',
            deb: {
              depends: [],
            },
            externalBin: [],
            icon: [
              'icons/32x32.png',
              'icons/128x128.png',
              'icons/128x128@2x.png',
              'icons/icon.icns',
              'icons/icon.ico',
            ],
            identifier: `${spec.domain}.${spec.name}`,
            longDescription: '',
            macOS: {
              entitlements: null,
              exceptionDomain: '',
              frameworks: [],
              providerShortName: null,
              signingIdentity: null,
            },
            resources: [],
            shortDescription: '',
            targets: 'all',
            windows: {
              certificateThumbprint: null,
              digestAlgorithm: 'sha256',
              timestampUrl: '',
            },
          },
          security: {
            csp: null,
          },
          updater: {
            active: false,
          },
          macOSPrivateApi: true,
          windows: [
            {
              fullscreen: false,
              height: 800,
              resizable: false,
              title: 'menubar',
              width: 600,
              visible: false,
              hiddenTitle: true,
              decorations: false,
              focus: false,
              transparent: true,
              skipTaskbar: true,
              alwaysOnTop: true,
            },
          ],
          systemTray: {
            iconPath: 'icons/icon.png',
            iconAsTemplate: true,
            menuOnLeftClick: false,
          },
        },
      },
    }),
    LICENSE: await LicenseGenerator({
      license: spec.license,
    }),
    'package.json': await generate({
      engine: JsonEngine,
      spec: {
        name: spec.name,
        version: spec.version,
        scripts: {
          ...pkg.scripts,
          tauri: 'tauri',
        },
        dependencies: {
          '@tauri-apps/api': '^1.2.0',
        },
        devDependencies: {
          ...pkg.devDependencies,
          '@tauri-apps/cli': '^1.2.2',
          '@types/node': '^18.7.10',
          typescript: '^4.6.4',
        },
      },
    }),
  };
}
