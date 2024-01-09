'use client';

import { BuildFeature } from '@/components/Features/BuildFeature';
import { ConsistentFeature } from '@/components/Features/ConsistentFeature';
import { LanguageFeature } from '@/components/Features/LanguageFeature';
import { LeaveFeature } from '@/components/Features/LeaveFeature';
import { ManualFeature } from '@/components/Features/ManualFeature';
import { MigrationFeature } from '@/components/Features/MigrationFeature';
import { MoreFeature } from '@/components/Features/MoreFeature';
import { SpecFeature } from '@/components/Features/SpecFeature';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
      <ConsistentFeature />
      <MigrationFeature />
      <ManualFeature />
      <SpecFeature />
      <LanguageFeature />
      <BuildFeature />
      <LeaveFeature />
      <MoreFeature />
    </main>
  );
}
