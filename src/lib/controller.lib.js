var path = require('path')
var fs = require('fs')

function getControllers(dir) {
	var controllers = {}
	var files = fs.readdirSync(dir)
	files.forEach(file => {
		var fileWithBasename = path.basename(file, '.js')
		var fileWithPath = path.join(__dirname, '../controller/' + file)
		controllers[fileWithBasename] = require(fileWithPath)
	})
	return controllers
}

module.exports = getControllers