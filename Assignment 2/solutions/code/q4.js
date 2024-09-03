const axios = require("axios");
const data = require("../json/q4.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let totalDifficulty, blockNumber, parentHash, root;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
        totalDifficulty = response.data.result.difficulty
        blockNumber = parseInt(response.data.result.number,16)
        parentHash = response.data.result.parentHash
        root = response.data.result.stateRoot
        console.log(response.data)
	});
	return [totalDifficulty,blockNumber,parentHash,root];
};

fetchData().then((data) => console.log(data));
