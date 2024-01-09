'use client';

import { Check, ContentCopy } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Install = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    setIsCopied(true);

    await navigator.clipboard.writeText('npx create-zapp-app@latest');

    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <motion.button
      className="cursor-pointer flex gap-2 justify-center text-gray-600 mt-4"
      onClick={handleCopy}
      initial={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      npx create-zapp-app@latest
      {isCopied ? <Check /> : <ContentCopy />}
    </motion.button>
  );
};
