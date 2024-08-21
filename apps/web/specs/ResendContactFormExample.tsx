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
          style: {
            background: 'radial-gradient(circle, rgba(0,166,255,1) 0%, rgba(22,27,32,1) 100%)',
          },
          elements: [
            {
              tag: 'form',
              action: 'sendMessage',
              class: ['flex', 'flex-col', 'gap-2'],
              elements: [
                {
                  tag: 'h1',
                  class: ['mb-2', 'text-center', 'text-3xl', 'text-white'],
                  text: 'Contact Us',
                },
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
                    'bg-black flex gap-2 items-center justify-center p-2 rounded-lg text-white hover:bg-gray-800',
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
                {
                  tag: 'p',
                  class: ['flex gap-1', 'justify-center', 'text-white', 'text-xs'],
                  elements: [
                    {
                      tag: 'span',
                      text: 'Powered by',
                    },
                    {
                      tag: 'a',
                      class: 'text-gray-200 hover:text-white underline',
                      href: 'https://resend.com',
                      text: 'Resend',
                      target: '_blank',
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
          style: {
            background: 'radial-gradient(circle, rgba(0,166,255,1) 0%, rgba(22,27,32,1) 100%)',
          },
          elements: [
            {
              tag: 'h1',
              class: 'text-2xl text-white',
              text: 'Thanks for your message!',
            },
            {
              tag: 'p',
              class: 'text-gray-200',
              text: 'We will get back to you shortly',
            },
            {
              tag: 'a',
              class:
                'bg-black flex gap-2 items-center justify-center mt-2 p-2 rounded-lg text-white hover:bg-gray-800',
              href: '/',
              elements: [
                {
                  tag: 'span',
                  text: 'Start Over',
                },
                {
                  icon: 'fa-redo',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
