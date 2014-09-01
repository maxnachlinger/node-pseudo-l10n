var fs = require('fs');
var path = require('path');
var test = require('tape');
var sut = require('..');
var Gettext = require("node-gettext");

test('Parses PO file properly', function (t) {
	var output = sut({
		fileContents: fs.readFileSync(path.resolve(__dirname, 'fixtures/messages.po'))
	});

	var gt = new Gettext();
	gt.addTextdomain("output", output);
	gt.addTextdomain("expected", fs.readFileSync(path.resolve(__dirname, 'fixtures/expected.po')));

	gt.listKeys("expected", "").forEach(function(key) {
		t.equal(gt.dgettext("output", key), gt.dgettext("expected", key));
	});
	t.end();
});

test('Parses POT file properly', function (t) {
	var output = sut({
		fileContents: fs.readFileSync(path.resolve(__dirname, 'fixtures/messages.pot')),
		potFile: true
	});

	var gt = new Gettext();
	gt.addTextdomain("output", output);
	gt.addTextdomain("expected", fs.readFileSync(path.resolve(__dirname, 'fixtures/expected.po')));

	gt.listKeys("expected", "").forEach(function(key) {
		t.equal(gt.dgettext("output", key), gt.dgettext("expected", key));
	});
	t.end();
});
