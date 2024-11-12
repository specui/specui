import { clsx } from 'clsx';
import Hero from '@/components/Hero';
import { TypingEffect } from '@/components/TypingEffect';

export default function IndexPage() {
  return (
    <>
      <Hero title="Build UIs with Specs" />
      <div className="flex gap-4 mx-auto max-w-6xl">
        <nav>
          <ul>
            <li>Home</li>
          </ul>
        </nav>
        <TypingEffect>
          # yaml-language-server: $schema=./schema.json title: Todo name: todo-list description: a
          simple to-do list example components: header: elements: - tag: header class: - bg-gray-900
          - p-4 - flex - justify-between elements: - tag: h1 text: SpecUI - component: menu menu:
          elements: - tag: nav elements: - tag: ul class: flex gap-2 elements: - tag: li elements: -
          tag: a href: / text: Home - tag: li elements: - tag: a href: /features text: Features -
          tag: li elements: - tag: a href: /about text: About - tag: li elements: - tag: a href:
          /contact text: Contact pages: /: elements: - component: header - tag: div class: -
          bg-blue-800 - flex - p-32 - justify-center - items-center - uppercase - text-8xl text:
          Spec. Preview. Ship. /about: elements: - component: header /contact: elements: -
          component: header
        </TypingEffect>
      </div>
    </>
  );
}
