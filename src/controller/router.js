function setRouter(app, controllers) {
	app.get('/', function(req, res) {
		return res.send('<h3>Server is running!</h3>')
	})

	app.get('/locations', controllers.map.search)
	app.post('/routes', controllers.map.routes)

	app.get('/place/suggestions', controllers.map.getPlaces)
	app.get('/place/detail', controllers.map.getPlaceDetail)
}

module.exports = setRouter