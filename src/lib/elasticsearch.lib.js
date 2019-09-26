import { Client } from '@elastic/elasticsearch'
import fs from 'fs'

var configStr = fs.readFileSync('config.json')
var config = JSON.parse(configStr)
var node = config.elasticsearch.node

const client = new Client({
	node
})

export default client