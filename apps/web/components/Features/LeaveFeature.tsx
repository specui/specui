import { GoIcon } from '@/icons/GoIcon';
import { CodeSnippet } from '../CodeSnippet';
import { FeatureDescription } from './FeatureDescription';
import { FeatureTitle } from './FeatureTitle';

const spec = `
models:
  post:
    attributes:
      title:
        type: string
      content:
        type: string
`;

const code = `
package models

import "time"

type Post struct {
    ID        int       \`json:"id"\`
    Title     string    \`json:"title"\`
    Content   string    \`json:"content"\`
    CreatedAt time.Time \`json:"created_at"\`
    UpdatedAt time.Time \`json:"updated_at"\`
}
`;

const bye = `
$ rm -rf .specui
`;

export const LeaveFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <FeatureTitle>Leave anytime</FeatureTitle>
      <FeatureDescription>
        If you ever want to stop using SpecUI, just remove the `.specui` directory and keep
        shipping. We will miss you and are honored to be a part of your journey.
      </FeatureDescription>
      <div className="gap-4 grid grid-cols-3">
        <CodeSnippet className="col-span-3 md:col-span-1" title="spec.yml">
          {spec}
        </CodeSnippet>
        <CodeSnippet
          className="col-span-3 md:col-span-1"
          icon={<GoIcon color="white" />}
          title="post.go"
        >
          {code}
        </CodeSnippet>
        <CodeSnippet className="col-span-3 md:col-span-1" title="Terminal">
          {bye}
        </CodeSnippet>
      </div>
    </div>
  );
};
