import cheerio from 'cheerio';

import { assertClean } from 'test-helpers';

import { cleanTags } from './index';

describe('cleanTags($)', () => {
  it('drops a matching node with a negative score', () => {
    const $ = cheerio.load(`
      <div score="5">
        <p>What do you think?</p>
        <p>
          <ul score="-10">
            <li>Foo</li>
            <li>Bar</li>
          </ul>
        </p>
        <p>What do you think?</p>
      </div>
    `);

    const result = cleanTags($('*').first(), $);
    // again small adjustments for cheerio vs. jquery implementation quirks
    // not functionally significant
    assertClean(
      result.html(),
      cheerio.browser
        ? `
          <div score="5">
            <p>What do you think?</p>
            <p>
            </p>
            <p></p>
            <p>What do you think?</p>
          </div>
        `
        : `
          <div score="5">
            <p>What do you think?</p>
            <p>
            </p>
            <p>What do you think?</p>
          </div>
        `
    );
  });

  it('removes a node with too many inputs', () => {
    const $ = cheerio.load(`
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <div>
          <p>What is your name?</p>
          <input type="text"></input>
          <p>What is your name?</p>
          <input type="text"></input>
          <p>What is your name?</p>
          <input type="text"></input>
        </div>
        <p>What do you think?</p>
      </div>
    `);

    const result = cleanTags($('*').first(), $);
    $('[score]').each((i, e) => $(e).removeAttr('score'));

    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
        <p>What do you think?</p>
      </div>
    `
    );
  });

  it('removes a div with no images and very little text', () => {
    const $ = cheerio.load(`
      <div>
        <p>What do you think?</p>
        <div>
          <p>Keep this one</p>
          <img src="asdf" />
        </div>
        <div>
          <p>Lose this one</p>
        </div>
      </div>
    `);

    const result = cleanTags($('*').first(), $);
    $('[score]').each((i, e) => $(e).removeAttr('score'));

    assertClean(
      result.html(),
      `
      <div>
        <p>What do you think?</p>
        <div>
          <p>Keep this one</p>
          <img src="asdf">
        </div>
      </div>
    `
    );
  });

  it('removes a node with a link density that is too high', () => {
    const $ = cheerio.load(`
      <div score="0">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
        </ul>
        <ul score="20">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `);

    const result = cleanTags($('*').first(), $);
    $('[score]').each((i, e) => $(e).removeAttr('score'));

    assertClean(
      result.html(),
      `
      <div>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
        </ul>
      </div>
    `
    );
  });

  it('removes a node with a good score but link density > 0.5', () => {
    const $ = cheerio.load(`
      <div score="0">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
        </ul>
        <ul score="20">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `);

    const result = cleanTags($('*').first(), $);
    $('[score]').each((i, e) => $(e).removeAttr('score'));

    assertClean(
      result.html(),
      `
      <div>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
          <li>Keep this one</li>
        </ul>
      </div>
    `
    );
  });

  it('keeps node with a good score but link density > 0.5 if preceding text ends in colon', () => {
    const html = `
      <div score="40">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <p>Now read these links: </p>
        <ul score="30">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `;
    const $ = cheerio.load(html);

    const result = cleanTags($('*').first(), $);
    assertClean(result.html(), html);
  });

  it('keeps anything with a class of entry-content-asset', () => {
    const html = `
      <div score="100">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul score="20" class="entry-content-asset">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `;
    const $ = cheerio.load(html);

    const result = cleanTags($('*').first(), $);
    assertClean(result.html(), html);
  });
});
