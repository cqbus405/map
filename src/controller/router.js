function setRouter(app, controllers) {
	app.get('/', function(req, res) {
		return res.send('<h3>Server is running!</h3>')
	})

	app.get('/locations', controllers.map.search)
	app.post('/routes', controllers.map.routes)
}

module.exports = setRouter