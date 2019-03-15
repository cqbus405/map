var request = require('request')
var WebRequest = require('web-request')

function Baidu() {
	this.getCordinate = getCordinate
	this.getRoutes = getRoutes
}

function getCordinate(query, region, callback) {
	var url = `http://api.map.baidu.com/place/v2/suggestion?query=${encodeURIComponent(query)}&region=`
		+ `${encodeURIComponent(region)}&cityLimit=true&output=json&ak=6uWje97X99em2dbgGAc2wZqYZXnxFYHX`
	request(url, (error, response, body) => {
		if (error) {
			console.log(error)
			return callback(error, null)
		}
		
		return callback(null, JSON.parse(body))
	})
}

async function getRoutes(origin, destinations) {
	var url = `http://api.map.baidu.com/routematrix/v2/driving?ak=6uWje97X99em2dbgGAc2wZqYZXnxFYHX`
		+ `&origins=${origin}&destinations=${destinations}&output=json`
	var result = await WebRequest.get(url)
	return JSON.parse(result.body)
}

module.exports = Baidu