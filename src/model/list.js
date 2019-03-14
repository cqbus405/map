function List() {
	this.dataStore = []	//初始化一个空数组来保存元素
	this.listSize = 0	//列表长度
	this.pos = 0	//列表当前位置
	this.length = length	//返回列表长度的函数
	this.clear = clear	//清空列表
	this.toString = toString	//返回列表的字符串形式
	this.insert = insert	//现有元素后插入新元素
	this.append = append	//列表的末尾添加新元素
	this.remove = remove	//从列表中删除元素
	this.front = front	//将当前位置移动到列表首位
	this.end = end	//将当前位置移动到列表末尾
	this.prev = prev	//将当前位置前移一位
	this.next = next	//将当前位置后移一位
	this.currPos = currPos	//返回列表的当前位置
	this.moveTo = moveTo	//将当前位置移动到指定位置
	this.getElement = getElement	//返回当前位置元素
	this.find = find //查找某一元素并返回其位置
	this.contains = contains //判断列表中是否包含某元素
}

function append(element) {
	this.dataStore[this.listSize++] = element
}

function find(element) {
	for (var i = 0; i < this.dataStore.length; ++i) {
		if (this.dataStore[i] == element) {
			return i
		}
	}
	return -1
}

function remove(element) {
	var findAt = this.find(element)
	if (findAt > -1) {
		this.dataStore.splice(findAt, 1)
		--this.listSize
		return true
	}
	return false
}

function length() {
	return this.listSize
}

function toString() {
	return this.dataStore
}

function insert(element, after) {
	var insertPos = this.find(after)
	if (insertPos > -1) {
		this.dataStore.splice(insertPos, 0, element)
		++this.listSize
		return true
	}
	return false
}

function clear() {
	delete this.dataStore
	this.listSize = this.pos = 0
	this.dataStore = []
}

function contains(element) {
	for (var i = 0; i < this.dataStore.length; ++i) {
		if (this.dataStore[i] == element) {
			return true
		}
	}
	return false
}

function front() {
	this.pos = 0
}

function end() {
	this.pos = this.listSize - 1
}

function prev() {
	if (this.pos > 0) {
		--this.pos
	}
}

function next() {
	if (this.pos < this.listSize - 1) {
		++this.pos
	}
}

function currPos() {
	return this.pos
}

function moveTo(position) {
	this.pos = position
}

function getElement() {
	return this.dataStore[this.pos]
}

module.exports = List