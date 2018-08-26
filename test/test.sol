pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import '../contracts/Generator.sol';

contract test {

	function testBeforeCleanLength() public {
		Generator generator = Generator(DeployedAddresses.Generator());
		generator.addSeed(5);
		generator.addSeed(3);
		generator.addSeed(100);
		uint[] memory seed = generator.getSeed();
		Assert.equal(seed.length, 3, 'should be 3');
		
		generator.startGenerate();
	}

	function testAfterCleanLength() public {
		Generator generator = Generator(DeployedAddresses.Generator());
		generator.addSeed(5);
		generator.addSeed(3);
		generator.addSeed(100);
		generator.startGenerate();
		uint[] memory seed = generator.getSeed();
		Assert.equal(seed.length, 0, 'should be 0');
	} 
}