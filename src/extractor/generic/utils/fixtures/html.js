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
}

export default HTML
