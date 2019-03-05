var path = require('path')
var fs = require('fs')

function getControllers(dir) {
	var controllers = {}
	var files = fs.readdirSync(dir)
	files.forEach(file => {
		var fileWithBasename = path.basename(file, '.js')
		var fileWithPath = path.join(__dirname, '../controller/' + file)
		console.log('fileWithPath: ' + fileWithPath)
		controllers[fileWithBasename] = require(fileWithPath)
	})
	console.log(controllers)
	return controllers
}

module.exports = getControllers