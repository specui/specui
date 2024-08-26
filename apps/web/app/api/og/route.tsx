import type { Metadata } from 'next';
import { metadata as homeMetadata } from '../../page';
import { metadata as docsMetadata } from '../../docs/page';
import { metadata as generatorsMetadata } from '../../generators/page';
import { metadata as specsMetadata } from '../../specs/page';
import { metadata as playgroundMetadata } from '../../playground/page';
import { metadata as playgroundNextMetadata } from '../../playground/next/page';
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const path = searchParams.get('path');

  const titles: Record<string, Metadata> = {
    '/docs': docsMetadata,
    '/generators': generatorsMetadata,
    '/specs': specsMetadata,
    '/playground': playgroundMetadata,
    '/playground/next': playgroundNextMetadata,
    '/playground/next/clerk-authentication-example': {
      ...playgroundNextMetadata,
      title: 'Clerk Authentication Example',
    },
    '/playground/next/framer-motion-animation-example': {
      ...playgroundNextMetadata,
      title: 'Framer Motion: Animation Example',
    },
    '/playground/next/spinning-loader-example': {
      ...playgroundNextMetadata,
      title: 'Spinning Loader Example',
    },
    '/playground/next/photography-website-example': {
      ...playgroundNextMetadata,
      title: 'Photography Website Example',
    },
    '/playground/next/resend-contact-form-example': {
      ...playgroundNextMetadata,
      title: 'Resend: Contact Form Example',
    },
    '/playground/next/shadcn-accordion-example': {
      ...playgroundNextMetadata,
      title: 'shadcn: Accordion Example',
    },
    '/playground/next/tauri-desktop-app-example': {
      ...playgroundNextMetadata,
      title: 'Tauri Desktop App Example',
    },
    '/playground/next/vercel-analytics-example': {
      ...playgroundNextMetadata,
      title: 'Vercel Analytics Example',
    },
  };

  const metadata = titles[path ?? ''] ?? homeMetadata;

  const fontData = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/fonts/GeistMono-Light.ttf`),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: 'white',
          display: 'flex',
          fontFamily: '"GeistMono"',
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
            fontSize: 25,
            gap: '1em',
            justifyContent: 'flex-start',
            padding: '0 40px',
            textAlign: 'center',
          }}
        >
          <img height={256} src="https://specui.org/logo.png" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '.5em' }}>
              <span style={{ color: 'gray' }}>page:</span>
            </div>
            <div style={{ display: 'flex', gap: '.5em' }}>
              <span style={{ color: 'gray', marginLeft: '1.25em' }}>title:</span>
              {(metadata.title as string)?.split(' - ')[0] ?? 'SpecUI'}
            </div>
            <div style={{ display: 'flex', gap: '.5em' }}>
              <span style={{ color: 'gray', marginLeft: '1.25em' }}>path:</span>
              <span>{path}</span>
            </div>
            <div style={{ display: 'flex', gap: '.5em' }}>
              <span style={{ color: 'gray' }}>site:</span>
            </div>
            <div style={{ display: 'flex', gap: '.5em', marginLeft: '1.25em' }}>
              <span style={{ color: 'gray' }}>name:</span> SpecUI
            </div>
            <div style={{ display: 'flex', gap: '.5em', marginLeft: '1.25em' }}>
              <span style={{ color: 'gray' }}>url:</span> https://specui.org
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'GeistMono',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
