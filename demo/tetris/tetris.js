// 俄罗斯方块
// by :liu xuewen

function extend(Child,Parent){
	function F(){};
	F.prototype = Parent.prototype;
	F.prototype.constructor = Child;
	return new F();
}

//基础类，生成方块
function Block(divCount, typeCount) {
	this.div1 = document.getElementById("div1");
	this.count = divCount;
	this.aEle = [];
	this.oBlock = null;
	this.timer = null;
	this.speed = 300;
};
Block.prototype.createBlock = function () {
	for (var i = 0; i < this.count; i++) {
		var newDiv = document.createElement("div");
		newDiv.className = "moveDiv";
		this.div1.appendChild(newDiv);
	}
	this.aEle = getElementsByClass(this.div1, "moveDiv");
	this.oBlock = this.aEle[this.aEle.length - 1];
	this.oBlock.setAttribute("id", "block1");
};

Block.prototype.createShowBlock = function () {
	for (var i = 0; i < this.count; i++) {
		var newDiv = document.createElement("div");
		newDiv.className = "copyMoveDiv";
		this.div1.appendChild(newDiv);
	}
	this.aEle = getElementsByClass(this.div1, "copyMoveDiv");
	this.oBlock = this.aEle[this.aEle.length - 1];
	this.oBlock.setAttribute("id", "block1");
};

Block.prototype.deform = function(kCode){
	switch(kCode){
		case 37:
		case 39:this.moveBlock(kCode);
			break;
		case 38://判断变形的时候，是否会有div出界，如果有则不允许变形
			if(obj.changeDirection) { obj.changeDirection(); }
			break;
		case 40:
			if(this.speed != 30){
				this.speed = 30;
				this.start();
			}
			break;
	};
};
Block.prototype.moveBlock = function(kCode){
	if(this.aEle.length == 0){
		return false;
	}
	if(!this.isMoveToLeftRight(kCode)){
		var moveWidth = kCode == 37? -this.aEle[0].offsetWidth : this.aEle[0].offsetWidth;
		fnDown(this.aEle, moveWidth, 0);
	}
}

//是否可以向左右两侧移动
Block.prototype.isMoveToLeftRight = function(kCode){
	var moveWidth = kCode == 37? -this.aEle[0].offsetWidth : this.aEle[0].offsetWidth;
	var limitLen = kCode == 37? 0 : this.div1.offsetWidth - this.aEle[0].offsetWidth;
	for(var i=this.aEle.length-1;i>=0;i--){
		var thisEle = this.aEle[i];
		if(thisEle.offsetLeft == limitLen){
			return true;
		}
		//判断如果元素再走一步以后左边或右面是否已有元素，如果有则停止
		var div =document.getElementById("div_"+( thisEle.offsetLeft + moveWidth)+"_"+ thisEle.offsetTop );
		if(div && div.className!="moveDiv"){
			return true;
		}
	}
	return false;
}

Block.prototype.start = function(){
	var _this = this;
	clearTimeout(this.timer);
	this.timer = setTimeout(function(){ _this.setTimeoutFn() },_this.speed);
};

Block.prototype.setTimeoutFn = function(){
	if(this.isMoveToDown()){
		var checkRows = [];
		for(var k=0;k<this.aEle.length; k++){
			checkRows.push((this.aEle[k].offsetTop + this.aEle[k].offsetHeight)/20);
			this.aEle[k].className = "block";
			this.aEle[k].setAttribute("id","div_"+ this.aEle[k].offsetLeft+"_"+ this.aEle[k].offsetTop);
		}
		this.isScore(checkRows);
		tetris();
		//新建右边图像
	}
	else{
		fnDown(this.aEle, 0, 20);
		var _this = this;
		this.timer = setTimeout(function(){ _this.setTimeoutFn() },_this.speed);
	};
}

//是否可以向下移动
Block.prototype.isMoveToDown = function(){
	for(var p=0;p<this.aEle.length; p++){
		//判断是否触地
		if(this.aEle[p].offsetTop == (this.div1.clientHeight - this.aEle[p].offsetHeight)){
			return true;		
		}
		//判断如果再走一步以后下面是否有元素，如果有则清除定时器停止
		var div =document.getElementById("div_"+this.aEle[p].offsetLeft+"_"+(this.aEle[p].offsetTop + this.aEle[p].offsetHeight));
		if(div){
			return true;
		}
	}
	return false;
}

//是否得分
Block.prototype.isScore = function(rows){
	for (var i=0; i<rows.length; i++){
		var aDiv = this.isDieByRow(rows[i]);
		if(aDiv != null){
			this.dieDivs(aDiv);
			var oScore = document.getElementById("txtScore");
			oScore.value = parseInt(oScore.value) + 100;
		}
		
	}
};

