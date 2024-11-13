'use client';

import React, { useEffect, useState } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
}

export function TypingEffect({ text, speed = 100 }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayText.split('\n').map((line, index) => {
        const [label, value] = line.split(':');
        const trimmedValue = value?.trim();
        let valueClass = 'text-green-500';

        if (trimmedValue === 'true') {
          valueClass = 'text-orange-500';
        } else if (trimmedValue?.startsWith('$')) {
          valueClass = 'text-blue-500';
        }

        return (
          <div key={`line-${index}`}>
            <span className="text-red-500">
              {label}
              {label ? ':' : ''}
            </span>
            <span className={valueClass}>{value}</span>
          </div>
        );
      })}
    </span>
  );
}
