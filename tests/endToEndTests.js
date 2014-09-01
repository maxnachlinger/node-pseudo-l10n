var fs = require('fs');
var path = require('path');
var test = require('tape');
var sut = require('..');
var Gettext = require("node-gettext");

test('Parses PO file properly', function (t) {
	var gt = new Gettext();
	gt.addTextdomain("expected", fs.readFileSync(path.resolve(__dirname, 'fixtures/expected.po')));

	sut({
		filePath: path.resolve(__dirname, 'fixtures/messages.po')
	}, function(err, output) {
		gt.addTextdomain("output", output);
		gt.listKeys("expected", "").forEach(function(key) {
			t.equal(gt.dgettext("output", key), gt.dgettext("expected", key));
		});
		t.end();
	});
});

test('Parses POT file properly', function (t) {
	var gt = new Gettext();
	gt.addTextdomain("expected", fs.readFileSync(path.resolve(__dirname, 'fixtures/expected.po')));

	sut({
		filePath: path.resolve(__dirname, 'fixtures/messages.pot')
	}, function(err, output) {
		gt.addTextdomain("output", output);
		gt.listKeys("expected", "").forEach(function(key) {
			t.equal(gt.dgettext("output", key), gt.dgettext("expected", key));
		});
		t.end();
	});
});
