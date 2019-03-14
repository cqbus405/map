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

exports.plan = (req, res, next) => {
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

	
}