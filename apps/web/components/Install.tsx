'use client';

import { Check, ContentCopy } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Install = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    setIsCopied(true);

    await navigator.clipboard.writeText('npx @specui/cli generate');

    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <motion.button
      className="bg-gray-900 cursor-pointer flex font-mono gap-2 justify-center items-center px-4 py-2 rounded-xl text-gray-500 text-sm mt-4"
      onClick={handleCopy}
      initial={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      npx @specui/cli generate
      {isCopied ? <Check /> : <ContentCopy />}
    </motion.button>
  );
};
