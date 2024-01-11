import { CodeSnippet } from '../CodeSnippet';
import { FeatureDescription } from './FeatureDescription';
import { FeatureTitle } from './FeatureTitle';

const spec1 = `
models:
  user:
    attributes:
      name:
        type: string
`;

const spec2 = `
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
`;

export const ContinuousFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <FeatureTitle>Generate code, continuously</FeatureTitle>
      <FeatureDescription>
        Many code generators enable to produce your code once.
      </FeatureDescription>
      <h3 className="mb-4 text-lg">Create a simple model</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {spec1}
        </CodeSnippet>
        <CodeSnippet className="col-span-2 md:col-span-1" title="post.go (generated)">
          {spec2}
        </CodeSnippet>
      </div>
      <h3 className="mb-4 mt-8 text-lg">Add attributes to your model</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {spec1}
        </CodeSnippet>
        <CodeSnippet className="col-span-2 md:col-span-1" title="post.go (generated)">
          {spec2}
        </CodeSnippet>
      </div>
      <h3 className="mb-4 mt-8 text-lg">Rename your model</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {spec1}
        </CodeSnippet>
        <CodeSnippet className="col-span-2 md:col-span-1" title="post.go (generated)">
          {spec2}
        </CodeSnippet>
      </div>
      <h3 className="mb-4 mt-8 text-lg">Change the language of your model</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {spec1}
        </CodeSnippet>
        <CodeSnippet className="col-span-2 md:col-span-1" title="post.go (generated)">
          {spec2}
        </CodeSnippet>
      </div>
    </div>
  );
};
