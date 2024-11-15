import DrizzleSchema from '@specui/drizzle-generator/schema.json';
import NextSchema from '@specui/next-generator/.specui/schema.json';
import SvelteSchema from '@specui/svelte-generator/schema.json';
import RemotionSchema from '@specui/remotion-generator/schema.json';
import { existsSync, rmSync, readdirSync, statSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, normalize, resolve } from 'path';

import { getNodeListOutput } from '../utils/getNodeListOutput';
import { loadGenerator } from '../utils/loadGenerator';
import { loadSpec } from '../utils/loadSpec';
import { pathListToNodeList } from '../utils/pathListToNodeList';

import { getHash } from '../utils/getHash';
import { loadConfig } from '../utils/loadConfig';

export async function generate({
  delete: shouldDelete,
  dir,
  force,
}: {
  delete?: boolean;
  dir?: string;
  force?: boolean;
}) {
  try {
    const loadedConfig = await loadConfig(dir);
    const loadedSpec = await loadSpec(dir);

    if (!loadedSpec) {
      throw new Error('No spec found.');
    }

    const workspaceDir = normalize(dir || '.');
    const specUiDir = normalize(`${workspaceDir}/.specui`);
    const lockFile = normalize(`${specUiDir}/lock.json`);

    const outputPath = loadedConfig?.config.output?.path ?? '.';
    const generator = await loadGenerator(
      loadedConfig?.config.generator || '@specui/next-generator',
      loadedSpec.spec,
    );
    const files = await generator(loadedSpec.spec);

    const hash: Record<
      string,
      {
        integrity: string;
      }
    > = {};
    const output: Record<string, Buffer | string> = {};

    // generate code
    await Promise.all(
      Object.entries(files).map(async ([fileName, generator]) => {
        const fileContents = await generator;
        const filePath = normalize(`${outputPath}/${fileName}`);

        if (typeof fileContents !== 'string' && !Buffer.isBuffer(fileContents)) {
          console.log(`Skipped: ${filePath}`);
          return;
        }

        hash[filePath] = {
          integrity: `sha512-${getHash(fileContents.toString())}`,
        };
        output[filePath] = fileContents;
      }),
    );

    const currentLock = existsSync(lockFile)
      ? (JSON.parse(await readFile(lockFile, 'utf8')) as Record<string, { integrity: string }>)
      : {};

    // check hash
    const mismatchHashes: [string] = (
      await Promise.all(
        Object.entries(hash).map(async ([filePath]) => {
          const content = existsSync(normalize(`${workspaceDir}/${filePath}`))
            ? await readFile(normalize(`${workspaceDir}/${filePath}`), 'utf8')
            : '';
          const existingHash = `sha512-${getHash(content)}`;
          if (currentLock[filePath] && existingHash !== currentLock[filePath]?.integrity) {
            return filePath;
          }
        }),
      )
    ).filter((filePath) => Boolean(filePath)) as [string];

    if (mismatchHashes.length) {
      if (force) {
        mismatchHashes.forEach((mismatchHash) => {
          delete hash[mismatchHash];
        });
      } else {
        console.log(
          `Aborting due to manual edits:\n${mismatchHashes.map((hash) => `- ${hash}`).join('\n')}`,
        );
        return;
      }
    }

    if (!existsSync(specUiDir)) {
      await mkdir(specUiDir);
    }
    await writeFile(lockFile, JSON.stringify(hash, null, 2));

    // write code to disk
    await Promise.all(
      Object.entries(output).map(async ([filePath, fileContents]) => {
        const fileDir = normalize(`${workspaceDir}/${dirname(filePath)}`);

        if (
          currentLock[filePath]?.integrity &&
          hash[filePath]?.integrity === currentLock[filePath]?.integrity
        ) {
          return;
        }

        if (!existsSync(fileDir)) {
          await mkdir(fileDir, { recursive: true });
        }
        console.log(`Write to: ${filePath}`);
        await writeFile(normalize(`${workspaceDir}/${filePath}`), fileContents);
      }),
    );

    // delete files that are not generated, except .specui
    if (shouldDelete) {
      deleteUnmatchedFiles(
        normalize(`${workspaceDir}/${outputPath}`),
        Object.keys(output),
        [
          specUiDir,
          `${workspaceDir}/${outputPath}/.git`,
          `${workspaceDir}/${outputPath}/.next`,
          `${workspaceDir}/${outputPath}/.env.local`,
          `${workspaceDir}/${outputPath}/node_modules`,
          `${workspaceDir}/${outputPath}/next-env.d.ts`,
          `${workspaceDir}/${outputPath}/pnpm-lock.yaml`,
        ].concat(loadedConfig?.config.ignore ?? []),
      );
    }

    // print generated files
    const paths = Object.keys(output);
    const nodes = pathListToNodeList(paths);
    console.log('Generated Files:');
    console.log(getNodeListOutput(nodes));

    await writeFile(
      normalize(`${specUiDir}/schema.json`),
      JSON.stringify(
        loadedConfig?.config.generator === '@specui/drizzle-generator'
          ? DrizzleSchema
          : loadedConfig?.config.generator === '@specui/remotion-generator'
            ? RemotionSchema
            : loadedConfig?.config.generator === '@specui/svelte-generator'
              ? SvelteSchema
              : NextSchema,
        null,
        2,
      ),
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteUnmatchedFiles(rootDir: string, generatedFiles: string[], excludeDirs: string[]) {
  const absoluteGeneratedFiles = new Set(generatedFiles.map((file) => resolve(rootDir, file)));
  const absoluteExcludeDirs = excludeDirs.map((dir) => resolve(dir));

  function deleteRecursively(dir: string) {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = resolve(dir, entry);

      if (absoluteExcludeDirs.includes(fullPath)) {
        continue; // Skip the .specui directory
      }

      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        deleteRecursively(fullPath);
        if (readdirSync(fullPath).length === 0) {
          rmSync(fullPath, { recursive: true, force: true });
          console.log(`Deleted directory: ${fullPath}`);
        }
      } else {
        if (!absoluteGeneratedFiles.has(fullPath)) {
          rmSync(fullPath);
          console.log(`Deleted file: ${fullPath}`);
        }
      }
    }
  }

  deleteRecursively(rootDir);
}
