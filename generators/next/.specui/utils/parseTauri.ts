import { generate } from '@specui/core';
import { TomlEngine } from '@specui/toml';
import { JsonEngine } from '@specui/json';
import type { Spec } from '../interfaces/Spec';

export async function parseTauri({ spec }: { spec: Spec }) {
  const tauri: Record<string, Buffer | string> = {};
  if (spec.platform?.desktop) {
    const icon =
      spec.icon ??
      `
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <style type="text/css">
              .st0{fill:none;stroke:#FFFFFF;stroke-width:19.6839;stroke-miterlimit:10;}
            </style>
            <polygon class="st0" points="42.8,377.3 43.8,135 255.5,11.5 469.2,135.1 467.6,378.2 255.8,500.5"/>
            <line class="st0" x1="43.8" y1="135" x2="467.6" y2="378.2"/>
            <line class="st0" x1="469.2" y1="135.1" x2="42.8" y2="377.3"/>
            <line class="st0" x1="255.5" y1="11.5" x2="255.5" y2="500.5"/>
            <line class="st0" x1="185.2" y1="52.1" x2="467.6" y2="215.2"/>
            <line class="st0" x1="326.4" y1="52.1" x2="44" y2="215.2"/>
            <line class="st0" x1="185.2" y1="55.8" x2="185.2" y2="459.7"/>
            <line class="st0" x1="326.4" y1="52.1" x2="326.4" y2="459.7"/>
            <line class="st0" x1="115.3" y1="93.3" x2="467.6" y2="296.7"/>
            <line class="st0" x1="397" y1="93.3" x2="44" y2="296.7"/>
            <line class="st0" x1="114.6" y1="93.3" x2="114.6" y2="419"/>
            <line class="st0" x1="397" y1="93.7" x2="397" y2="419"/>
            <line class="st0" x1="44" y1="215.2" x2="397" y2="419"/>
            <line class="st0" x1="467.6" y1="215.2" x2="114.6" y2="419"/>
            <line class="st0" x1="44" y1="296.7" x2="326.4" y2="459.7"/>
            <line class="st0" x1="467.6" y1="296.7" x2="185.2" y2="459.7"/>
          </svg>
        `;

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

    // await Promise.all(
    //   Object.entries(iconSizes).map(async ([file, size]) => {
    //     tauri[`src-tauri/icons/${file}`] = await IconGenerator({
    //       icon,
    //       size,
    //     });
    //   }),
    // );

    tauri['src-tauri/src/main.rs'] = await generate({
      engine: () => `// Prevents additional console window on Windows in release, DO NOT REMOVE!!
  #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
  
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  #[tauri::command]
  fn greet(name: &str) -> String {
      format!("Hello, {}! You've been greeted from Rust!", name)
  }
  
  fn main() {
      tauri::Builder::default()
          .invoke_handler(tauri::generate_handler![greet])
          .run(tauri::generate_context!())
          .expect("error while running tauri application");
  }`,
    });
    tauri['src-tauri/Cargo.toml'] = await generate({
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
    });
    tauri['src-tauri/tauri.conf.json'] = await generate({
      engine: JsonEngine,
      spec: {
        build: {
          beforeDevCommand: 'pnpm dev',
          beforeBuildCommand: 'pnpm build',
          devPath: spec.platform?.desktop?.url ?? 'http://localhost:3000',
          distDir: '../dist',
          withGlobalTauri: true,
        },
        package: {
          productName: spec.name ?? 'tauri-app',
          version: '0.1.0',
        },
        tauri: {
          allowlist: {
            all: false,
            shell: {
              all: false,
              open: true,
            },
          },
          windows: [
            {
              title: spec.title ?? 'tauri-app',
              height: spec.platform?.desktop?.window?.height ?? 600,
              width: spec.platform?.desktop?.window?.width ?? 800,
            },
          ],
          security: {
            csp: null,
          },
          bundle: {
            active: true,
            targets: 'all',
            identifier: `${spec.platform?.domain ?? 'org.example'}.${spec.name}`,
            icon: [
              'icons/32x32.png',
              'icons/128x128.png',
              'icons/128x128@2x.png',
              'icons/icon.icns',
              'icons/icon.ico',
            ],
          },
        },
      },
    });
    tauri['src-tauri/build.rs'] = await generate({
      engine: () => `fn main() {
      tauri_build::build()
  }`,
    });
  }

  return tauri;
}
