import { FC } from 'react';

export const TextField: FC<{ placeholder?: string }> = ({ placeholder }) => {
  return <input className="bg-slate-600 p-2 rounded-md" placeholder={placeholder} type="text" />;
};
