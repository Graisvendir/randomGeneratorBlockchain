pragma solidity ^0.4.24;

contract MersenTwister{
	
	uint[] private MT = new uint[](624);
	uint private index;
	
	function initializeGenerator(uint inp) internal {
		index = 0;
		MT[0] = inp;
		for (uint i = 1; i < 623; i++) {
			MT[i] = (0x6c078965 * (MT[i-1] ^ (MT[i-1] >> 30)) + i);
		}
	}
	
	function generateNumbers() public {
		for (uint i = 0; i < 623; i++) {
			uint y = (MT[i] & 0x80000000) + (MT[(i + 1) % 624] & 0x7fffffff);
			MT[i] = MT[(i + 397) % 624] ^ (y >> 1);
			if (y % 2 != 0) {
				MT[i] = MT[i] ^ 0x9908b0df;
			}
		}
	}
	
	function extractNumber() public returns (uint) {
		if (index == 0) {
			generateNumbers();
		}
		uint y = MT[index];
		 
		y = y ^ (y >> 11);
		y = y ^ (y << 7 & (0x9d2c5680));
		y = y ^ (y << 15 & (0xefc60000)); // 0xefc60000
		y = y ^ (y >> 18);
		index = (index + 1) % 624;
		return y;
	}
}


contract Generator is MersenTwister{
	
	uint[] private seed;
	
	constructor() public{
	}
	
	function getSeed() public view returns(uint[]){
		return seed;
	}
	
	function addSeed(uint _seed) public returns(bool){
		seed.push(_seed);
		return true;
	}
	
	function startGenerate() public {
		uint generatedNumber = 0;
		for (uint i = 0; i < seed.length; i++){
			generatedNumber = generatedNumber + seed[i];
		}
		initializeGenerator(generatedNumber);
	}
	
}