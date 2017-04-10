var btns = document.getElementsByTagName('button'),
    preBtn = btns[0],
    inBtn = btns[1],
    posBtn = btns[2],
    treeRoot = document.getElementsByClassName('root')[0],
    divList = [],
    timer = null;

//先序遍历
function preOrder(node) {
    if(node != null) {
        divList.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}
//中序遍历
function inOrder(node) {
    if(node != null) {
        inOrder(node.firstElementChild);
        divList.push(node);
        inOrder(node.lastElementChild);
    }
}
//后序遍历
function posOrder(node) {
    if(node != null) {
        posOrder(node.firstElementChild);
        posOrder(node.lastElementChild);
        divList.push(node);
    }
}

// 初始化函数
function reset() {
    divList = [];
    clearInterval(timer);
    var divs = document.getElementsByTagName('div');
    for(var i = 0; i < divs.length; i++) {{
        divs[i].style.backgroundColor = '#fff';
    }}
}

// 颜色变化函数
function changeColor() {
    var i = 0;
    divList[i].style.backgroundColor = 'blue';
    timer = setInterval(function () {
        i++;
        if(i < divList.length){
            divList[i-1].style.backgroundColor = '#fff';
            divList[i].style.backgroundColor = 'blue';
        } else {
            clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
        }
    },500)
}

window.onload = function (){
	preBtn.onclick = function () {
		reset();
		preOrder(treeRoot);
		changeColor();
	}
	inBtn.onclick = function () {
		reset();
		inOrder(treeRoot);
		changeColor(); 	
	}
	posBtn.onclick = function () {
		reset();
		posOrder(treeRoot);
		changeColor();
	}
}