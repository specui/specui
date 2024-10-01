import { Metadata } from 'next';

import { Playground } from '@/components/Playground/Playground';
import { safeDump } from 'js-yaml';

export const metadata: Metadata = {
  title: 'Home - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og'],
    siteName: 'SpecUI',
    title: 'Home - SpecUI',
    description: 'Build UIs with Specs',
    url: 'https://specui.org/',
  },
};

const HomeSpec = `
app:
  title: SpecUI
  name: specui
  version: 1.0.0
  description: Build UIs with Specs
  author:
    name: Chris Tate
    url: 'https://ctate.dev/'
  license: MIT
pages:
  index:
    elements:
      - tag: div
        style:
          alignItems: center
          display: flex
          flexDirection: column
          justifyContent: center
        elements:
          - tag: h1
            text: Build UIs with Specs
            style:
              color: white
              fontFamily: 'Geist, sans-serif'
              fontSize: 2em
              marginBottom: .5em
              textAlign: center
          - tag: div
            style:
              alignItems: center
              border: '1px #666 solid'
              borderRadius: 20px
              display: flex
              gap: 5px
              padding: 10px 20px
            elements:
              - tag: div
                text: $
                style:
                  cursor: default
              - tag: div
                text: npx @specui/cli new
              - tag: button
                onClick:
                  navigator.clipboard.writeText: npx @specui/cli new
                style:
                  backgroundColor: white
                  border: none
                  borderRadius: 10px
                  color: black
                  cursor: pointer
                  marginLeft: 5px
                  padding: 5px 10px
                text: Copy
          - tag: div
            elements:
              - tag: div
                style:
                  marginTop: 20px
                  textDecoration: none
                text: 'For more examples, check out these specs:'
              - tag: ul
                style:
                  display: flex
                  flexDirection: column
                  fontSize: 12px
                  gap: 5px
                elements:
                  - tag: li
                    elements:
                      - tag: a
                        href: /playground/next/framer-motion-animation-example
                        target: _parent
                        text: 'Framer Motion: Animation Example'
                  - tag: li
                    elements:
                      - tag: a
                        href: /playground/next/photography-website-example
                        target: _parent
                        text: Photography Website Example
                  - tag: li
                    elements:
                      - tag: a
                        href: /playground/next/resend-contact-form-example
                        target: _parent
                        text: 'Resend: Contact Form Example'
                  - tag: li
                    elements:
                      - tag: a
                        href: /playground/next/shadcn-accordion-example
                        target: _parent
                        text: 'shadcn: Accordion Example'
                  - tag: li
                    elements:
                      - tag: a
                        href: /playground/next/spinning-loader-example
                        target: _parent
                        text: Spinning Loader Example
                  - tag: li
                    elements:
                      - tag: a
                        href: /playground/next/tauri-desktop-app-example
                        target: _parent
                        text: Tauri Desktop App Example
                  - tag: li
                    elements:
                      - tag: a
                        href: /playground/next/vercel-analytics-example
                        target: _parent
                        text: Vercel Analytics Example
styles:
  body:
    alignItems: center
    backgroundImage: 'linear-gradient(to bottom right, #333, black)'
    color: white
    display: flex
    flexDirection: column
    fontFamily: sans-serif
    justifyContent: center
    margin: 0
    minHeight: 100%
  html:
    height: 100%
  a:
    color: white
    textDecoration: none
  a:hover:
    textDecoration: underline
`;

export default function Home() {
  return (
    <main
      className="flex flex-col align-middle justify-center mx-auto"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Playground generator="vanilla" spec={HomeSpec.trim()} />
    </main>
  );
}
