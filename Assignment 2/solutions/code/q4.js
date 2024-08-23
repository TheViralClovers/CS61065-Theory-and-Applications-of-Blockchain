const axios = require("axios");
const data = require("../json/q4.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let totalDifficulty, blockNumber, parentHash, root;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
        totalDifficulty = response.data.difficulty
        blockNumber = response.data.number
        parentHash = response.data.parentHash
        root = response.data.stateRoot
        console.log(response)
	});
	return [totalDifficulty,blockNumber,parentHash,root];
};

fetchData().then((data) => console.log(data));
