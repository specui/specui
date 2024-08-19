'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';

export function Prompt({
  onChange = () => {},
  value = '',
}: {
  onChange: (value: string) => void;
  value?: string;
}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    const message = messages
      .filter((m) => m.role === 'assistant')
      .map((m) => m.content)
      .slice(-1)[0];

    if (!message) {
      return;
    }

    onChange(
      '# yaml-language-server: $schema=/schemas/next-generator-schema.json\n' +
        message.replace('```yaml', '').replace('```', ''),
    );
  }, [messages, onChange]);

  return (
    <div className="flex items-center gap-2 mx-auto">
      <div className="flex gap-2">
        <div>AI Prompt</div>
        <div>
          <div className="bg-blue-600 inline-flex px-2 py-1 rounded-md text-white text-xs uppercase">
            New
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-xs">Ask AI to generate a spec for you</p>
      <form onSubmit={handleSubmit}>
        <input
          className="px-4 py-2 rounded-full w-full"
          id="prompt"
          name="prompt"
          onChange={handleInputChange}
          placeholder=""
          type="text"
          value={input}
        />
      </form>
    </div>
  );
}
