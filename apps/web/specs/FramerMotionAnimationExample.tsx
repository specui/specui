export const FramerMotionAnimationExample = {
  pages: {
    index: {
      elements: [
        {
          tag: 'div',
          class: ['flex', 'h-dvh', 'items-center', 'justify-center'],
          elements: [
            {
              tag: 'button',
              class: ['bg-red-400', 'h-48', 'w-48', 'rounded-2xl'],
              whileHover: {
                rotate: 180,
                scale: 1,
              },
              whileTap: {
                borderRadius: '100%',
                rotate: -90,
                scale: 0.8,
              },
            },
          ],
        },
      ],
    },
  },
};
