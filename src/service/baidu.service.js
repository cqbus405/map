var request = require('request')
var WebRequest = require('web-request')
import fs from 'fs'

var configStr = fs.readFileSync('config.json')
var config = JSON.parse(configStr)
var baiduAk = config.baiduAk

function Baidu() {
	this.getCordinate = getCordinate
	this.getRoutes = getRoutes
	this.getRoute = getRoute
	this.getSuggestions = getSuggestions
	this.getDetail = getDetail
}

/*停止使用*/
function getCordinate(query, region, callback) {
	var url = `http://api.map.baidu.com/place/v2/suggestion?query=${encodeURIComponent(query)}&region=`
		+ `${encodeURIComponent(region)}&cityLimit=true&output=json&ak=${baiduAk}`
	request(url, (error, response, body) => {
		if (error) {
			console.log(error)
			return callback(error, null)
		}
		
		var body = JSON.parse(body)
		var status = body.status

		if (status == 0) {
			var result = body.result
			return callback(null, result)
		}

		var message = body.message
		return callback({
			errcode: status,
			errmsg: message
		}, null)
	})
}

async function getRoutes(origin, destinations) {
	var url = `http://api.map.baidu.com/routematrix/v2/driving?ak=${baiduAk}`
		+ `&origins=${origin}&destinations=${destinations}&output=json`
	var result = await WebRequest.get(url)
	return JSON.parse(result.body)
}

async function getRoute(origin, destination, originUid, destinationUid) {
	var url = `http://api.map.baidu.com/direction/v2/driving?ak=${baiduAk}`
		+ `&origin=${origin}&destination=${destination}&output=json&origin_uid=${originUid}&destination_uid`
		+ `=${destinationUid}`
	var result = await WebRequest.get(url)
	return JSON.parse(result.body)
}

/**
 * getCoordinate函数的同步形式
 * @Author   q
 * @DateTime 2019-09-15T22:28:53+0800
 * @param    string                 query  希望查询的地点
 * @param    string                 region “全国”、省、市、百度城市编码
 * @return   object                 suggestions “地点列表”
 */
async function getSuggestions(query, region) {
	var url = `http://api.map.baidu.com/place/v2/suggestion?query=${encodeURIComponent(query)}&region=`
		+ `${encodeURIComponent(region)}&city_limit=true&output=json&ak=${baiduAk}`
	var result = await WebRequest.get(url)
	var suggestions = JSON.parse(result.body)
	return suggestions
}

/**
 * 通过uid获取地点的详情，与getSuggesions配合使用
 * @Author   q
 * @DateTime 2019-09-15T22:42:59+0800
 * @param    string                 uid 通过getSuggestions函数获取的uid
 * @return   object                 detail 地点详情，包含省、市、区、街道、坐标等
 */
async function getDetail(uid) {
	var url = `http://api.map.baidu.com/place/v2/detail?uid=${uid}&output=json&scope=1&ak=${baiduAk}`
	var result = await WebRequest.get(url)
	var detail = JSON.parse(result.body)
	return detail
}

module.exports = Baidu