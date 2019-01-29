### node-pseudo-l10n
Turns a PO, MO, or POT file into a [pseudo-localized](http://en.wikipedia.org/wiki/Pseudolocalization) PO file.

[![NPM](https://nodei.co/npm/node-pseudo-l10n.png)](https://nodei.co/npm/node-pseudo-l10n/)

[![Build Status](https://travis-ci.org/maxnachlinger/node-pseudo-l10n.svg?branch=master)](https://travis-ci.org/maxnachlinger/node-pseudo-l10n) [![Greenkeeper badge](https://badges.greenkeeper.io/maxnachlinger/node-pseudo-l10n.svg)](https://greenkeeper.io/)

### Installation:
```
npm install node-pseudo-l10n
```
### Usage:
```javascript
const pseudoLoc = require('node-pseudo-l10n');

// for a single string
pseudoLoc.transformString('This ends with a string place-holder %s');
// returns 'Ţĥîîîš éééñðš ŵîîîţĥ ààà šţŕîîîñĝ þļàààçééé-ĥôôôļðéééŕ %s'

// for PO or POT files
const pseudoLocPoFileContents = await pseudoLoc.transform({
  filePath: './someFile.po'
});
```

### Why would I use pseudo localization?
It's one of the fastest ways to test if your app can be localized (without going through the pain of full localization). 

### What's pseudo-localized text look like?
Here's a some text ``This ends with a string place-holder %s`` pseudo-localized ``Ţĥîîîš éééñðš ŵîîîţĥ ààà šţŕîîîñĝ þļàààçééé-ĥôôôļðéééŕ %s``.

Copyright (c) 2014 Max Nachlinger
