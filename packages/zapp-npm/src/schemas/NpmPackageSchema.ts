export const NpmPackageSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    version: {
      type: 'string'
    },
    main: {
      type: 'string'
    },
    dependencies: {
      type: 'object',
      additionalProperties: {
        type: 'string'
      }
    },
    devDependencies: {
      type: 'object',
      additionalProperties: {
        type: 'string'
      }
    },
    hooks: {
      type: 'object',
      properties: {
        'pre-commit': {
          type: 'string'
        },
        'pre-push': {
          type: 'string'
        }
      }
    },
    links: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    scripts: {
      type: 'object',
      additionalProperties: {
        type: 'string'
      }
    }
  }
};
