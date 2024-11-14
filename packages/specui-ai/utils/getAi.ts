import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import type { LanguageModelV1 } from 'ai';

export async function getAi(
  apiKey?: string,
  provider?: 'anthropic' | 'google' | 'groq' | 'openAi',
  model?: string,
): Promise<LanguageModelV1> {
  if (!provider) {
    console.error(
      'No AI Provider found. Please set your AI Provider using "SpecUI: Set AI Provider".',
    );
    throw new Error('AI Provider not found');
  }
  if (!model) {
    console.error('No AI Model found. Please set your AI Model using "SpecUI: Set AI Model".');
    throw new Error('AI Model not found');
  }

  const providerNames = {
    anthropic: 'Anthropic',
    google: 'Google',
    groq: 'Groq',
    openAi: 'OpenAI',
  };
  const providerName = providerNames[provider];

  if (!provider) {
    console.error(
      `No Model found for ${providerName}. Please set your Model using "SpecUI: Set ${providerName} Model".`,
    );
    throw new Error('Model not found');
  }

  if (!apiKey) {
    console.error(
      `No API Key found for ${providerName}. Please set your API Key using "SpecUI: Set ${providerName} API Key".`,
    );
    throw new Error('API Key not found');
  }

  if (provider === 'anthropic') {
    const anthropic = createAnthropic({
      apiKey,
    });
    return anthropic('claude-3-5-sonnet-20240620');
  } else if (provider === 'google') {
    const google = createGoogleGenerativeAI({
      apiKey,
    });
    return google(model);
  } else if (provider === 'groq') {
    const groq = createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey,
    });
    return groq(model);
  }

  const openai = createOpenAI({
    apiKey,
  });
  return openai(model);
}
