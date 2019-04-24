require('@babel/polyfill')

var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var getControllers = require('./lib/controller.lib')
var setRouter = require('./controller/router')

var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
var port = 3000

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

var controllers = getControllers(path.join(__dirname, './controller'))
setRouter(app, controllers)

app.listen(port, function() {
	console.log('App is running on ' + env + ' mode. Port: ' + port)
})