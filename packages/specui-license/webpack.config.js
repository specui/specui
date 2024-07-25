const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: '@specui/license',
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
    '@specui/core': '@specui/core',
    '@specui/handlebars': '@specui/handlebars',
    tsconfig: 'tsconfig',
  },
};
