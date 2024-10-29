export default /* ts */ `
"use client"

import React, { useEffect, useState } from 'react';

interface TypingEffectProps {
  children: string;
  speed?: number;
}

export function TypingEffect({ children, speed = 100 }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(children.slice(0, index + 1));
      index++;
      if (index === children.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [children, speed]);

  return <span>{displayText}</span>;
}
`;
