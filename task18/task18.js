//等页面加载完成在进行操作
// window.onload = function() {

    //添加从DOM中去id的方法，方便操作
    function $(id) {
        return document.getElementById(id);
    }

    function trim(str) {
        return str.replace(/^\s+|\s+$/g,'');  //去掉头尾的空格
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

    var nums = [1,50,100];   //用来存储队列写入和移除的数据

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
        //取得文本框内容
        var text = parseInt(trim($("input-text").value));
        if(isNaN(text)){
            alert("请输入数字");
            return ;
        }
        nums.unshift(text);
        flashQueen(nums);
    })
    EventUtil.addHandler($("right-in"), "click", function() {
        //取得文本框内容
        var text = parseInt(trim($("input-text").value));
        if(isNaN(text)){
            alert("请输入数字");
            return ;
        }
        nums.push(text);
        flashQueen(nums);
    })
    EventUtil.addHandler($("left-out"), "click", function() {
        nums.shift();
        flashQueen(nums);
    })
    EventUtil.addHandler($("right-out"), "click", function() {
        nums.pop();
        flashQueen(nums);
    })