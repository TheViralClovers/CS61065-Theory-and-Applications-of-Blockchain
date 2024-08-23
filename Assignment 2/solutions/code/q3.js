const axios = require("axios");
const data = require("../json/q3.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let balance;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
		console.log(response.data);
		balance = response.data.result;
	});
	return parseInt(balance, 16);
};

fetchData().then((response) => console.log(response));
