import { openai } from '@ai-sdk/openai';
import { Ratelimit } from '@upstash/ratelimit';
import { streamText, convertToCoreMessages } from 'ai';
import { kv } from '@vercel/kv';

export const maxDuration = 30;

export async function POST(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, '10 s'),
  });

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    throw new Error('Rate limit');
  }

  const { messages } = await request.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
