/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
window.onload = function() {
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityName = document.getElementById('aqi-city-input').value.trim();
    var aqiValue = document.getElementById("aqi-value-input").value.trim();
    //判断城市名称是否为中英文
    if (!cityName.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名称必须为中英文");
        return ;
    }
    //判断aqi数据是否为整数
    if (!aqiValue.match(/^\d+$/)){
        alert("空气质量必须为一个整数");
        return ;
    }
    aqiData[cityName] = aqiValue;
    console.log("123");
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tb = document.getElementById('aqi-table');
    var len = 0;
    var tableValue = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    console.log(tableValue);
    //为了优化性能，便一次性加载所有的值
    for (var city in aqiData) {
        tableValue += ("<tr><td>" + city + "</td><td>" + aqiData[city] + "<td><button class='del-btn'>删除</button></td></tr>");
        console.log(tableValue);
        len++;
    }
    tb.innerHTML = len?tableValue:"";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    console.log("456");
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
    var tr=target.parentElement.parentElement;
    delete aqiData[tr.children[0].innerHTML];
    renderAqiList();
}

function init() {
//   在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btnAdd = document.getElementById("add-btn");
    btnAdd.onclick = addBtnHandle;
    console.log("asdasd");
//   // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    var arrBtnDel = table.getElementsByClassName("del-btn");

    table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })
}

init();
}