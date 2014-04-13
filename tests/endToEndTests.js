var fs = require('fs');
var path = require('path');
var test = require('tape');
var sut = require('..');
var Gettext = require("node-gettext");
var gt = new Gettext();

test('Parses PO file properly', function (t) {
	var output = sut({
		fileContents: fs.readFileSync(path.join(__dirname, '/fixtures/messages.po'))
	}).toString();
	var expected = fs.readFileSync(path.join(__dirname, '/fixtures/expected.po')).toString();
	t.equal(output, expected);
	t.end();
});

test('Parses POT file properly', function (t) {
	var output = sut({
		fileContents: fs.readFileSync(path.join(__dirname, '/fixtures/messages.pot')),
		potFile: true
	});

	gt.addTextdomain("output", output);
	gt.addTextdomain("expected", fs.readFileSync(path.join(__dirname, '/fixtures/expected.po')));

	var expectedKeys = gt.listKeys("expected", "");

	expectedKeys.forEach(function(key) {
		t.equal(gt.dgettext("output", key), gt.dgettext("expected", key));
	});
	t.end();
});
