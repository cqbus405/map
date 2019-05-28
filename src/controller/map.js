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
			data: body
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

	var waitingList = new List()
	for (var i = 0; i < points.length; ++i) {
		waitingList.append(points[i])
	}
	
	var origin = `${start.location.lat},${start.location.lng}`
	var destinations = ''

	var frontValue = start

	var isError = false
	var errorMessage = 'success'

	while (waitingList.length() > 0) {
		for (waitingList.front(); waitingList.currPos() < waitingList.length(); waitingList.next()) {
			destinations += `${waitingList.getElement().location.lat},${waitingList.getElement().location.lng}|`
		}
		destinations = destinations.substring(0, destinations.length - 1)

		var data = await baidu.getRoutes(origin, destinations)
		var shortestRoute = 0
		var position = 0

		if (data.status !== 0) {
			isError = true
			errorMessage = data.message
			break
		}

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
		var originForRoute = `${frontValue.location.lat},${frontValue.location.lng}`
		var destinationForRoute = `${shortestValue.location.lat},${shortestValue.location.lng}`
		var originUid = frontValue.uid
		var destinationUid = shortestValue.uid
		var route = await baidu.getRoute(originForRoute, destinationForRoute, originUid, destinationUid)
		var routeValue = route.result.routes[0]
		routeValue.origin.name = frontValue.name
		routeValue.destination.name = shortestValue.name
		resultQueue.enqueue((route.result.routes)[0])

		origin = `${shortestValue.location.lat},${shortestValue.location.lng}`
		destinations = ''
		waitingList.remove(shortestValue)
		frontValue = shortestValue
	}

	if (isError) {
		return res.json({
			code: 1,
			msg: errorMessage
		})
	}

	return res.json({
		code: 0,
		msg: 'success',
		data: resultQueue.dataStore
	})
}