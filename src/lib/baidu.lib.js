var request = require('request')

function Baidu() {
	this.getCordinate = getCordinate
	this.getRoutes = getRoutes
}

function getCordinate(query, region, callback) {
	var url = `http://api.map.baidu.com/place/v2/suggestion?query=${encodeURIComponent(query)}&region=
		${encodeURIComponent(region)}&cityLimit=true&output=json&ak=6uWje97X99em2dbgGAc2wZqYZXnxFYHX`
	request(url, (error, response, body) => {
		if (error) {
			console.log(error)
			return callback(error, null)
		}
		
		return callback(null, JSON.parse(body))
	})
}

function getRoutes(origin, destinations, callback) {
	var url = `http://api.map.baidu.com/routematrix/v2/driving?ak=6uWje97X99em2dbgGAc2wZqYZXnxFYHX
		&origins=${origin}&destinations=${destinations}&output=json`
	request(url, (error, response, body) => {
		if (error) {
			console.log(error)
			return callback(error, null)
		}

		return callback(null, JSON.parse(body))
	})
}

module.exports = Baidu