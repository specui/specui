export const LicenseSchema = {
  type: 'object',
  properties: {
    author: {
      type: ['object', 'string'],
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
      },
    },
    license: {
      enum: ['Apache-2.0', 'GPL-2.0-only', 'GPL-3.0-only', 'ISC', 'MIT'],
      type: 'string',
    },
  },
};
