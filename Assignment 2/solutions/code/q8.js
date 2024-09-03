const axios = require("axios");
const data = require("../json/q8.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let blockNumber, blockHash, cumulativeGasUsed, transactionIndex,result;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
		console.log(response.data);
		result = response.data.result;
        blockNumber = parseInt(result.blockNumber, 16);
        blockHash = result.blockHash;
        cumulativeGasUsed = parseInt(result.cumulativeGasUsed, 16);
        transactionIndex = parseInt(result.transactionIndex,16)
	});
	return [blockNumber, blockHash, cumulativeGasUsed, transactionIndex];
};

fetchData().then((response) => console.log(response));
