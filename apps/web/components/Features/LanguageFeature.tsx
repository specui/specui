import { motion } from 'framer-motion';
import { CSharpIcon } from '@/icons/CSharpIcon';
import { GoIcon } from '@/icons/GoIcon';
import { JavaIcon } from '@/icons/JavaIcon';
import { JavaScriptIcon } from '@/icons/JavaScriptIcon';
import { KotlinIcon } from '@/icons/KotlinIcon';
import { PhpIcon } from '@/icons/PhpIcon';
import { PythonIcon } from '@/icons/PythonIcon';
import { RustIcon } from '@/icons/RustIcon';
import { ScalaIcon } from '@/icons/ScalaIcon';
import { SwiftIcon } from '@/icons/SwiftIcon';
import { FeatureTitle } from './FeatureTitle';
import { FeatureDescription } from './FeatureDescription';

export const LanguageFeature = () => {
  const languages = [
    {
      name: 'JavaScript',
      icon: JavaScriptIcon,
    },
    {
      name: 'Go',
      icon: GoIcon,
    },
    {
      name: 'Python',
      icon: PythonIcon,
    },
    {
      name: 'Java',
      icon: JavaIcon,
    },
    {
      name: 'Rust',
      icon: RustIcon,
    },
    {
      name: 'PHP',
      icon: PhpIcon,
    },
    {
      name: 'Swift',
      icon: SwiftIcon,
    },
    {
      name: 'C#',
      icon: CSharpIcon,
    },
    {
      name: 'Scala',
      icon: ScalaIcon,
    },
    {
      name: 'Kotlin',
      icon: KotlinIcon,
    },
  ];

  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <FeatureTitle>Generate code in any language</FeatureTitle>
      <FeatureDescription>
        ZappJS breaks down the barriers of language-specific limitations, offering you the freedom
        to generate code in the language of your choice.
      </FeatureDescription>
      <ul className="gap-4 gap-y-24 grid grid-cols-5">
        {languages.map((language, index) => (
          <motion.li
            className="col-span-5 flex items-center justify-center sm:col-span-2 xl:col-span-1"
            key={language.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index, duration: 0.15 }}
          >
            <language.icon size={128} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
