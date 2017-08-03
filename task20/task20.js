//等页面加载完成在进行操作
// window.onload = function() {

//添加从DOM中去id的方法，方便操作
function $(id) {
    return document.getElementById(id);
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g,'');  //去掉头尾的空格
}

function getResult(str) {
    return str.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g, " ").split(" ");
}

//包装一个对象包含跨浏览器处理事件方法
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
    removeHandler : function(element, type, handler) {
        if (element.removeEventListener){  //DOM2处理事件
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {   //IE浏览器处理事件
            element.detachEvent("on" + type, handler);
        } else {    //DOM0级处理事件
            element["on" + type] = null;
        }
    }
}

var nums = ['feng','xiao','cheng'];   //用来存储队列写入和移除的数据

//加载队列
function flashQueen(num) {
    var queenResult = "";
    var test = $("test");
    for (var i = 0; i < num.length; i++){
        queenResult += "<div>" + num[i] + "</div>";
    }
    test.innerHTML = queenResult;
}

flashQueen(nums);

//给各个按钮添加监听事件
EventUtil.addHandler($("left-in"), "click", function() {
    //判断是否为空
    if($('input-text').value == ""){
        alert('输入不能为空');
        return ;
    }

    //取得文本框内容
    var textArray = getResult($('input-text').value);
    for(var i = textArray.length - 1; i >= 0; i--){
        nums.unshift(textArray[i]);
    }
    flashQueen(nums);
});

EventUtil.addHandler($("right-in"), "click", function() {
    //判断是否为空
    if($('input-text').value == ""){
        alert('输入不能为空');
        return ;
    }

    //取得文本框内容
    var textArray = getResult($('input-text').value);
    for(var i = 0; i <= textArray.length - 1; i++){
        nums.push(textArray[i]);
    }
    flashQueen(nums);
});
EventUtil.addHandler($("left-out"), "click", function() {
    nums.shift();
    flashQueen(nums);
});
EventUtil.addHandler($("right-out"), "click", function() {
    nums.pop();
    flashQueen(nums);
});

EventUtil.addHandler($('search'), "click", function() {
    var array2 = $('test').getElementsByTagName('div');
        pos,
        i,
        j;
    if ($('search-text').value !== "") {
        var find = $('search-text').value.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g, " ").split(" ");
        for (i = 0, len = find.length; i< len; i++) {
            for (j = 0, numLength = nums.length; j < numLength; j++) {
                pos = nums[j].search(find[i]);
                if (pos >= 0) {
                    array2[j].style.background = "yellow";
                }
            }
        }
    } else {
        alert("请输入想要查询的内容！");
    }
});

