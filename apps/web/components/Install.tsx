'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

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
      <Button
        className="h-6 w-6 rounded-sm text-white hover:bg-white/10 hover:text-white dark:text-black dark:hover:bg-black/10 dark:hover:text-black"
        onClick={handleCopy}
        size="icon"
        type="button"
        variant="ghost"
      >
        {isCopied ? <Check /> : <Copy />}
      </Button>
    </div>
  );
};
