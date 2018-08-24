'use strict';

function GenerateNumberForSeed() {
	let value = MersenTwister.generateNumberLocaly(new Date().getMilliseconds());
	document.getElementById("value").value = value;
}

function pushSeedToBlockchain() {
	let seed = document.getElementById('value').value;
	App.addSeed(seed)
		.then(
			() => {
				console.log('seed added');
			}
		);
}

function getSeedFromBlockchainAndPublish() {
	App.getSeed()
		.then(
			(allSeeds) => {
				for (let i = 0; i < allSeeds.length; i++){
					document.getElementById('seeds').innerHTML += '<tr><p>' + allSeeds[i] + '</p></tr>';
				}
			}
		);
}

function generateNumberOnBlockchain() {
	App.startGeneratingOnBlockchain();
}

function onDocumentLoad(){
	App.initWeb3();
	document.getElementById("connection").innerHTML = "yes";
	App.initContract()
		.then(
			() => {
				console.log('Contract ABI was found, start to interact with him');
				document.getElementById("interact").innerHTML = "yes";
			}
		);
}