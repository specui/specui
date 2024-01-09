import { CodeSnippet } from '../CodeSnippet';

const spec1 = `
paths:
  /pet:
    post:
      operationId: addPet
      requestBody:
        description: Create a new pet in the store
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Pet'
        required: true
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
        '405':
          description: Invalid input
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

export const SpecFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <h2 className="mb-2 text-4xl">Spec how you want</h2>
      <p className="mb-8 text-gray-500 text-xl w-2/3">
        The power to define your specifications lies in your hands. Embrace the freedom to use
        industry-standard specifications for familiarity and best practices, or blaze your own trail
        with custom specifications tailored to your unique requirements.
      </p>
      <h3 className="mb-4 text-lg">Use a standard like Swagger or roll with your own.</h3>
      <div className="gap-4 grid grid-cols-2">
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {spec1}
        </CodeSnippet>
        <CodeSnippet className="col-span-2 md:col-span-1" title="spec.yml">
          {spec2}
        </CodeSnippet>
      </div>
    </div>
  );
};
