const axios = require("axios");
const data = require("../json/q2.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let latestBlockNumber;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
		console.log(response.data);
        latestBlockNumber = response.data.result;
	});
	return parseInt(latestBlockNumber, 16);
};

fetchData().then((response) => console.log(response));
