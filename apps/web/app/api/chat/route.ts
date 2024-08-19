import { getServerSession } from 'next-auth/next';
import { openai } from '@ai-sdk/openai';
import { Ratelimit } from '@upstash/ratelimit';
import { streamText, convertToCoreMessages } from 'ai';
import { kv } from '@vercel/kv';
import { authOptions } from '@/app/auth';
import { prompt } from './prompt';

export const maxDuration = 30;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error('Not authorized');
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const username = session?.user?.email;

  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
  });

  const { success: ipSuccess } = await ratelimit.limit(ip);
  const { success: usernameSuccess } = await ratelimit.limit(username);

  if (!ipSuccess || !usernameSuccess) {
    throw new Error('Rate limit');
  }

  const { messages } = await request.json();

  const result = await streamText({
    system: prompt,
    model: openai('gpt-4o-mini'),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
