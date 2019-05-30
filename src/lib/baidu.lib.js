var request = require('request')
var WebRequest = require('web-request')

function Baidu() {
	this.getCordinate = getCordinate
	this.getRoutes = getRoutes
	this.getRoute = getRoute
}

function getCordinate(query, region, callback) {
	var url = `https://api.map.baidu.com/place/v2/suggestion?query=${encodeURIComponent(query)}&region=`
		+ `${encodeURIComponent(region)}&cityLimit=true&output=json&ak=6uWje97X99em2dbgGAc2wZqYZXnxFYHX`
	request(url, (error, response, body) => {
		if (error) {
			console.log(error)
			return callback(error, null)
		}
		
		var body = JSON.parse(body)
		var status = body.status

		if (status == 0) {
			var result = body.result
			return callback(null, result)
		}

		var message = body.message
		return callback({
			errcode: status,
			errmsg: message
		}, null)
	})
}

async function getRoutes(origin, destinations) {
	var url = `https://api.map.baidu.com/routematrix/v2/driving?ak=6uWje97X99em2dbgGAc2wZqYZXnxFYHX`
		+ `&origins=${origin}&destinations=${destinations}&output=json&tactics=11`
	var result = await WebRequest.get(url)
	return JSON.parse(result.body)
}

async function getRoute(origin, destination, originUid, destinationUid) {
	var url = `https://api.map.baidu.com/direction/v2/driving?ak=6uWje97X99em2dbgGAc2wZqYZXnxFYHX`
		+ `&origin=${origin}&destination=${destination}&output=json&origin_uid=${originUid}&destination_uid`
		+ `=${destinationUid}`
	var result = await WebRequest.get(url)
	return JSON.parse(result.body)
}

module.exports = Baidu