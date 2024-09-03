const axios = require("axios");
const data = require("../json/q1.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let gasPrice;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
		console.log(response.data);
		gasPrice = response.data.result;
	});
	return parseInt(gasPrice, 16);
};

fetchData().then((response) => console.log(response));
