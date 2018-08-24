'use strict';

function buttonGenerateSeed() {
	MersenTwister.initializeGenerator(new Date().getMilliseconds());
	let value = MersenTwister.extractNumber();
	document.getElementById("value").value = value;
}

function buttonAddSeed() {
	let seed = document.getElementById('value').value;
	App.addSeed(seed);
	console.log('seed added');
}

function buttonGetSeed() {
	let allSeeds = App.getSeed();
	for (let i = 0; i < allSeeds.length; i++){
		document.getElementById('seeds').innerHTML += '<tr><p>' + allSeeds[i] + '</p></tr>';
	}
}

function buttondGenerate() {
	App.startGenerating();
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