import redis from 'redis'
import fs from 'fs'

const configStr = fs.readFileSync('config.json')
const config = JSON.parse(configStr)
const host = config.redis.host
const port = config.redis.port

const client = redis.createClient({
	host,
	port
})

export default client