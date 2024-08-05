'use client';

import { Check, ContentCopy } from '@mui/icons-material';
import { useState } from 'react';

export const Install = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    setIsCopied(true);

    await navigator.clipboard.writeText('npx @specui/cli generate');

    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="border border-gray-500 flex gap-2 px-4 py-2 rounded-xl text-white text-xs md:text-base sm:text-sm">
      <span>$</span>
      <span>npx @specui/cli generate</span>
      <button onClick={handleCopy}>{isCopied ? <Check /> : <ContentCopy />}</button>
    </div>
  );
};
