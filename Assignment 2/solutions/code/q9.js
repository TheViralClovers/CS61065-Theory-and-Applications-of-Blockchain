const axios = require("axios");
const data = require("../json/q9.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let transactionCount;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
		console.log(response.data);
		transactionCount = response.data.result;
	});
	return parseInt(transactionCount, 16);
};

fetchData().then((response) => console.log(response));
