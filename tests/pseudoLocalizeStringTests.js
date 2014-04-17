var test = require('tape');
var sut = require('..');

test('Handles sprintf-formatted strings', function(t) {
	t.equal(
		sut.transformString("Single string %s place-holder."),
		"Šîîîñĝļééé šţŕîîîñĝ %s þļàààçééé-ĥôôôļðéééŕ."
	);
	t.equal(
		sut.transformString("Two %s string %s place-holders."),
		"Ţŵôôô %s šţŕîîîñĝ %s þļàààçééé-ĥôôôļðéééŕš."
	);
	t.equal(
		sut.transformString("This ends with a string place-holder %s"),
		"Ţĥîîîš éééñðš ŵîîîţĥ ààà šţŕîîîñĝ þļàààçééé-ĥôôôļðéééŕ %s"
	);
	t.equal(
		sut.transformString("This ends with two string place-holders %s%s"),
		"Ţĥîîîš éééñðš ŵîîîţĥ ţŵôôô šţŕîîîñĝ þļàààçééé-ĥôôôļðéééŕš %s%s"
	);
	t.equal(
		sut.transformString("Positional string %1$s place-holder."),
		"Þôôôšîîîţîîîôôôñàààļ šţŕîîîñĝ %1$s þļàààçééé-ĥôôôļðéééŕ."
	);
	t.equal(
		sut.transformString("Two positional %2$s string %1$s place-holders."),
		"Ţŵôôô þôôôšîîîţîîîôôôñàààļ %2$s šţŕîîîñĝ %1$s þļàààçééé-ĥôôôļðéééŕš."
	);
	t.equal(
		sut.transformString("Float %.2f place-holder."),
		"Ƒļôôôàààţ %.2f þļàààçééé-ĥôôôļðéééŕ."
	);
	t.end();
});

test('Handles HTML in strings', function(t) {
	t.equal(
		sut.transformString("Single <strong>bold</strong> string."),
		"Šîîîñĝļééé <strong>ƀôôôļð</strong> šţŕîîîñĝ."
	);
	t.equal(
		sut.transformString("Single <div class='etc'><span>nested</span></div> string."),
		"Šîîîñĝļééé <div class='etc'><span>ñéééšţéééð</span></div> šţŕîîîñĝ."
	);
	t.end();
});
