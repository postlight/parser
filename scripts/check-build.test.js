/* eslint-disable global-require, no-undef */
import assert from 'assert';
import cheerio from 'cheerio';

let urls = [
  {
    url: 'http://www.cnn.com/2016/11/05/middleeast/iraq-mosul-isis-offensive/',
    title: 'Iraqi troops storm town south of Mosul',
  },
  {
    url:
      'https://www.cnn.com/2018/10/12/us/before-after-aerial-images-mexico-beach-devastation-trnd/index.html',
    title:
      "Before and after images show there's nothing left in some parts of Mexico Beach",
  },
];

// don't run this on CI b/c we want to avoid network requests
if (process.env.CI) {
  describe('Tests', () => {
    it('do not run because this is CI and we do not want network requests', () => {
      assert.equal(true, true);
    });
  });
} else {
  if (cheerio.browser) {
    require('../dist/mercury.web');
  }
  const Merc =
    typeof Mercury === 'undefined' ? require('../dist/mercury') : Mercury;

  describe('Is Mercury build working', () => {
    beforeAll(() => {
      if (Merc.browser) {
        const proxyUrl = 'http://localhost:3000/';
        urls = urls.map(article => ({
          title: article.title,
          url: proxyUrl + article.url,
        }));
      }
    });

    urls.map(article =>
      it(`gets this title right ${article.title}`, done => {
        Merc.parse(article.url)
          .then(result => {
            assert.equal(article.title, result.title);
            done();
          })
          .catch(e => {
            console.log(e.name, e.message); // eslint-disable-line no-console
            assert.equal(true, false);
            done();
          });
      }, 10000)
    );
  });
}
