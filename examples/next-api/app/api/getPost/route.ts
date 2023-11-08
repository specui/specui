import { NextRequest, NextResponse } from 'next/server';

import { GetPostRequest, GetPostResponse } from '@/lib/schemas/getPostSchema';

export async function POST(req: NextRequest) {
  const request = (await req.json()) as GetPostRequest;

  // implement your logic here

  return NextResponse.json({});
}
