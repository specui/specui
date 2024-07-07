import { CodeSnippet } from '../CodeSnippet';
import { FeatureDescription } from './FeatureDescription';
import { FeatureTitle } from './FeatureTitle';

const spec1 = `
pages:
  home:
    elements:
      - tag: button
        content: Click me
`;

const spec2 = `
calls:
  addPet:
    description: Create a new pet in the store
    request:
      $ref: '#/models/pet' 
    response:
      $ref: '#/models/pet'
`;

export const HeroFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <h3 className="mb-4 text-lg">Use a standard like Swagger or roll with your own.</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yaml">
          {spec1}
        </CodeSnippet>
        <CodeSnippet className="col-span-2 md:col-span-1" title="My App">
          <button className="bg-blue-500 p-2 rounded-xl">Click me</button>
        </CodeSnippet>
      </div>
    </div>
  );
};
