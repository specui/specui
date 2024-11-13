'use client';

import { Check, ContentCopy } from '@mui/icons-material';
import { useState } from 'react';

export const Install = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    setIsCopied(true);

    await navigator.clipboard.writeText('npx @specui/cli new');

    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="bg-black flex gap-2 items-center px-4 py-2 rounded-xl text-white text-xs md:text-base sm:text-sm dark:bg-white dark:text-black">
      <span className="cursor-default">$</span>
      <span>npx @specui/cli new</span>
      <button onClick={handleCopy}>{isCopied ? <Check /> : <ContentCopy />}</button>
    </div>
  );
};
