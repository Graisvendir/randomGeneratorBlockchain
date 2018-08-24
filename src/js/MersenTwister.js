/**
 * object of generator
 */
let MersenTwister = {
	MT: [],
	index: 0,
	/**
	 * start generating
	 * @param {number} inp some seed
	 */
	initializeGenerator: function(inp) {
		index = 0;
		MT = []
		MT[0] = inp;
		for (let i = 1; i < 623; i++) {
			MT[i] = (0x6c078965 * (MT[i-1] ^ (MT[i-1] >> 30)) + i);
		}
	},
	
	generateNumbers: function() {
		for (let i = 0; i < 623; i++) {
			let y = (MT[i] & 0x80000000) + (MT[(i + 1) % 624] & 0x7fffffff);
			MT[i] = MT[(i + 397) % 624] ^ (y >> 1);
			if (y % 2 != 0) {
				MT[i] = MT[i] ^ 0x9908b0df;
			}
		}
	},
	/**
	 * used to extract random number
	 * @returns {number} random number
	 */
	extractNumber: function() {
		if (index === 0) {
			this.generateNumbers();
		}
		let y = MT[index];
		
		y = y ^ (y >> 11);
		y = y ^ (y << 7 & (0x9d2c5680));
		y = y ^ (y << 15 & (0xefc60000)); // 0xefc60000
		y = y ^ (y >> 18);
		index = (index + 1) % 624;
		return y;
	}
}