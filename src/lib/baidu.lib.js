var request = require('request')

function Baidu() {
	this.getCordinate = getCordinate
}

function getCordinate(query, region, callback) {
	var url = 'http://api.map.baidu.com/place/v2/suggestion?query=' + encodeURIComponent(query) + '&region='
	 + encodeURIComponent(region) + '&cityLimit=true&output=json&ak=6uWje97X99em2dbgGAc2wZqYZXnxFYHX'
	request(url, (error, response, body) => {
		if (error) {
			console.log(error)
			return callback(error, null)
		}
		
		return callback(null, JSON.parse(body))
	})
}

module.exports = Baidu