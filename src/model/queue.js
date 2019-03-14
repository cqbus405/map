function Queue() {
	this.dataStore = []
	this.enqueue = enqueue	//向队尾添加一个元素
	this.dequeue = dequeue	//删除队首元素
	this.front = front	//读取队首元素
	this.back = back	//读取队尾元素
	this.toString = toString	//显示队列内所有元素
	this.empty = empty	//判断队列是否为空
	this.count = count	//返回队列里元素数量
}

function enqueue(element) {
	this.dataStore.push(element)
}

function dequeue() {
	return this.dataStore.shift()
}

function front() {
	return this.dataStore[0]
}

function back() {
	return this.dataStore[this.dataStore.length - 1]
}

function toString() {
	var retStr = ''
	for (var i = 0; i < this.dataStore.length; ++i) {
		retStr += this.dataStore[i] + '\n'
	}
	return retStr
}

function empty() {
	return this.dataStore.length == 0 ? true : false
}

function count() {
	return this.dataStore.length
}

module.exports = Queue