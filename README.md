#node-pseudo-l10n
Turns a PO or POT file into [pseudo-localized](http://en.wikipedia.org/wiki/Pseudolocalization) PO file.

[![NPM](https://nodei.co/npm/node-pseudo-l10n.png)](https://nodei.co/npm/node-pseudo-l10n/)

[![Build Status](https://travis-ci.org/maxnachlinger/node-pseudo-l10n.png?branch=master)](https://travis-ci.org/maxnachlinger/node-pseudo-l10n)

### Installation:
```
npm install node-pseudo-l10n
```
### Usage:
```javascript
"use strict";
var pseudoLoc = require('node-pseudo-l10n');
var fs = require('fs');

// for a single string
pseudoLoc.transformString('This ends with a string place-holder %s');
// returns 'Ţĥîîîš éééñðš ŵîîîţĥ ààà šţŕîîîñĝ þļàààçééé-ĥôôôļðéééŕ %s'

// for PO files
pseudoLoc({
    fileContents: fs.readFileSync('someFile.po')
}, function(err, poFileBuffer) {
    fs.writeFileSync('pseudo.po');
});

// for POT files
pseudoLoc({
    fileContents: fs.readFileSync('someFile.pot'),
    potFile: true // pass this to indicate that it's a POT file
}, function(err, poFileBuffer) {
    fs.writeFileSync('pseudo.po');
});
```

### Why would I use pseudo localization?
It's one of the fastest ways to test if your app can be localized (without going through the pain of full localization). 

### What's pseudo-localized text look like?
Here's a some text ``This ends with a string place-holder %s`` pseudo-localized ``Ţĥîîîš éééñðš ŵîîîţĥ ààà šţŕîîîñĝ þļàààçééé-ĥôôôļðéééŕ %s``.

Copyright (c) 2014 Max Nachlinger
