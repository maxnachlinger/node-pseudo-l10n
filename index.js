const fs = require('fs').promises
const path = require('path')
const gettextParser = require('gettext-parser')

const defaultCharMap = {
  'a': 'ààà',
  'b': 'ƀ',
  'c': 'ç',
  'd': 'ð',
  'e': 'ééé',
  'f': 'ƒ',
  'g': 'ĝ',
  'h': 'ĥ',
  'i': 'îîî',
  'l': 'ļ',
  'k': 'ķ',
  'j': 'ĵ',
  'm': 'ɱ',
  'n': 'ñ',
  'o': 'ôôô',
  'p': 'þ',
  'q': 'ǫ',
  'r': 'ŕ',
  's': 'š',
  't': 'ţ',
  'u': 'ûûû',
  'v': 'ṽ',
  'w': 'ŵ',
  'x': 'ẋ',
  'y': 'ý',
  'z': 'ž',
  'A': 'ÀÀÀ',
  'B': 'Ɓ',
  'C': 'Ç',
  'D': 'Ð',
  'E': 'ÉÉÉ',
  'F': 'Ƒ',
  'G': 'Ĝ',
  'H': 'Ĥ',
  'I': 'ÎÎÎ',
  'L': 'Ļ',
  'K': 'Ķ',
  'J': 'Ĵ',
  'M': 'Ṁ',
  'N': 'Ñ',
  'O': 'ÔÔÔ',
  'P': 'Þ',
  'Q': 'Ǫ',
  'R': 'Ŕ',
  'S': 'Š',
  'T': 'Ţ',
  'U': 'ÛÛÛ',
  'V': 'Ṽ',
  'W': 'Ŵ',
  'X': 'Ẋ',
  'Y': 'Ý',
  'Z': 'Ž'
}

const ignoreMap = {
  // html
  '<': (char) => char === '>',
  // sprintf
  '%': (char) => ~[' ', ',', ':', ';', '?', '!', '[', '/', '-', '(', '<', '{'].indexOf(char)
}

// you can override the charMap if you'd like
const transformString = (charMap, str) => {
  if (!str || str.length === 0) {
    return str
  }

  const localCharMap = charMap || defaultCharMap
  const {result} = str.split('').reduce(({ignoreFn, result}, char, idx) => {

    // if we can stop ignoring
    if (ignoreFn && ignoreFn(char, idx)) {
      ignoreFn = null
    }

    if (!ignoreFn) {
      // if we need to start ignoring
      ignoreFn = ignoreMap[char]

      if (!ignoreFn && localCharMap[char]) {
        char = localCharMap[char]
      }
    }

    result += char
    return {ignoreFn, result}
  }, {ignoreFn: null, result: ''})
  return result
}

const transform = async ({
                           filePath,
                           headerLanguage = 'test',
                           charMap
                         }) => {

  const locStr = (s) => transformString(charMap, s)

  const ext = path.extname(filePath).toLowerCase()

  const {parse, compile} = ext === '.mo'
    ? gettextParser.mo
    : gettextParser.po

  const fileContents = await fs.readFile(filePath)

  const parsed = parse(fileContents)
  parsed.headers['language'] = headerLanguage

  parsed.translations = Object.keys(parsed.translations).reduce((acc0, catalog) => {
    acc0[catalog] = Object.keys(parsed.translations[catalog]).reduce((acc1, key) => {
      acc1[key] = parsed.translations[catalog][key]

      if (!key || key.length === 0) {
        return acc1
      }

      if (~['.mo', '.po'].indexOf(ext)) {
        acc1[key].msgstr = acc1[key].msgstr.map(locStr)
        return acc1
      }

      // pot file
      acc1[key].msgstr[0] = locStr(acc1[key].msgid)
      if (acc1[key].msgid_plural) {
        acc1[key].msgstr[1] = locStr(acc1[key].msgid_plural)
      }

      return acc1
    }, {})

    return acc0
  }, {})

  return compile(parsed)
}

module.exports = {transform, transformString}
