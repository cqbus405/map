function setRouter(app, controllers) {
	app.get('/', function(req, res) {
		return res.send('<h3>Server is running!</h3>')
	})

	app.get('/locations', controllers.map.search) /*准备停用*/
	app.post('/routes', controllers.map.routes) /*智能算路*/

	app.get('/place/suggestions', controllers.map.getPlaces) /*通过地名搜索地理信息*/
	app.get('/place/detail', controllers.map.getPlaceDetail) /*通过uid查询地点详情*/
}

module.exports = setRouter