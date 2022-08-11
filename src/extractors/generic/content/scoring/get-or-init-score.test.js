import assert from 'assert';
import cheerio from 'cheerio';

import { getOrInitScore, getScore } from './index';

describe('getOrInitScore(node, $)', () => {
  describe('when score set', () => {
    it("returns score if node's score already set", () => {
      const $ = cheerio.load('<p score="40">Foo</p>');
      const score = getOrInitScore($('p').first(), $);

      assert.equal(score, 40);
    });
  });

  describe('when no score set', () => {
    it('returns 0 if no class/id and text < 25 chars', () => {
      const $ = cheerio.load('<p>Foo</p>');
      const score = getOrInitScore($('p').first(), $);

      assert.equal(score, 0);
    });

    it('returns score if no class/id and has commas/length', () => {
      const $ = cheerio.load(
        `<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>`
      );
      const score = getOrInitScore($('p').first(), $);

      assert.equal(score, 19);
    });

    it('returns greater score if weighted class/id is set', () => {
      const $ = cheerio.load(
        `<p class="entry">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>`
      );
      const score = getOrInitScore($('p').first(), $);

      assert.equal(score, 44);
    });

    it('gives 1/4 of its score to its parent', () => {
      const $ = cheerio.load(`
        <div>
          <p class="entry">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        </div>
      `);

      const $node = $('p').first();
      getOrInitScore($node, $);
      assert.equal(getScore($node.parent()), 16);
    });
  });
});
