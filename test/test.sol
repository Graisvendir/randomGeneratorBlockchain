pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import '../contracts/Generator.sol';

contract test {

	Generator generator = Generator(DeployedAddresses.Generator());

	constructor() public {
		generator.addSeed(5);
		generator.addSeed(3);
		generator.addSeed(100);
	}

	function start() public returns (uint) {
		return generator.startGenerate();
	} 
}