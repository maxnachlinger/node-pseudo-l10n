var gettextParser = require('gettext-parser');
var pseudoLocalizeString = require('./lib/pseudoLocalizeString');

module.exports = function (params, cb) {
	var fileContents = params.fileContents;
	var headerLanguage = params.headerLanguage || 'test';
	var charMap = params.charMap;
	var potFile = params.potFile;

	var locStr = pseudoLocalizeString(charMap);

	var parsed = gettextParser.po.parse(fileContents);
	parsed.headers['language'] = headerLanguage;

	var translations = parsed.translations;

	Object.keys(translations).forEach(function (catalog) {
		Object.keys(translations[catalog]).forEach(function (key) {
			if (key.length === 0) return;

			var strObj = translations[catalog][key];

			// PO file
			if(!potFile) {
				strObj.msgstr = strObj.msgstr.map(locStr);
				return;
			}

			// POT file
			strObj.msgstr[0] = locStr(strObj.msgid);
			if (strObj.msgid_plural)
				strObj.msgstr[1] = locStr(strObj.msgid_plural);
		});
	});

	var po = gettextParser.po.compile(parsed);
	if (!cb) return po;

	cb(null, po);
};

module.exports.transformString = function(s, charMap) {
	return pseudoLocalizeString(charMap)(s);
};
