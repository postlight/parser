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

  // convertNodeToP
  convertNodeToP: {
    before: '<div>Should become a p</div>',
    after: '<p>Should become a p</p>',
  }
}

export default HTML
