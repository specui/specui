import { ConsistentFeature } from '@/components/Features/ConsistentFeature';
import { ContinuousFeature } from '@/components/Features/ContinuousFeature';
import { LanguageFeature } from '@/components/Features/LanguageFeature';
import { LeaveFeature } from '@/components/Features/LeaveFeature';
import { ManualFeature } from '@/components/Features/ManualFeature';
import { MigrationFeature } from '@/components/Features/MigrationFeature';
import { MoreFeature } from '@/components/Features/MoreFeature';
import { SpecFeature } from '@/components/Features/SpecFeature';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og?path=/features'],
    title: 'Features - SpecUI',
    url: 'https://specui.org/features',
  },
};

export default function FeaturesPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
        <div>Features</div>
      </h1>
      <LanguageFeature />
      <MigrationFeature />
      <ConsistentFeature />
      <ContinuousFeature />
      <ManualFeature />
      <SpecFeature />
      <LeaveFeature />
      <MoreFeature />
    </div>
  );
}
