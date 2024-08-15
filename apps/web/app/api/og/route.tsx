import { GeistSans } from 'geist/font/sans';
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const path = searchParams.get('path');

  const titles: Record<string, string> = {
    '/docs': 'Docs',
    '/generators': 'Generators',
    '/playground': 'Playground',
    '/playground/next': 'Next.js Playground',
  };

  const title = titles[path ?? ''] ?? 'Build Specs with UIs';

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'flex-end',
          background: 'white',
          display: 'flex',
          fontFamily: '"Geist"',
          height: '100%',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            color: 'black',
            display: 'flex',
            fontSize: 40,
            gap: '.5em',
            justifyContent: 'flex-start',
            padding: '40px 40px',
            textAlign: 'center',
          }}
        >
          <img height={256} src="https://specui.org/logo.png" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: '2em' }}>{title}</div>
            <div style={{ display: 'flex' }}>SpecUI</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
