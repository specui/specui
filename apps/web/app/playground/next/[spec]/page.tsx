import { Metadata } from 'next';
import { Playground } from '@/components/Playground/Playground';
import { safeDump } from 'js-yaml';
import { FramerMotionAnimationExample } from '@/specs/FramerMotionAnimationExample';
import { NextSpec } from '@/specs/NextSpec';
import { TauriDesktopAppExample } from '@/specs/TauriDesktopAppExample';
import { ResendContactFormExample } from '@/specs/ResendContactFormExample';

const PhotographyWebsiteExampleSpec = `
title: LensCraft
name: LensCraft
version: 1.0.0
license: MIT
description: A professional photography portfolio website
author:
  name: John Doe
  email: john.doe@lenscraft.com
  url: https://lenscraft.com
components:
  header:
    elements:
      - tag: header
        class:
          - flex
          - justify-between
          - items-center
          - bg-gray-900
          - text-white
          - p-5
        elements:
          - tag: div
            class:
              - flex
              - items-center
            elements:
              - tag: span
                text: LensCraft
                class:
                  - text-white
                  - text-2xl
                  - font-bold
          - tag: nav
            elements:
              - tag: a
                text: Portfolio
                href: /
                class:
                  - text-white
                  - mr-4
              - tag: a
                text: About
                href: /about
                class:
                  - text-white
                  - mr-4
              - tag: a
                text: Contact
                href: /contact
                class:
                  - text-white
  footer:
    elements:
      - tag: footer
        class:
          - bg-gray-800
          - text-white
          - p-5
        elements:
          - tag: div
            class:
              - flex
              - justify-center
              - items-center
              - flex-wrap
              - max-w-7xl
              - mx-auto
            elements:
              - tag: div
                class: w-full text-center
                elements:
                  - tag: p
                    text: "© 2024 LensCraft. All rights reserved."
              - tag: div
                class:
                  - flex
                  - gap-2
                  - pt-2
                elements:
                  - tag: a
                    href: https://twitter.com/lenscraft
                    class: text-white ml-2
                    elements:
                      - icon: fa-twitter
                  - tag: a
                    href: https://facebook.com/lenscraft
                    class: text-white ml-2
                    elements:
                      - icon: fa-facebook
                  - tag: a
                    href: https://instagram.com/lenscraft
                    class: text-white ml-2
                    elements:
                      - icon: fa-instagram
  photoCard:
    props:
      imageUrl:
        type: string
    elements:
      - tag: div
        elements:
          - tag: img
            class:
              - aspect-video
              - w-full
              - object-cover
            src: $props.imageUrl
            alt: $props.title
pages:
  index:
    elements:
      - component: header
      - tag: section
        class:
          - relative
          - text-white
        elements:
          - tag: img
            src: https://images.unsplash.com/photo-1496450080853-5f78c43af9e9
            alt: Featured Photography
            class: w-full max-h-96 object-cover
          - tag: div
            class:
              - absolute
              - bottom-5
              - left-5
              - bg-black
              - bg-opacity-60
              - p-5
            elements:
              - tag: h1
                text: Capturing Moments, One Shot at a Time
                class: text-3xl font-bold
              - tag: p
                text: Explore the world through the lens of John Doe.
                class:
                  - mt-2
                  - max-w-md
      - tag: section
        class:
          - p-5
          - bg-gray-100
        elements:
          - tag: h2
            text: Portfolio
            class:
              - text-xl
              - mb-4
              - text-center
              - font-bold
              - text-black
          - tag: div
            class:
              - grid
              - grid-cols-1
              - md:grid-cols-2
              - lg:grid-cols-3
              - gap-4
            elements:
              - component: photoCard
                props:
                  imageUrl: https://images.unsplash.com/photo-1485550409059-9afb054cada4
              - component: photoCard
                props:
                  imageUrl: https://plus.unsplash.com/premium_photo-1679314213957-909df10381ac
              - component: photoCard
                props:
                  imageUrl: https://images.unsplash.com/photo-1513151233558-d860c5398176
              - component: photoCard
                props:
                  imageUrl: https://images.unsplash.com/photo-1508138221679-760a23a2285b
              - component: photoCard
                props:
                  imageUrl: https://plus.unsplash.com/premium_photo-1665657351688-3f147227034d
              - component: photoCard
                props:
                  imageUrl: https://images.unsplash.com/photo-1458682625221-3a45f8a844c7
              - component: photoCard
                props:
                  imageUrl: https://images.unsplash.com/photo-1521133573892-e44906baee46
              - component: photoCard
                props:
                  imageUrl: https://images.unsplash.com/photo-1513171920216-2640b288471b
              - component: photoCard
                props:
                  imageUrl: https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba
              - component: photoCard
                props:
                  imageUrl: https://images.unsplash.com/photo-1613117943706-39d3eea7be72
      - component: footer

  about:
    elements:
      - component: header
      - tag: section
        id: about
        class:
          - p-10
          - bg-white
          - text-gray-800
        elements:
          - tag: h1
            text: About Me
            class:
              - text-3xl
              - mb-6
              - text-center
              - font-bold
          - tag: div
            class:
              - max-w-3xl
              - mx-auto
              - text-center
            elements:
              - tag: img
                src: https://images.unsplash.com/profile-1546920894438-679365bc0e30
                alt: John Doe
                class:
                  - w-48
                  - h-48
                  - rounded-full
                  - mx-auto
                  - mb-6
              - tag: p
                text: John Doe is a professional photographer with over 10 years of experience in capturing the essence of moments through his lens. From landscapes to portraits, his work tells a story in every frame.
                class: mb-4
              - tag: p
                text: Based in New York, John has traveled the world to bring back stunning images that inspire and captivate viewers. His work has been featured in numerous publications and exhibitions.
                class: mb-4
              - tag: p
                text: In addition to his professional work, John offers workshops and one-on-one coaching for aspiring photographers, sharing his knowledge and passion for the craft.
                class: mb-4
      - component: footer

  contact:
    elements:
      - component: header
      - tag: section
        id: contact
        class:
          - p-10
          - bg-white
          - text-gray-800
        elements:
          - tag: h1
            text: Contact Me
            class:
              - text-3xl
              - mb-6
              - text-center
              - font-bold
          - tag: div
            class:
              - max-w-lg
              - mx-auto
            elements:
              - tag: p
                text: If you'd like to get in touch, please fill out the form below. I look forward to hearing from you!
                class:
                  - mb-6
                  - text-center
              - tag: form
                class:
                  - flex
                  - flex-col
                  - space-y-4
                elements:
                  - tag: input
                    type: text
                    placeholder: Your Name
                    class:
                      - p-3
                      - bg-gray-100
                      - border
                      - border-gray-300
                      - rounded
                  - tag: input
                    type: email
                    placeholder: Your Email
                    class:
                      - p-3
                      - bg-gray-100
                      - border
                      - border-gray-300
                      - rounded
                  - tag: textarea
                    placeholder: Your Message
                    class:
                      - p-3
                      - bg-gray-100
                      - border
                      - border-gray-300
                      - rounded
                      - h-32
                  - tag: button
                    type: submit
                    text: Send Message
                    class:
                      - bg-red-600
                      - text-white
                      - p-3
                      - rounded
                      - cursor-pointer
      - component: footer
`;

