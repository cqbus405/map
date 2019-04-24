var path = require('path')
var fs = require('fs')

/**
 * @Description 引入controller文件夹中的module
 * @Author      q
 * @DateTime    2019-03-31T23:28:09+0800
 * @param       controller目录的地址
 * @return      controller目录中的module
 */
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