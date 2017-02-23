import _ from 'lodash';

function objectToStrings(obj) {
	return _(Object.values(obj))
					.filter((val) => typeof val === 'string')
					.map(s => s.toLowerCase())
					.value();
}

function hammingFilter(collection, queryString, hammingThreshold) {

	// hamming distance of two equal length strings
	function hammingDistance(s1, s2) {
		return _(s1)
			.map((char, i) => {
				const code1 = char.charCodeAt(0);
				const code2 = s2.charCodeAt(i);
				return Math.abs(code1 - code2);
			})
			.sum();
	}

	// min hammingDistance where s1 is a possible substring of s2
	function minHammingDistance(s1, s2) {
		let min = Infinity;
		for (let i = 0; i <= s2.length - s1.length; i++) {
				min = Math.min(min, hammingDistance(s1, s2.substring(i, i+s1.length)));
				if (min === 0) {
					return 0;
				}
		}
		return min;
	}

	// score a candidate based on it's best matching string
	function scoreCandidate(tagList) {
		res = _(tagList)
						.map((str) => minHammingDistance(queryString, str))
						.min();
		return res;
	}

	return _.filter(collection, (obj) => (
		scoreCandidate(objectToStrings(obj)) <= hammingThreshold
	));
}

function strictFilter(collection, queryString) {
	function doesMatch(query, tagList) {
		return _.some(tagList, (str) => str.indexOf(query) !== -1);
	}

	return _.filter(collection, (obj) => doesMatch(queryString, objectToStrings(obj)));

}


export default function filter(collection, queryString, options = {}) {
	queryString = queryString.toLowerCase();
	const {useHamming, hammingThreshold = 0} = options;

	if (useHamming) {
		return hammingFilter(collection, queryString, hammingThreshold);
	} else {
		return strictFilter(collection, queryString);
	}
}
