import client from '../lib/redis.lib'

const get = function(key, callback) {
	client.get(key, (err, reply) => {
		if (err) return callback(err)
		return callback(null, reply)
	})
}

const set = function(key, value, time) {
	if (time) {
		client.set(key, value, 'EX', time)
	} else {
		client.set(key, value)
	}
}

export { get, set }