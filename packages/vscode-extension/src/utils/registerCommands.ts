import { commands } from 'vscode';

import { generateModifiedSpecCommand } from '../commands/generateModifiedSpecCommand';
import { generateNewSpecCommand } from '../commands/generateNewSpecCommand';
import { openSpecCommand } from '../commands/openSpecCommand';
import { saveSpecCommand } from '../commands/saveSpecCommand';
import { setAnthropicApiKeyCommand } from '../commands/setAnthropicApiKeyCommand';
import { setAnthropicModelCommand } from '../commands/setAnthropicModelCommand';
import { setGoogleApiKeyCommand } from '../commands/setGoogleApiKeyCommand';
import { setGoogleModelCommand } from '../commands/setGoogleModelCommand';
import { setGroqApiKeyCommand } from '../commands/setGroqApiKeyCommand';
import { setGroqModelCommand } from '../commands/setGroqModelCommand';
import { setOpenAiApiKeyCommand } from '../commands/setOpenAiApiKeyCommand';
import { setAiProviderCommand } from '../commands/setAiProviderCommand';

export function registerCommands() {
  const commandsObject = {
    generateModifiedSpec: generateModifiedSpecCommand,
    generateNewSpec: generateNewSpecCommand,
    openSpec: openSpecCommand,
    saveSpec: saveSpecCommand,
    setAnthropicApiKey: setAnthropicApiKeyCommand,
    setAnthropicModel: setAnthropicModelCommand,
    setGoogleApiKey: setGoogleApiKeyCommand,
    setGoogleModel: setGoogleModelCommand,
    setGroqApiKey: setGroqApiKeyCommand,
    setGroqModel: setGroqModelCommand,
    setOpenAiApiKey: setOpenAiApiKeyCommand,
    setAiProvider: setAiProviderCommand
  };

  for (const [name, command] of Object.entries(commandsObject)) {
    commands.registerCommand(`SpecUI.${name}`, command);
  }
}
