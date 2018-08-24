pragma solidity ^0.4.24;

contract MersenTwister {
    
	function initializeGenerator(uint inp, uint index, uint[624] MT) private pure returns (uint, uint[624]) {
		index = 0;
		MT[0] = inp;
		for (uint i = 1; i < 623; i++) {
			MT[i] = (0x6c078965 * (MT[i - 1] ^ (MT[i - 1] >> 30)) + i);
		}
		return (index, MT);
	}
	
	function generateNumbers(uint[624] MT) private pure returns (uint[624]) {
		for (uint i = 0; i < 623; i++) {
			uint y = (MT[i] & 0x80000000) + (MT[(i + 1) % 624] & 0x7fffffff);
			MT[i] = MT[(i + 397) % 624] ^ (y >> 1);
			if (y % 2 != 0) {
				MT[i] = MT[i] ^ 0x9908b0df;
			}
		}
		return MT;
	}
	
	function extractNumber(uint index, uint y) private pure returns (uint, uint) {
		y = y ^ (y >> 11);
		y = y ^ (y << 7 & (0x9d2c5680));
		y = y ^ (y << 15 & (0xefc60000)); // 0xefc60000
		y = y ^ (y >> 18);
		index = (index + 1) % 624;
		return (index, y);
	}
	
	function generateRandomNumber(uint input) public pure returns (uint) {
	    uint[624] memory MT;
	    uint index;
	    uint generatedNumber = 0;
	    (input, MT) = initializeGenerator(input, index, MT);
	    if (index == 0) {
			MT = generateNumbers(MT);
		}
		(index, generatedNumber) = extractNumber(index, MT[index]);
		return generatedNumber;
	}
}


contract Generator is MersenTwister {
	
	uint[] private seed;
	
	event AddNewSeed(uint _seed, address from);
	event RandomNumberGenerated(int number, address whoStart);

	constructor() public {
	}
	
	function getSeed() public view returns(uint[]) {
		return seed;
	}
	
	function addSeed(uint _seed) public returns(bool) {
		seed.push(_seed);
		emit AddNewSeed(_seed, msg.sender);
		return true;
	}
	
	function startGenerate() public returns (uint) {
		uint comparedNumber = 0;
		for (uint i = 0; i < seed.length; i++){
			comparedNumber = comparedNumber ^ seed[i];
		}
		seed.length = 0;
		return generateRandomNumber(comparedNumber);
	}
	
}