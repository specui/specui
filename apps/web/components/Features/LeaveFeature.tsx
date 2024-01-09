import { CodeSnippet } from '../CodeSnippet';

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
$ rm -rf .zapp
`;

export const LeaveFeature = () => {
  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <h2 className="mb-2 text-4xl">Leave anytime</h2>
      <p className="mb-8 text-gray-500 text-xl w-2/3">
        If you ever want to stop using ZappJS, just remove the `.zapp` directory and keep shipping.
        We will miss you and are honored to be a part of your journey.
      </p>
      <div className="gap-4 grid grid-cols-3">
        <CodeSnippet className="col-span-3 md:col-span-1" title="spec.yml">
          {spec}
        </CodeSnippet>
        <CodeSnippet className="col-span-3 md:col-span-1" title="post.go">
          {code}
        </CodeSnippet>
        <CodeSnippet className="col-span-3 md:col-span-1" title="Terminal">
          {bye}
        </CodeSnippet>
      </div>
    </div>
  );
};
