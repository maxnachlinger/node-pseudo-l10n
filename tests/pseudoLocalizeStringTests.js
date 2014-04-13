var test = require('tape');
var sut = require('../lib/pseudoLocalizeString')();

test('Handles sprintf-formatted strings', function(t) {
	t.equal(
		sut("Single string %s place-holder."),
		"Šîñĝļé šţŕîñĝ %s þļàçé-ĥôļðéŕ."
	);
	t.equal(
		sut("Two %s string %s place-holders."),
		"Ţŵô %s šţŕîñĝ %s þļàçé-ĥôļðéŕš."
	);
	t.equal(
		sut("This ends with a string place-holder %s"),
		"Ţĥîš éñðš ŵîţĥ à šţŕîñĝ þļàçé-ĥôļðéŕ %s"
	);
	t.equal(
		sut("This ends with two string place-holders %s%s"),
		"Ţĥîš éñðš ŵîţĥ ţŵô šţŕîñĝ þļàçé-ĥôļðéŕš %s%s"
	);
	t.equal(
		sut("Positional string %1$s place-holder."),
		"Þôšîţîôñàļ šţŕîñĝ %1$s þļàçé-ĥôļðéŕ."
	);
	t.equal(
		sut("Two positional %2$s string %1$s place-holders."),
		"Ţŵô þôšîţîôñàļ %2$s šţŕîñĝ %1$s þļàçé-ĥôļðéŕš."
	);
	t.equal(
		sut("Float %.2f place-holder."),
		"Ƒļôàţ %.2f þļàçé-ĥôļðéŕ."
	);
	t.end();
});

test('Handles HTML in strings', function(t) {
	t.equal(
		sut("Single <strong>bold</strong> string."),
		"Šîñĝļé <strong>ƀôļð</strong> šţŕîñĝ."
	);
	t.equal(
		sut("Single <div class='etc'><span>nested</span></div> string."),
		"Šîñĝļé <div class='etc'><span>ñéšţéð</span></div> šţŕîñĝ."
	);
	t.end();
});
