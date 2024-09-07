const { Web3 } = require("web3");
const web3 = new Web3(require("./api_endpoint.json")["api_endpoint"]);

const contractABI = require("./contractABI.json");
const contractAddress = "0x61b0592cA07C420260f5D3d0d1ba7A0B7fDf7126";
const contract = new web3.eth.Contract(contractABI, contractAddress);
const addressToQuery = "0x328Ff6652cc4E79f69B165fC570e3A0F468fc903";

contract.methods
	.get(addressToQuery)
	.call()
	.then((result) => {
		console.log("Name:", result[0]);
        console.log("Roll:", result[1]);
        console.log(result)
	})
	.catch((err) => {
		console.error("Error fetching data:", err);
    });
    

