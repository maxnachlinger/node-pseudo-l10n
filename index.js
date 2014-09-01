var fs = require('fs');
var path = require('path');
var gettextParser = require('gettext-parser');
var pseudoLocalizeString = require('./lib/pseudoLocalizeString');

module.exports = function (params, cb) {
	var filePath = params.filePath;
	var headerLanguage = params.headerLanguage || 'test';
	var charMap = params.charMap;

	var locStr = pseudoLocalizeString(charMap);

	var ext = path.extname(filePath).toLowerCase();
	var parse = gettextParser.po.parse;
	var compile = gettextParser.po.compile;

	if (ext === '.mo') {
		parse = gettextParser.mo.parse;
		compile = gettextParser.mo.compile;
	}

	fs.readFile(filePath, function(err, fileContents) {
		var parsed = parse(fileContents);
		parsed.headers['language'] = headerLanguage;

		var translations = parsed.translations;

		Object.keys(translations).forEach(function (catalog) {
			Object.keys(translations[catalog]).forEach(function (key) {
				if (key.length === 0) return;

				var strObj = translations[catalog][key];

				if(~['.mo','.po'].indexOf(ext)) {
					strObj.msgstr = strObj.msgstr.map(locStr);
					return;
				}

				// POT file
				strObj.msgstr[0] = locStr(strObj.msgid);
				if (strObj.msgid_plural)
					strObj.msgstr[1] = locStr(strObj.msgid_plural);
			});
		});

		var po = compile(parsed);
		cb(null, po);
	});
};

module.exports.transformString = function(s, charMap) {
	return pseudoLocalizeString(charMap)(s);
};
