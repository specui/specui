var bs = require('browser-sync').create(),
  historyApiFallback = require('connect-history-api-fallback');

bs.init({
  host: 'alpha.app.autocode.run',
  files: ['app/lib/*/**'],
  server: {
    baseDir: './app/lib',
    index: 'index.html'
  },
  port: 3001,
  middleware: [ historyApiFallback() ]
});