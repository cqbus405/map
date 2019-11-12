require('@babel/polyfill')

var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var getControllers = require('./lib/controller.lib')
var setRouter = require('./controller/router')

var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
var port = 3001

var app = express()

//设置服务器跨域权限
app.use(function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'https://map.cqbus405.com');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

var controllers = getControllers(path.join(__dirname, './controller'))
setRouter(app, controllers)

app.listen(port, function() {
	console.log('App is running on ' + env + ' mode. Port: ' + port)
})