const ShadcnAccordionExampleSpec = `
title: shadcn Accordion Example
description: A vertically stacked set of interactive headings that each reveal a section of content.
pages:
  index:
    elements:
      - tag: section
        class:
          - flex
          - h-dvh
          - items-center
          - justify-center
        elements:
          - component: accordion
            class: w-96
            collapsible: true
            elements:
              - component: accordion-item
                value: item-1
                elements:
                  - component: accordion-trigger
                    text: Can my laptop get jet lag?
                  - component: accordion-content
                    text: |
                      Luckily, your laptop doesn't need a nap after crossing time zones!
                      But you might want to give it a break from all that binge-watching
                      on the flight.
              - component: accordion-item
                value: item-2
                elements:
                  - component: accordion-trigger
                    text: Will my phone work on Mars?
                  - component: accordion-content
                    text: |
                      While we're not quite there yet, you can still take some
                      out-of-this-world photos! Just make sure to enable airplane mode
                      during your interplanetary travels. And who knows—one day, we
                      might just have 5G on Mars!
              - component: accordion-item
                value: item-3
                elements:
                  - component: accordion-trigger
                    text: Can I charge my devices with a coconut?
                  - component: accordion-content
                    text: |
                      As cool as that would be, coconuts aren't quite ready to
                      replace your power bank. But hey, you can always enjoy some
                      coconut water while your devices charge the old-fashioned way!
`;

const VercelAnalyticsExample = `
title: Vercel Analytics Example
pages:
  index:
    elements:
      - tag: section
        class:
          - flex
          - flex-col
          - h-dvh
          - items-center
          - justify-center
        text: Hello World
vercel:
  analytics: true
`;

const SpinningLoaderExample = `
title: Spinning Loader Example
components:
  loader:
    props:
      text:
        type: string
    elements:
      - tag: div
        class:
          - flex
          - h-dvh
          - gap-2
          - items-center
          - justify-center
        elements:
          - tag: div
            text: $props.text
          - icon: fa-spinner
            class: animate-spin
pages:
  index:
    elements:
      - component: loader
        props:
          text: Loading tweets
`;

export function generateMetadata({
  params,
}: {
  params: {
    spec: string;
  };
}): Metadata {
  return {
    title: 'Next.js Playground - SpecUI',
    description: 'Build UIs with Specs',
    openGraph: {
      images: [`https://specui.org/api/og?path=/playground/next/${params.spec}`],
      title: 'Next.js Playground - SpecUI',
      url: 'https://specui.org/playground/next',
    },
  };
}

export default function PlaygroundNextPage({
  params,
}: {
  params: {
    spec: string;
  };
}) {
  const specs: Record<string, string> = {
    'framer-motion-animation-example': safeDump(FramerMotionAnimationExample),
    'spinning-loader-example': SpinningLoaderExample,
    'photography-website-example': PhotographyWebsiteExampleSpec,
    'resend-contact-form-example': safeDump(ResendContactFormExample),
    'shadcn-accordion-example': ShadcnAccordionExampleSpec,
    'tauri-desktop-app-example': safeDump(TauriDesktopAppExample),
    'vercel-analytics-example': VercelAnalyticsExample,
  };

  const spec = specs[params.spec] || safeDump(NextSpec);

  return (
    <main
      className="flex flex-col align-middle justify-center mx-auto"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Playground generator="next" spec={spec.trim()} />
    </main>
  );
}
