import { NextRequest, NextResponse } from 'next/server';

import { CreatePostRequest, CreatePostResponse } from '@/lib/schemas/createPostSchema';

export async function POST(req: NextRequest) {
  const request = (await req.json()) as CreatePostRequest;

  // implement your logic here

  return NextResponse.json({});
}
