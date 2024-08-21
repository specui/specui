export const ResendContactFormExample = {
  actions: {
    sendMessage: {
      props: {
        name: {
          required: true,
          type: 'string',
        },
        email: {
          required: true,
          type: 'string',
        },
        message: {
          required: true,
          type: 'string',
        },
      },
      operations: [
        {
          type: 'sendEmail',
          data: {
            from: 'Acme <onboarding@resend.dev>',
            replyTo: '$props.email',
            to: 'you@example.org',
            subject: 'New Message',
            html: '$props.message',
          },
        },
        {
          type: 'redirect',
          path: '/success',
        },
      ],
    },
  },
  pages: {
    index: {
      elements: [
        {
          tag: 'div',
          class: ['flex', 'h-dvh', 'items-center', 'justify-center'],
          elements: [
            {
              tag: 'form',
              action: 'sendMessage',
              class: ['flex', 'flex-col', 'gap-2'],
              elements: [
                {
                  tag: 'input',
                  class: 'p-2 rounded-lg dark:text-black',
                  name: 'name',
                  placeholder: 'Name',
                  required: true,
                },
                {
                  tag: 'input',
                  class: 'p-2 rounded-lg dark:text-black',
                  name: 'email',
                  placeholder: 'Email',
                  required: true,
                },
                {
                  tag: 'textarea',
                  class: 'p-2 rounded-lg dark:text-black',
                  name: 'message',
                  placeholder: 'Message',
                  required: true,
                },
                {
                  tag: 'button',
                  class:
                    'bg-purple-800 flex gap-2 items-center justify-center p-2 rounded-lg hover:bg-purple-600',
                  elements: [
                    {
                      tag: 'span',
                      text: 'Send Message',
                    },
                    {
                      icon: 'fa-arrow-right',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    success: {
      elements: [
        {
          tag: 'div',
          class: ['flex', 'flex-col', 'gap-2', 'h-dvh', 'items-center', 'justify-center'],
          elements: [
            {
              tag: 'h1',
              class: 'text-2xl',
              text: 'Thanks for your message!',
            },
            {
              tag: 'p',
              class: 'text-gray-500',
              text: 'We will get back to you shortly',
            },
            {
              tag: 'a',
              class:
                'bg-purple-800 flex gap-2 items-center justify-center mt-2 p-2 rounded-lg hover:bg-purple-600',
              href: '/',
              elements: [
                {
                  tag: 'span',
                  text: 'Start Over',
                },
                {
                  icon: 'fa-arrow-right',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
