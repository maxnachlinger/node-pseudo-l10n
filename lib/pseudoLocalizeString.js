// you can override the charMap if you'd like
module.exports = function(charMap) {
	charMap = charMap || {
		'a': 'à', 'b': 'ƀ', 'c': 'ç', 'd': 'ð', 'e': 'é', 'f': 'ƒ', 'g': 'ĝ', 'h': 'ĥ', 'i': 'î', 'l': 'ļ', 'k': 'ķ', 'j': 'ĵ', 'm': 'ɱ',
		'n': 'ñ', 'o': 'ô', 'p': 'þ', 'q': 'ǫ', 'r': 'ŕ', 's': 'š', 't': 'ţ', 'u': 'û', 'v': 'ṽ', 'w': 'ŵ', 'x': 'ẋ', 'y': 'ý', 'z': 'ž',
		'A': 'À', 'B': 'Ɓ', 'C': 'Ç', 'D': 'Ð', 'E': 'É', 'F': 'Ƒ', 'G': 'Ĝ', 'H': 'Ĥ', 'I': 'Î', 'L': 'Ļ', 'K': 'Ķ', 'J': 'Ĵ', 'M': 'Ṁ',
		'N': 'Ñ', 'O': 'Ô', 'P': 'Þ', 'Q': 'Ǫ', 'R': 'Ŕ', 'S': 'Š', 'T': 'Ţ', 'U': 'Û', 'V': 'Ṽ', 'W': 'Ŵ', 'X': 'Ẋ', 'Y': 'Ý', 'Z': 'Ž'
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
