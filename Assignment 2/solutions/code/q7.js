const axios = require("axios");
const data = require("../json/q7.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let peerCount;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
		console.log(response.data);
		peerCount = response.data.result;
	});
	return parseInt(peerCount, 16);
};

fetchData().then((response) => console.log(response));
