const express = require('express');
const application = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

application.use(cors());
application.use(express.json());
application.use(bodyParser.urlencoded({ extended: true }));

const simpleAPI = async (urlData) => {
	consapplication.log(urlData);
	let dataArr = [];
	try {
		const res = await axios.all(urlData.map((url) => axios.get(url)));
		const resArr = res.map((res) => res.data.numbers);
		resArr.forEach((res) => (dataArr = [...dataArr, ...res]));
	} catch (err) {
		console.log(err.message);
	}
	return [...new Set(dataArr.sort((a, b) => a - b))];
};

simpleAPI();

application.get('/numbers', async (req, res) => {
	const urls = req.query.url;
	const response = await simpleAPI(urls);
	res.send(response);
});

application.listen(5000, () => {
	console.log('Server running on port 5000');
});
