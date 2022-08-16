import assert from 'assert';
import cheerio from 'cheerio';

import { scoreParagraph } from './index';

describe('Scoring utils', () => {
  describe('scoreParagraph(node)', () => {
    it('returns 0 if text is less than 25 chars', () => {
      const $ = cheerio.load('<p><em>Foo</em> bar</p>');
      const score = scoreParagraph($('p').first());

      assert.equal(score, 0);
    });

    it('returns 1 if text is > 25 chars and has 0 commas', () => {
      const $ = cheerio.load('<p>Lorem ipsum dolor sit amet</p>');
      const score = scoreParagraph($('p').first());

      assert.equal(score, 1);
    });

    it('returns 3 if text is > 25 chars and has 2 commas', () => {
      const $ = cheerio.load('<p>Lorem ipsum, dolor sit, amet</p>');
      const score = scoreParagraph($('p').first());

      assert.equal(score, 3);
    });

    it('returns 19 if text has 15 commas, ~600 chars', () => {
      const $ = cheerio.load(
        `<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>`
      );
      const score = scoreParagraph($('p').first());

      assert.equal(score, 19);
    });
  });
});
