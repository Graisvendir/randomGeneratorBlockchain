'use strict';

function buttonAddSeed() {
	let seed = document.getElementById('seed').value;
	App.addSeed(seed);
}

function buttonGetSeed() {

}

function buttondGenerate() {
	this.initializeGenerator(new Date().getMilliseconds());
	let value = this.extractNumber();
	document.getElementById("value").value = value;
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