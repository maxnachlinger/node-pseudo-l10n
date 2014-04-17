// you can override the charMap if you'd like
module.exports = function (charMap) {
	charMap = charMap || {
		'a': 'ààà', 'b': 'ƀ', 'c': 'ç', 'd': 'ð', 'e': 'ééé', 'f': 'ƒ', 'g': 'ĝ', 'h': 'ĥ', 'i': 'îîî', 'l': 'ļ', 'k': 'ķ', 'j': 'ĵ', 'm': 'ɱ',
		'n': 'ñ', 'o': 'ôôô', 'p': 'þ', 'q': 'ǫ', 'r': 'ŕ', 's': 'š', 't': 'ţ', 'u': 'ûûû', 'v': 'ṽ', 'w': 'ŵ', 'x': 'ẋ', 'y': 'ý', 'z': 'ž',
		'A': 'ÀÀÀ', 'B': 'Ɓ', 'C': 'Ç', 'D': 'Ð', 'E': 'ÉÉÉ', 'F': 'Ƒ', 'G': 'Ĝ', 'H': 'Ĥ', 'I': 'ÎÎÎ', 'L': 'Ļ', 'K': 'Ķ', 'J': 'Ĵ', 'M': 'Ṁ',
		'N': 'Ñ', 'O': 'ÔÔÔ', 'P': 'Þ', 'Q': 'Ǫ', 'R': 'Ŕ', 'S': 'Š', 'T': 'Ţ', 'U': 'ÛÛÛ', 'V': 'Ṽ', 'W': 'Ŵ', 'X': 'Ẋ', 'Y': 'Ý', 'Z': 'Ž'
	};

	return function (str) {
		if (!str || str.length == 0) return str;

		var ignoreMap = {
			// html
			'<': function (char, idx) {
				return char === '>';
			},
			// sprintf
			'%': function (char, idx) {
				return ~[' ', ',', ':', ';', '?', '!', '[', '/', '-', '(', '<', '{'].indexOf(char)
			}
		};

		var output = '';
		var char, ignoreFn;

		for (var i = 0, c = str.length; i < c; i++) {
			char = str[i];

			// if we can stop ignoring
			if (ignoreFn && ignoreFn(char, i))
				ignoreFn = null;

			if (!ignoreFn) {
				// if we need to start ignoring
				ignoreFn = ignoreMap[char];

				if (!ignoreFn && charMap[char])
					char = charMap[char];
			}

			output += char;
		}

		return output;
	};
};
