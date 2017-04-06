//添加从DOM中去id的方法，方便操作
function $(id) {
    return document.getElementById(id);
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g,'');  //去掉头尾的空格
}

//包装一个对象包含跨浏览器处理点击事件方法
var EventUtil = {
    //添加监听器
    addHandler : function(element, type, handler) {
        if (element.addEventListener){  //DOM2处理事件
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {   //IE浏览器处理事件
            element.attachEvent("on" + type, handler);
        } else {    //DOM0级处理事件
            element["on" + type] = handler;
        }
    }, 
    //移除监听器
    removeHandler : function(element, type,  handler) {
        if (element.removeEventListener){  //DOM2处理事件
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {   //IE浏览器处理事件
            element.detachEvent("on" + type, handler);
        } else {    //DOM0级处理事件
            element["on" + type] = null;
        }
    }
}

// 初始化空间
var tagInput = $('input-text'),
    tagList = $('key-show'),
    hobbyInput = $('input-textarea'),
    hobbyList = $('btn-show'),
    hobbyBtn = $('show-hobby');

//实例对象
var tagObj = new CreateList(tagList),
	hobbyObj = new CreateList(hobbyList);

// 绑定事件响应
window.onload = function() {
    EventUtil.addHandler(tagInput, 'keyup', showTag);
    EventUtil.addHandler(hobbyBtn, 'click', showHobby);

    EventUtil.addHandler(tagList, 'mouseover', function(e) {
        if(e.target && e.target.nodeName == 'SPAN') {
            e.target.firstChild.insertData(0, '点击删除');
            e.target.style.background = 'red';
        }
    });

    EventUtil.addHandler(tagList, 'mouseout', function(e) {
        if(e.target && e.target.nodeName == "SPAN") {
            e.target.firstChild.deleteData(0, 4);
            e.target.style.background = '#78BCFB';
        }
    });

    EventUtil.addHandler(tagList, 'click', function(e) {
        if(e.target && e.target.nodeName == "SPAN") {
            tagList.removeChild(e.target);
        }
    });
    EventUtil.addHandler(hobbyList, 'mouseover', function(e) {
        if(e.target && e.target.nodeName == 'SPAN') {
            e.target.firstChild.insertData(0, '点击删除');
            e.target.style.background = 'red';
        }
    });

    EventUtil.addHandler(hobbyList, 'mouseout', function(e) {
        if(e.target && e.target.nodeName == "SPAN") {
            e.target.firstChild.deleteData(0, 4);
            e.target.style.background = '#78BCFB';
        }
    });

    EventUtil.addHandler(hobbyList, 'click', function(e) {
        if(e.target && e.target.nodeName == "SPAN") {
            hobbyList.removeChild(e.target);
        }
    });
} 

// 构造对象利用队列存储输入的内容，方便加载
function CreateList(divList) {
    this.queue = [];
    this.render = function () {
		var str = "";
		this.queue.forEach(function (e) {
			str += '<span>' + e + '</span>';
		});
		divList.innerHTML = str;
	}
}
CreateList.prototype.rightPush = function(str) {
    this.queue.push(str);
    this.render();
}
CreateList.prototype.leftShift = function() {
    this.queue.shift();
    this.render;
}


//对输入内容分割成数组
function splitInput(str) {
	var inputArray = str.trim().split(/[,，;；、。.\s\n]+/);
	return inputArray;
}

function showTag() {
	if (/[,，;；、\s\n]+/.test(tagInput.value) || event.keyCode == 13) {
		var data = splitInput(tagInput.value),
			newTag = data[0];
		if (tagObj.queue.indexOf(newTag) === -1) {
			tagObj.rightPush(newTag);
			if (tagObj.queue.length > 10) {
				tagObj.leftShift();
			}
		}
		tagObj.render();
		tagInput.value = "";	
	}	
}

function showHobby() {
	var data = splitInput(hobbyInput.value);
	data.forEach(function (e) {
		if (hobbyObj.queue.indexOf(e) === -1) {
			hobbyObj.rightPush(e);
			if (hobbyObj.queue.length > 10) {
				hobbyObj.leftShift();
			}
		}
		hobbyObj.render();
		hobbyInput.value = "";
	});
}