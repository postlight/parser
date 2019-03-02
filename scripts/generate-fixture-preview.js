/* eslint-disable */
const page = require('webpage').create();
const system = require('system');
const args = system.args;

const fixtures = args
  .slice(1)[0]
  .slice(0, -1)
  .split(',');
const totalRenders = fixtures.length;

var renderCount = 0;
function pageRenderComplete() {
  renderCount++;
  if (renderCount === totalRenders) {
    phantom.exit();
  } else {
    capturePage();
  }
}

function capturePage() {
  const fixturePath = fixtures[renderCount];
  page.viewportSize = { width: 1366, height: 768 };

  page.open(fixturePath, function() {
    // set default background to white (otherwise can sometimes get transparent bg in png
    const script =
      "function() { \
      var style = document.createElement('style'); \
      var text = document.createTextNode('body { background: #fff }'); \
      style.setAttribute('type', 'text/css'); \
      style.appendChild(text); \
      document.head.insertBefore(style, document.head.firstChild); \
    }";

    page.evaluateJavaScript(script);

    var filename = new Date();
    page.clipRect = { top: 0, left: 0, width: 1366, height: 768 };
    page.render('tmp/artifacts/' + fixturePath + '.png');
    pageRenderComplete();
  });
}

capturePage();
