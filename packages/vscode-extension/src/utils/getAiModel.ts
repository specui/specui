import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import * as vscode from 'vscode';

export async function getAiModel() {
  const provider = vscode.workspace.getConfiguration().get<'anthropic' | 'google' | 'groq' | 'openAi'>('SpecUI.ai.provider');

  if (!provider) {
    vscode.window.showErrorMessage(
      'No AI Provider found. Please set your AI Provider using "SpecUI: Set AI Provider".',
    );
    throw new Error('AI Provider not found');
  }

  const providerNames = {
    anthropic: 'Anthropic',
    google: 'Google',
    groq: 'Groq',
    openAi: 'OpenAI'
  };
  const providerName = providerNames[provider];

  const model = vscode.workspace.getConfiguration().get<string>(`SpecUI.ai.${provider}.model`);

  if (!provider) {
    vscode.window.showErrorMessage(
      `No Model found for ${providerName}. Please set your Model using "SpecUI: Set ${providerName} Model".`,
    );
    throw new Error('Model not found');
  }

  const apiKey = vscode.workspace.getConfiguration().get<string>(`SpecUI.ai.${provider}.apiKey`);

  if (!apiKey) {
    vscode.window.showErrorMessage(
      `No API Key found for ${providerName}. Please set your API Key using "SpecUI: Set ${providerName} API Key".`,
    );
    throw new Error('API Key not found');
  }

  if (provider === 'anthropic') {
    const anthropic = createAnthropic({
      apiKey,
    });
    return anthropic(model as any);
  } else if (provider === 'google') {
    const google = createGoogleGenerativeAI({
      apiKey,
    });
    return google(model as any);
  } else if (provider === 'groq') {
    const groq = createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey,
    });
    return groq(model as any);
  }

  const openai = createOpenAI({
    apiKey,
  });
  return openai(model as any);
}
