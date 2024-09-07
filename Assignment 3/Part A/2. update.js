require("dotenv").config();
const { Web3 } = require("web3");
const web3 = new Web3(require("./api_endpoint.json")["api_endpoint"]);

const contractABI = require("./contractABI.json");
const contractAddress = "0x61b0592cA07C420260f5D3d0d1ba7A0B7fDf7126";

const contract = new web3.eth.Contract(contractABI, contractAddress);

const privateKey = process.env.PRIVATE_KEY;
console.log(privateKey)
const updateContract = async(newName, newRoll) => {
	const account = web3.eth.accounts.privateKeyToAccount(privateKey);
	web3.eth.accounts.wallet.add(account);
    const gasPrice = await web3.eth.getGasPrice();
	
    const tx = {
		from: account.address,
		to: contractAddress,
		gas: 20000000,
        data: contract.methods.update(newName, newRoll).encodeABI(),
        gasPrice: gasPrice,
    };
    
	const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

	web3.eth
		.sendSignedTransaction(signedTx.rawTransaction)
		.on("receipt", console.log)
		.on("error", console.error);
}


updateContract("Dhruva S Kashyap", "24IM61R05");

