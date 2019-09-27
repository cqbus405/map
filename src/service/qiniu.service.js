'use strict'

import qiuniu from 'qiuniu'
import fs from 'fs'
import { get, set } from '../service/redis.service'

const configStr = fs.readFileSync('config.json')
const config = JSON.parse(configStr)
const accessKey = config.qiniu.accessKey
const secretKey = config.qiniu.secretKey
const bucket = config.qiniu.bucket
const ex = config.qiniu.ex ? config.qiniu.ex : '3600'

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
	scope: bucket,
	expires: ex
}

const key = 'qiniuUploadToken'

const getUploadToken = function() {
	return new Promise((resolve, reject) => {
		get(key, function(err, uploadToken) {
			if (err || !uploadToken) {
				const putPolicy = new qiniu.rs.PutPolicy(options)
				let newUploadToken = putPolicy.uploadToken(mac)
				set(key, newUploadToken, ex)
				resolve(newUploadToken)
			} else {
				resolve(uploadToken)
			}
		})
	})
}

export { getUploadToken }