Block.prototype.isDieByRow = function(row){
	var cols = this.div1.offsetWidth / 20 ;
	var aDiv = [];
	for(var k=0; k<cols; k++){				
		var val = k*20+"_"+row*20;
		var div =document.getElementById("div_"+val);
		if(!div){
			return null;
		}
		else{
			aDiv.push(document.getElementById("div_"+val));
		}
	} 
	return aDiv;
}

Block.prototype.dieDivs = function(aDiv){
	for(var m=0; m <aDiv.length;m++){
		var id = aDiv[m].id; 
		var height = aDiv[m].offsetHeight;
		var l = id.split('_'); 
		this.div1.removeChild(aDiv[m]);
		//上面如果有元素，则都向下走一步
		for(var n= l[2]; n>0; n -= height){
			var lowerDiv = document.getElementById("div_"+l[1]+"_"+n);
			if(lowerDiv){ 
				lowerDiv.style.top = n + height +"px";
				lowerDiv.setAttribute("id","div_"+l[1]+"_"+(n+height));
			}
		}
		
	}
}

//长方形方块对象
function Strip(type) {
	Block.call(this, 4);
	this.type = type;
};
Strip.prototype = extend(Strip,Block);
Strip.prototype.init = function () {
	this.oBlock.style.top = "-20px";
	switch (this.type) {
		case 1:
			this.oBlock.style.left = 120 + "px";
			changeElement(this.aEle, -20, 0, 2);
			break;
		case 2:
			this.oBlock.style.left = (this.div1.offsetWidth - this.oBlock.offsetWidth) / 2 + "px";
			changeElement(this.aEle, 0, -20, 2);
			break;
	}
	this.type = this.type == 2 ? 1 : parseInt(this.type) + 1;
};
Strip.prototype.changeDirection = function () {
	switch (this.type) {
		case 1://横
			if(this.oBlock.offsetLeft < 40 || this.oBlock.offsetLeft >= (this.div1.offsetWidth - 20)){
				return false;
			}
			this.oBlock.style.left = this.oBlock.offsetLeft + 20 + "px";
			changeElement(this.aEle, -20, 0, 2);
			break;
		case 2://竖 
			this.oBlock.style.left = this.oBlock.offsetLeft - 20 + "px";
			changeElement(this.aEle, 0, -20, 2);
			break;
	} 
	this.type = this.type == 2 ? 1 : parseInt(this.type) + 1;
	 
};

//正方形方块对象
function Square(){
	Block.call(this,4);
}
Square.prototype = extend(Square,Block);
Square.prototype.init = function(){
	this.oBlock.style.left = "100px";
	this.oBlock.style.top = "-20px";
	changeElement(this.aEle,-20,0,2);
	changeElement(this.aEle,20,-20,3);
	changeElement(this.aEle,-20,0,4);
};
		
//一带三方块对象
function Quart(type) {
	Block.call(this, 4);
	this.oQuart2 = null;
	this.type = type;
}
Quart.prototype = extend(Quart,Block);
Quart.prototype.init = function () {
	this.oQuart2 = this.aEle[this.aEle.length - 2];
	this.oBlock.style.left = (this.div1.offsetWidth - this.oBlock.offsetWidth) / 2 + "px";
	var mLeft = this.oBlock.offsetLeft;
	var mTop = null;
	//确定首次加载第一个块出现的位置
	switch (this.type) {
		case 1:
		case 2:
		case 4:
			this.oBlock.style.top = "-40px";
			mTop = this.oBlock.offsetTop;
			break;
		case 3:
			this.oBlock.style.top = "-20px";
			mTop = this.oBlock.offsetTop;
			break;
	}
	//确定首次加载第一个块后面的几个块出现的位置
	switch (this.type) {
		case 1:
			this.oQuart2.style.left = mLeft + 20 + "px";
			this.oQuart2.style.top = mTop + 20 + "px";
			changeElement(this.aEle, -20, 0, 3);
			break;
		case 2:
			this.oQuart2.style.left = mLeft - 20 + "px";
			this.oQuart2.style.top = mTop + 20 + "px";
			changeElement(this.aEle, 0, -20, 3);
			break;
		case 3:
			this.oQuart2.style.left = mLeft + 20 + "px";
			this.oQuart2.style.top = mTop - 20 + "px";
			changeElement(this.aEle, -20, 0, 3);
			break;
		case 4:
			this.oQuart2.style.left = mLeft + 20 + "px";
			this.oQuart2.style.top = mTop + 20 + "px";
			changeElement(this.aEle, 0, -20, 3);
			break;
	}
	this.type += 1;
	this.type = this.type == 5 ? 1 : this.type;
};
//一带三方块变形
Quart.prototype.changeDirection = function () {
	var mLeft = this.oBlock.offsetLeft;
	var mTop = this.oBlock.offsetTop;
	switch (this.type) {
		case 1:
			if( mLeft + 20 == this.div1.offsetWidth - 20){
				return false;
			}
			this.oBlock.style.left = mLeft + 20 + "px";
			this.oQuart2.style.left = mLeft + 40 + "px";
			this.oQuart2.style.top = mTop + 20 + "px";
			changeElement(this.aEle, -20, 0, 3);
			break;
		case 2:
			this.oBlock.style.left = mLeft + 20 + "px";
			this.oQuart2.style.left = mLeft + "px";
			this.oQuart2.style.top = mTop + 20 + "px";
			changeElement(this.aEle, 0, -20, 3);
			break;
		case 3:
			if(mLeft - 20 == 0 ){
				return false;
			}
			this.oQuart2.style.left = mLeft + "px";
			this.oQuart2.style.top = mTop + "px";
			this.oBlock.style.left = mLeft - 20 + "px";
			this.oBlock.style.top = mTop + 20 + "px";
			changeElement(this.aEle, -20, 0, 3);
			break;
		case 4:
			this.oQuart2.style.left = mLeft + "px";
			this.oQuart2.style.top = mTop + "px";
			this.oBlock.style.left = mLeft - 20 + "px";
			this.oBlock.style.top = mTop - 20 + "px";
			changeElement(this.aEle, 0, -20, 3);
			break;
	}
	this.type += 1;
	this.type = this.type == 5 ? 1 : this.type;
};

