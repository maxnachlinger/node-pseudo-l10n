#node-pseudo-i18n

Turns a PO or POT file into [pseudo-localized](http://en.wikipedia.org/wiki/Pseudolocalization) PO file.

[![Build Status](https://travis-ci.org/maxnachlinger/node-pseudo-i18n.png?branch=master)](https://travis-ci.org/maxnachlinger/node-pseudo-i18n)

### Installation:
```
npm install node-pseudo-i18n
```
### Usage:
```javascript
"use strict";
var pseudoLoc = require('node-pseudo-i18n');
var fs = require('fs');

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

Copyright (c) 2014 Max Nachlinger
