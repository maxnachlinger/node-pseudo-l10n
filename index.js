var gettextParser = require('gettext-parser');
var pseudoLocalizeString = require('./lib/pseudoLocalizeString');

function doIt(fileContents, charMap) {
	pseudoLocalizeString = pseudoLocalizeString(charMap);

	var parsedPo = gettextParser.po.parse(fileContents);
	var translations = parsedPo.translations;

	console.log(parsedPo);
	Object.keys(translations).forEach(function (catalog) {
		Object.keys(translations[catalog]).forEach(function (msgId) {
			if (msgId.length === 0) return;
//			console.log(msgId, translations[catalog][msgId]);
		});
	});
}

doIt(require('fs').readFileSync('./messages.po'));
