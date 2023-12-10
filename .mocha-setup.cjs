const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<main id="app"></main>', {
  url: 'http://localhost:5173'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.tmpl'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Handlebars.compile(contents);
}

require.extensions['.pcss'] = function () {
  module.exports = () => ({});
}
