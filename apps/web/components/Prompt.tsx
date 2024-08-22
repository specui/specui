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
    <div className="bg-blue-600 flex items-center p-2 gap-2 mx-auto w-full">
      <div className="flex gap-2">
        <div>
          <div className="bg-white inline-flex px-2 py-1 rounded-md text-blue-600 text-xs uppercase">
            New
          </div>
        </div>
      </div>
      <p className="text-white text-xs">Ask AI to generate a spec for you</p>
      <form onSubmit={handleSubmit}>
        <input
          className="px-4 py-2 rounded-full w-96"
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
