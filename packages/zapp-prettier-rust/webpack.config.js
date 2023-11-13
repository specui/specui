const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/standalone.ts',
  output: {
    filename: 'standalone.js',
    path: path.resolve(__dirname, 'dist'),
    library: '@zappjs/prettier-rust',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.hbs$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.hbs', '.ts'],
  },
  externals: {
    '@zappjs/core': '@zappjs/core',
    '@zappjs/json': '@zappjs/json',
    tsconfig: 'tsconfig'
  },
};
