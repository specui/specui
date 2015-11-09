var bs = require('browser-sync').create(),
  historyApiFallback = require('connect-history-api-fallback');

bs.init({
  host: process.env.AUTOCODE_APP_HOST,
  files: ['app/lib/*/**'],
  server: {
    baseDir: './app/lib',
    index: 'index.html'
  },
  ghostMode: false,
  port: 3001,
  notify: false,
  middleware: [ historyApiFallback() ]
});