const fs = require('fs').promises
const path = require('path')
const {transform} = require('..')
const Gettext = require('node-gettext')
const gettextParser = require('gettext-parser')

describe('transform() tests', () => {

  const poMsgIds = [
    'Single string %s place-holder.',
    'A test message',
    'This ends with a string place-holder %s',
    'This ends with two string place-holders %s%s',
    'Positional string %1$s place-holder.',
    'Two positional %2$s string %1$s place-holders.',
    'Float %.2f place-holder.',
    'You have <b>%d day</b> left.'
  ]

  it('parses PO files properly', async () => {
    const gt = new Gettext()
    const expectedSrc = await fs.readFile(path.join(__dirname, './fixtures/expected.po'))

    gt.addTranslations('test', 'expected', gettextParser.po.parse(expectedSrc))

    const output = await transform({
      filePath: path.join(__dirname, './fixtures/messages.po')
    })

    gt.addTranslations('test', 'output', gettextParser.po.parse(output))
    gt.setLocale('test')

    poMsgIds.forEach((msgId) => {
      expect(gt.dgettext('output', msgId)).toEqual(gt.dgettext('expected', msgId))
    })
  })

  it('parses POT files properly', async () => {
    const gt = new Gettext()
    const expectedSrc = await fs.readFile(path.join(__dirname, './fixtures/expected.po'))

    gt.addTranslations('test', 'expected', gettextParser.po.parse(expectedSrc))

    const output = await transform({
      filePath: path.join(__dirname, './fixtures/messages.pot')
    })

    gt.addTranslations('test', 'output', gettextParser.po.parse(output))
    gt.setLocale('test')

    poMsgIds.forEach((msgId) => {
      expect(gt.dgettext('output', msgId)).toEqual(gt.dgettext('expected', msgId))
    })
  })
})
