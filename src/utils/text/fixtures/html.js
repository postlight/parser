const HTML = {
  // getWeight fixtures
  positiveId: `
    <div id="entry">
      <p>Ooo good one</p>
    </div>
  `,
  negativeId: `
    <div id="adbox">
      <p>Ooo good one</p>
    </div>
  `,
  positiveClass: `
    <div class="entry">
      <p>Ooo good one</p>
    </div>
  `,
  negativeClass: `
    <div id="comment ad">
      <p>Ooo good one</p>
    </div>
  `,
  positiveIdAndClass: `
    <div id="article" class="entry">
      <p>Ooo good one</p>
    </div>
  `,
  positiveIdNegClass: `
    <div id="article" class="adbox">
      <p>Ooo good one</p>
    </div>
  `,
  positivePhotoClass: `
    <div class="figure">
      <p>Ooo good one</p>
    </div>
  `,
  positiveIdAndPhoto: `
    <div id="article" class="figure">
      <p>Ooo good one</p>
    </div>
  `,
  entryContentAsset: `
    <div id="foo" class="entry-content-asset">
      <p>Ooo good one</p>
    </div>
  `,

  // stripUnlikelyCandidates
  noMatches: `
    <div id="foo">
      <p>Ooo good one</p>
    </div>
  `,
  whitelistMatch: {
    before: `
      <div class="header">Stuff</div>
      <div class="article">
        <p>Ooo good one</p>
      </div>
    `,
    after: `
      <div class="article">
        <p>Ooo good one</p>
      </div>
    `,
  },
  whiteAndBlack: {
    before: `
      <div class="article adbox">
        <p>Ooo good one</p>
      </div>
    `,
    after: `
      <div class="article adbox">
        <p>Ooo good one</p>
      </div>
    `,
  },
  whiteInsideBlack: {
    before: `
      <div>
        <div class="adbox">
          <div class="article">
            <p>Ooo good one</p>
          </div>
        </div>
        <div>Something unrelated</div>
      </div>
    `,
    after: `
      <div>
        <div>Something unrelated</div>
      </div>
    `,
  },

  // brsToPs
  singleBr: {
    before: `
      <div class="article adbox">
        <br>
        <p>Ooo good one</p>
      </div>
    `,
    after: `
      <div class="article adbox">
        <br>
        <p>Ooo good one</p>
      </div>
    `,
  },
  doubleBrs: {
    before: `
      <div class="article adbox">
        <br />
        <br />
        <p>Ooo good one</p>
      </div>
    `,
    after: `
      <div class="article adbox">
        <p> </p><p>Ooo good one</p>
      </div>
    `,
  },
  severalBrs: {
    before: `
      <div class="article adbox">
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>Ooo good one</p>
      </div>
    `,
    after: `
      <div class="article adbox">
        <p> </p><p>Ooo good one</p>
      </div>
    `,
  },
  brsInP: {
    before: `
      <p>
        Here is some text
        <br />
        <br />
        Here is more text
      </p>
    `,
    after: `
      <p>
        Here is some text
      <p>
        Here is more text
     </p></p>
    `,
  },
  paragraphize: {
    before: `
      <p>
        Here is some text
        <br />
        Here is more text
        <span>And also this</span>
      </p>
    `,
    after: `
      <p>
        Here is some text
      <p>
        Here is more text
        <span>And also this</span>
      </p></p>
    `,
  },
  paragraphizeBlock: {
    before: `
      <p>
        Here is some text
        <br />
        Here is more text
        <div>And also this</div>
      </p>
    `,
    after: `
      <p>
        Here is some text
      <p>
        Here is more text
      </p><div>And also this</div>
      </p>
    `,
  },

  // convertToParagraphs
  convertToParagraphs: {
    before: `
      <p>
        Here is some text
        <span>This should remain in a p</span>
        <br />
        <br />
        This should be wrapped in a p
        <div>This should become a p</div>
      </p>
      <span>This should become a p</span>
    `,
    after: `
      <p>
        Here is some text
        <span>This should remain in a p</span>
      <p>
        This should be wrapped in a p
      </p><p>This should become a p</p>
      </p> <p>This should become a p</p>
    `,
  },

  // linkDensity
  linkDensity5: `
    <div><p>Some text!</p><p><a href="">Some text!</a></p> </div>
  `,
  linkDensity1: `
    <div><p><a href="">Some text!</a></p></div>
  `,
  linkDensity0: `
    <div><p><a href=""></a></p></div>
  `,

  // rewriteTopLevel
  rewriteHTMLBody: {
    before: `
    <html><body><div><p><a href="">Wow how about that</a></p></div></body></html>
    `,
    after: `
    <div><div><div><p><a href="">Wow how about that</a></p></div></div></div>
    `,
  },

  // cleanImages
  cleanSmallImages: {
    before: `
    <div>
      <img width="5" height="5" />
      <img width="50" />
    </div>
    `,
    after: `
    <div>
      <img width="50">
    </div>
    `,
  },
  cleanHeight: {
    before: `
    <div>
      <img width="50" height="50" />
    </div>
    `,
    after: `
    <div>
      <img width="50">
    </div>
    `,
  },
  cleanSpacer: {
    before: `
    <div>
      <img src="/foo/bar/baz/spacer.png" />
      <img src="/foo/bar/baz/normal.png" />
      <p>Some text</p>
    </div>
    `,
    after: `
    <div>
      <img src="/foo/bar/baz/normal.png">
      <p>Some text</p>
    </div>
    `,
  },
  // stripJunkTags
  stripsJunk: {
    before: `
    <div>
      <style>.red { color: 'red'; }</style>
      <title>WOW</title>
      <link rel="asdflkjawef" />
      <p>What an article</p>
      <script type="text/javascript">alert('hi!');</script>
      <noscript>Don't got it</noscript>
      <hr />
    </div>
    `,
    after: `
    <div>
      <p>What an article</p>
    </div>
    `,
  },

  // stripHOnes
  removeTwoHOnes: {
    before: `
    <div>
      <h1>Look at this!</h1>
      <p>What do you think?</p>
      <h1>Can you believe it?!</h1>
    </div>
    `,
    after: `
    <div>
      <p>What do you think?</p>
    </div>
    `,
  },
  convertThreeHOnes: {
    before: `
      <div>
        <h1>Look at this!</h1>
        <p>What do you think?</p>
        <h1>Can you believe it?!</h1>
        <p>What do you think?</p>
        <h1>Can you believe it?!</h1>
      </div>
    `,
    after: `
      <div>
        <h2>Look at this!</h2>
        <p>What do you think?</p>
        <h2>Can you believe it?!</h2>
        <p>What do you think?</p>
        <h2>Can you believe it?!</h2>
      </div>
    `,
  },

  // cleanAttributes
  removeStyle: {
    before: `
      <div>
        <p style="color: red;">What do you think?</p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
      </div>
    `,
  },
  removeAlign: {
    before: `
      <div>
        <p style="color: red;" align="center">What do you think?</p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
      </div>
    `,
  },

  // removeEmpty
  removeEmptyP: {
    before: `
      <div>
        <p>What do you think?</p>
        <p></p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
      </div>
    `,
  },
  doNotRemoveBr: {
    before: `
      <div>
        <p>What do you think?</p>
        <p></p>
        <div></div>
        <p>What do you think?</p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
        <div></div>
        <p>What do you think?</p>
      </div>
    `,
  },
  doNotNested: {
    before: `
      <div>
        <p>What do you think?</p>
        <p><img src="foo/bar.jpg" /></p>
        <p><iframe src="foo/bar.jpg" /></p>
        <p>What do you think?</p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
        <p><img src="foo/bar.jpg" /></p>
        <p>What do you think?</p>
      </div>
    `,
  },

  // cleanConditionally
  dropNegativeScore: {
    before: `
      <div>
        <p>What do you think?</p>
        <p>
          <ul score="-10">
            <li>Foo</li>
            <li>Bar</li>
          </ul>
        </p>
        <p>What do you think?</p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
        <p>
        </p>
        <p>What do you think?</p>
      </div>
    `,
  },
  removeTooManyInputs: {
    before: `
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
    `,
    after: `
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
    `,
  },
  removeShortNoImg: {
    before: `
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
    `,
    after: `
      <div>
        <p>What do you think?</p>
        <div>
          <p>Keep this one</p>
          <img src="asdf">
        </div>
      </div>
    `,
  },

  linkDensityHigh: {
    before: `
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
        </ul>
      </div>
    `,
    after: `
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
    `,
  },
  goodScoreTooDense: {
    before: `
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
    `,
    after: `
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
    `,
  },
  previousEndsInColon: {
    before: `
      <div weight="40">
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
    `,
  },
  cleanEntryContentAsset: {
    before: `
      <div score="100">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu.</p>
        <ul score="20" class="entry-content-asset">
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
          <li><a href="#">Lose this one</a></li>
        </ul>
      </div>
    `,
  },

  // normalizeSpaces
  normalizeSpaces: {
    before: `
      <div>
        <p>What do you think?</p>
      </div>
    `,
    after: 'What do you think?',
  },
  normalizeSpacesPreserve: {
    before: `
      <div>
        <p>What   do  you    think?</p>
        <pre>  What     happens to        spaces?    </pre>
      </div>
    `,
    after:
      '<div> <p>What do you think?</p> <pre>  What     happens to        spaces?    </pre> </div>',
  },

  // cleanHeaders
  cleanFirstHeds: {
    before: `
      <div>
        <h2>Lose me</h2>
        <p>What do you think?</p>
        <h2>Keep me</h2>
        <p>What do you think?</p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
        <h2>Keep me</h2>
        <p>What do you think?</p>
      </div>
    `,
  },
  cleanTitleMatch: {
    before: `
      <div>
        <p>What do you think?</p>
        <h2>Title Match</h2>
        <p>What do you think?</p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
      </div>
    `,
  },
  dropWithNegativeWeight: {
    before: `
      <div>
        <p>What do you think?</p>
        <h2 class="advert">Bad Class, Bad Weight</h2>
        <p>What do you think?</p>
      </div>
    `,
    after: `
      <div>
        <p>What do you think?</p>
        <p>What do you think?</p>
      </div>
    `,
  },
};

export default HTML;
