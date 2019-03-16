var Baidu = require('../lib/baidu.lib')
var Queue = require('../model/queue')
var List = require('../model/list')

var baidu = new Baidu()

exports.search = (req, res, next) => {
	var place = req.query.place
	var region = req.query.region
	if (!place || !region) {
		return res.json({
			code: 60001,
			msg: '传入参数有误'
		})
	}

	baidu.getCordinate(place, region, (error, body) => {
		if (error) {
			return res.json({
				code: 50001,
				msg: error
			})
		}

		return res.json({
			code: 0,
			msg: 'success',
			body: body
		})
	})
}

exports.routes = async (req, res, next) => {
	var start = req.body.start
	var points = req.body.points

	if (!start || !points || points.length < 1) {
		return res.json({
			code: 60001,
			msg: '传入参数有误'
		})
	}

	var resultQueue = new Queue()
	resultQueue.enqueue(start)

	var waitingList = new List()
	for (var i = 0; i < points.length; ++i) {
		waitingList.append(points[i])
	}
	
	var origin = `${start.location.lat},${start.location.lng}`
	var destinations = ''

	var frontValue = start

	while (waitingList.length() > 0) {
		for (waitingList.front(); waitingList.currPos() < waitingList.length(); waitingList.next()) {
			destinations += `${waitingList.getElement().location.lat},${waitingList.getElement().location.lng}|`
		}
		destinations = destinations.substring(0, destinations.length - 1)

		var data = await baidu.getRoutes(origin, destinations)
		var shortestRoute = 0
		var position = 0

		for (var i = 0; i < (data.result).length; ++i) {
			var distance = (data.result)[i].distance.value
			if (i == 0) {
				shortestRoute = distance
			} else {
				if (distance < shortestRoute) {
					shortestRoute = distance
					position = i
				}
			}
		}

		var shortestValue = (waitingList.dataStore)[position]
		var route = await baidu.getRoute(`${frontValue.location.lat},${frontValue.location.lng}`, `${shortestValue.location.lat},${shortestValue.location.lng}`)
		shortestValue.route = route
		resultQueue.enqueue(shortestValue)
		
		origin = `${shortestValue.location.lat},${shortestValue.location.lng}`
		destinations = ''
		waitingList.remove(shortestValue)
		frontValue = shortestValue
	}

	console.log(resultQueue.toString())

	return res.json({
		code: 200,
		msg: 'success'
	})
}