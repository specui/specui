import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge, mergeConfigs } from 'tailwind-merge';

const twMerge = extendTailwindMerge((baseConfig) =>
  mergeConfigs(baseConfig, {
    extend: {
      classGroups: {
        'text-shadow': ['text-shadow', 'text-shadow-sm', 'text-shadow-lg'],
      },
      conflictingClassGroups: {
        'text-color': ['text-shadow'],
      },
    },
  }),
);

export default function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}
