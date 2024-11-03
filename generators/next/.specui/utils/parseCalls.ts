import { type IProcessor, generate } from '@specui/core';
import { camelCase, pascalCase } from 'change-case';
import type { Spec } from '../interfaces/Spec';

export async function parseCalls({
  PrettierProcessor,
  spec,
}: {
  PrettierProcessor: IProcessor<any>;
  spec: Spec;
}) {
  const calls: {
    [file: string]: Buffer | string;
  } = {};
  await Promise.all(
    Object.entries(spec.calls || {}).map(async ([callName, call]) => {
      calls[`app/api/${callName}/route.ts`] = await generate({
        processor: PrettierProcessor(),
        engine: () => `
              import { NextRequest, NextResponse } from 'next/server'
    
              import {
                ${pascalCase(callName)}Request,
                ${pascalCase(callName)}Response
              } from '@/lib/schemas/${camelCase(callName)}Schema'
    
              export async function POST(req: NextRequest) {
                const request = (await req.json()) as ${pascalCase(callName)}Request
    
                // implement your logic here
    
                return NextResponse.json({})
              }
            `,
      });
    }),
  );

  return calls;
}
