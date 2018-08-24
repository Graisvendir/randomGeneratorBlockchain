let App = {
	web3Provider: null,
	contracts: {},

	/**
	 * create or attach to web3 provider
	 */
	initWeb3: function() {
		// Is there an injected web3 instance?
		if (typeof web3 !== 'undefined') {
			App.web3Provider = web3.currentProvider;
			console.log('Web3 Provider was found, take him');
		} else {
			// If no injected web3 instance is detected, fall back to Ganache
			App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
			console.log('Web3 Provider was not found, create Http Provider on http://127.0.0.1:8545');
		}
		web3 = new Web3(App.web3Provider);
	},

	/**
	 * init contract:
	 * - read file from /builds/contracts
	 * - parce to JSON type(it is ABI of contract)
	 * - create object TruffleContract with this ABI and set provider
	 */
	initContract: function() {
		return new Promise(function(onSuccess, onReject) {
			readTextFile('Generator.json')
				.then(function(result) {
					let abi = JSON.parse(result);
					App.contracts.Entereum = TruffleContract(abi);
					App.contracts.Entereum.setProvider(App.web3Provider);
					onSuccess();
				}).catch(function(error){
					throw error;
				});
			});
	}, 

	/**
	 * return all added seeds
	 * @returns {array}
	 */
	getSeed: function() {
		App.contracts.Generator.deployed()
			.then(function(instance) {
				return instance.getSeed.call();
			}).then(function(seed) {
				console.log(seed);
				return seed;
			}).catch(function(err) {
				throw err;
			});
	},
	/**
	 * add new seed to blockchain
	 * @param {number} newSeed
	 */
	addSeed: function(newSeed) {
		web3.eth.getAccounts(function(error, accounts){
			if (error) {
				throw error;
			}
			let account = accounts[0];
			console.log(123155);
			App.contracts.Generator.deployed()
				.then(function(instance) {
					return instance.addSeed(newSeed, {from: account});
				}).then(function(event) {
					console.log(event.log);
				}), function(err) {
					console.log(err.message);
					throw err;
				}
		});
	},

	/**
	 * run generating random number
	 * @returns {number} 
	 */
	startGenerating: function() {
		web3.eth.getAccounts(function(error, accounts){
			if (error){
				throw error;
			}
			let account = accounts[0];

			App.contracts.Generator.deployed()
				.then(function(instance) {
					return instance.startGenerate.call(); 
				}).catch(function(error){
					throw error; 
				});
		});
	}
};  

/**
 * read file via XMLHttpRequest
 * @param {string} file name of file 
 */
function readTextFile(file){
	let promise = new Promise(function(onSuccess, onError){
		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, true);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4){
				onSuccess(rawFile.responseText);
			}
		}
		rawFile.send();
	});

	return promise;
}