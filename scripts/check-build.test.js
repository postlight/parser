import assert from 'assert';
import Mercury from '../dist/mercury';

const urls = [
  {
    url: 'https://www.engadget.com/2016/11/03/google-slams-eus-antitrust-claims-against-adsense-and-shopping/',
    title: "Google slams EU's antitrust claims against AdSense and Shopping",
  },
  {
    url: 'https://bordeltabernacle.github.io/2016/01/04/notes-on-elixir-pattern-matching-maps.html',
    title: 'Notes on Elixir: Pattern-Matching Maps',
  },
  {
    url: 'http://www.nytimes.com/2016/11/05/us/politics/presidential-election.html?_r=0',
    title: 'Presidential Election: A Closing Act, With Clinton, Trump and a Tiny ‘Future Construction Worker’',
  },
  {
    url: 'http://www.latimes.com/local/lanow/la-me-ln-oakland-shooting-20161105-story.html',
    title: 'At least 8 injured in shooting in downtown Oakland; 2 arrested',
  },
  {
    url: 'http://www.npr.org/sections/thetwo-way/2016/11/05/500828716/u-s-supreme-court-reverses-ban-on-arizonas-ballot-collecting-law',
    title: 'U.S. Supreme Court Allows Arizona To Enforce Ban On Ballot-Collecting',
  },
  {
    url: 'http://www.cnn.com/2016/11/05/middleeast/iraq-mosul-isis-offensive/',
    title: 'Iraqi troops storm town south of Mosul',
  },
  {
    url: 'https://www.washingtonpost.com/news/post-nation/wp/2016/11/05/a-vile-and-disgusting-act-officer-accused-of-giving-fecal-sandwich-to-homeless-man-is-fired/',
    title: '‘A vile and disgusting act’: Officer accused of giving fecal sandwich to homeless man is fired',
  },
];

// don't run this on CI b/c we want to avoid network requests
if (process.env.CI) {
  describe('Tests', () => {
    it('do not run because this is CI and we do not want network requests', () => {
      assert.equal(true, true);
    })
  })
}

describe('Is Mercury build working', () => {
  urls.map(article =>
    it(`gets this title right ${article.title}`, (done) => {
      Mercury.parse(article.url).then((result) => {
        assert.equal(article.title, result.title);
        done();
      }).catch(() => {
        assert.equal(true, false);
        done();
      });
    })
  );
});
