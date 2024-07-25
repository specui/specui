export const TsConfigSchema = {
  type: 'object',
  properties: {
    compilerOptions: {
      type: 'object',
      properties: {
        jsx: {
          type: 'string'
        },
        outDir: {
          type: 'string'
        },
        lib: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        module: {
          type: 'string'
        },
        declaration: {
          type: 'boolean'
        },
        forceConsistentCasingInFileNames: {
          type: 'boolean'
        },
        noImplicitAny: {
          type: 'boolean'
        },
        noUnusedLocals: {
          type: 'boolean'
        },
        target: {
          type: 'boolean'
        },
        typeRoots: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    },
    include: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    exclude: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}