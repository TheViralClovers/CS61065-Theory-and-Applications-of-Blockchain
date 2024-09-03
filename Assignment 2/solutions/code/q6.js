const axios = require("axios");
const data = require("../json/q6.json");
const api_endpoint = require("../../api_endpoint.json");
const url = api_endpoint["api_endpoint"];

let value,totalGas,result;

const fetchData = async () => {
	await axios.post(url, data).then((response) => {
		console.log(response.data);
		result = response.data.result;
        value = parseInt(result.value,16);
        totalGas = parseInt(result.gas,16)
	});
	return [value,totalGas];
};

fetchData().then((response) => console.log(response));