//Z字类型方块对象
function ZBlock(type) {
	Block.call(this, 4);
	this.type = type;
}
ZBlock.prototype = extend(ZBlock,Block);
ZBlock.prototype.init = function () {
	switch (this.type) {
		case 1:
			this.oBlock.style.left = 120 + "px";
			this.oBlock.style.top = "-20px";
			break;
		case 2:
			this.oBlock.style.left = 100 + "px";
			this.oBlock.style.top = "-20px";
			break;
		case 3:
			this.oBlock.style.left = 120 + "px";
			this.oBlock.style.top = "-40px";
			break;
		case 4:
			this.oBlock.style.left = 100 + "px";
			this.oBlock.style.top = "-20px";
			break;
	};
	this.sortBlock();
};
ZBlock.prototype.changeDirection = function () {            
	switch (this.type) {
		case 1: 
			if( this.oBlock.offsetLeft == 0){
				return false;
			}
			this.oBlock.style.left = this.oBlock.offsetLeft + 20 +"px";
			break;
		case 2: 
			this.oBlock.style.left = this.oBlock.offsetLeft - 20 +"px";
			break;
		case 3: 
			if( this.oBlock.offsetLeft + 20 == this.div1.offsetWidth){
				return false;
			}
			this.oBlock.style.left = this.oBlock.offsetLeft + 20 +"px";
			this.oBlock.style.top = this.oBlock.offsetTop - 20 +"px";
			break;
		case 4: 
			this.oBlock.style.left = this.oBlock.offsetLeft - 20 +"px";
			this.oBlock.style.top = this.oBlock.offsetTop + 20 +"px";
			break;
	}
	this.sortBlock();
};

ZBlock.prototype.sortBlock = function(){			
	switch (this.type) {
		case 1: 
			changeElement(this.aEle, -20, 0, 2);
			changeElement(this.aEle, 0, -20, 3);
			changeElement(this.aEle, -20, 0, 4);
			this.type = 2;
			break;
		case 2: 
			changeElement(this.aEle, 0, -20, 2);
			changeElement(this.aEle, 20, 0, 3);
			changeElement(this.aEle, 0, -20, 4);
			this.type = 1;
			break;
		case 3: 
			changeElement(this.aEle, -20, 0, 2);
			changeElement(this.aEle, 0, 20, 3);
			changeElement(this.aEle, -20, 0, 4);
			this.type = 4;
			break;
		case 4: 
			changeElement(this.aEle, 0, -20, 2);
			changeElement(this.aEle, -20, 0, 3);
			changeElement(this.aEle, 0, -20, 4);
			this.type = 3;
			break;
	}
};

//////common.js///////////////////

function getElementsByClass(obj,cName){
	var aAllEle= obj.getElementsByTagName("*");
	var aEle = [];
	for(var i=0;i<aAllEle.length;i++){
		if(aAllEle[i].className == cName){
			aEle.push(aAllEle[i]);
		}
	}
	return aEle;
}

function changeElement(arr, leftSize, topSize, n) {
	for (var i = arr.length - n; i >= 0; i--) {
		arr[i].style.left = arr[i + 1].offsetLeft + leftSize + "px";
		arr[i].style.top = arr[i + 1].offsetTop + topSize + "px";
	}
}

function fnDown(arr, leftSize, topSize) {
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i].style.left = arr[i].offsetLeft + leftSize + "px";
		arr[i].style.top = arr[i].offsetTop + topSize + "px";
	}
}
 
//随机数
function randomNum(minNum,maxNum){
	var count = maxNum - minNum + 1;
	return Math.floor(Math.random()* count + 1 );
}
 