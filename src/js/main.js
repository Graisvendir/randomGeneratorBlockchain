let App = {
	web3Provider: null,
	contracts: {},

	/**
	 * create or attach to web3 provider
	 * call initContract
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
		App.initContract();
	},

	/**
	 * init contract:
	 * - read file from /builds/contracts
	 * - parce to JSON type(it is ABI of contract)
	 * - create object TruffleContract with this ABI and set provider
	 */
	initContract: function() {
		readTextFile('Generator.json')
			.then(function(result) {
				let abi = JSON.parse(result);
				App.contracts.Entereum = TruffleContract(abi);
				App.contracts.Entereum.setProvider(App.web3Provider);
				console.log('Contract ABI was found, start to interact with him');
			}).catch(function(error){
				throw error;
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