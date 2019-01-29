const {transformString} = require('..')

describe('transformString() tests', () => {

  it('transforms sprintf-formatted strings', () => {
    [
      {
        input: 'Single string %s place-holder.',
        expected: 'Šîîîñĝļééé šţŕîîîñĝ %s þļàààçééé-ĥôôôļðéééŕ.'
      },
      {
        input: 'Two %s string %s place-holders.',
        expected: 'Ţŵôôô %s šţŕîîîñĝ %s þļàààçééé-ĥôôôļðéééŕš.'
      },
      {
        input: 'This ends with a string place-holder %s',
        expected: 'Ţĥîîîš éééñðš ŵîîîţĥ ààà šţŕîîîñĝ þļàààçééé-ĥôôôļðéééŕ %s'
      },
      {
        input: 'This ends with two string place-holders %s%s',
        expected: 'Ţĥîîîš éééñðš ŵîîîţĥ ţŵôôô šţŕîîîñĝ þļàààçééé-ĥôôôļðéééŕš %s%s'
      },
      {
        input: 'Positional string %1$s place-holder.',
        expected: 'Þôôôšîîîţîîîôôôñàààļ šţŕîîîñĝ %1$s þļàààçééé-ĥôôôļðéééŕ.'
      },
      {
        input: 'Two positional %2$s string %1$s place-holders.',
        expected: 'Ţŵôôô þôôôšîîîţîîîôôôñàààļ %2$s šţŕîîîñĝ %1$s þļàààçééé-ĥôôôļðéééŕš.'
      },
      {
        input: 'Float %.2f place-holder.',
        expected: 'Ƒļôôôàààţ %.2f þļàààçééé-ĥôôôļðéééŕ.'
      }
    ].forEach(({input, expected}) => expect(transformString(null, input)).toEqual(expected))
  })

  it('Handles HTML in strings', () => {
    [
      {
        input: 'Single <strong>bold</strong> string.',
        expected: 'Šîîîñĝļééé <strong>ƀôôôļð</strong> šţŕîîîñĝ.'
      },
      {
        input: 'Single <div class=\'etc\'><span>nested</span></div> string.',
        expected: 'Šîîîñĝļééé <div class=\'etc\'><span>ñéééšţéééð</span></div> šţŕîîîñĝ.'
      }
    ].forEach(({input, expected}) => expect(transformString(null, input)).toEqual(expected))
  })
})
