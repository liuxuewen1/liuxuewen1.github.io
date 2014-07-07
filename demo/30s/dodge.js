// JavaScript Document

//子弹对象
function Bullet(box){
	this.box = box;
	this.direction = null;
	this.aDirection = ["", "up", "right", "down", "left"];
	this.bWidth = null;
	this.bHeight = null;
	this.flyer = document.getElementById("flyer");
}

Bullet.prototype.createBullet = function(){
	var oBullet = document.createElement("div");
	oBullet.className = "bullet";
	this.box.appendChild(oBullet);
	var r = randomNum(1, 2);
	var bTop = randomMultiple(380, 20);
	var bLeft = randomMultiple(280, 20);
	
	if(r == 1){ bTop = 0; }
	else { bLeft = 0;}
	
	oBullet.style.top = bTop + "px";
	oBullet.style.left = bLeft + "px";
	
	this.bullet = oBullet;
	this.bWidth = getAttr(oBullet, "width");
	this.bHeight = getAttr(oBullet, "height");
	this.searchDirection(bTop, bLeft);
	var _this = this;
	this.timer = setInterval(function(){ _this.move(); },10);
}

Bullet.prototype.searchDirection = function(top, left){
	var boxHeight = this.box.offsetHeight;
	var boxWidth = this.box.offsetWidth;
	if(top <= boxHeight/2){
		if(left <= boxWidth/2){
			this.direction = "upLeft";
		}
		else{
			this.direction = "upRight";
		}
	}
	else{
		if(left <= boxWidth/2){
			this.direction = "downLeft";
		}
		else{
			this.direction = "downRight";
		}
	}
}

Bullet.prototype.move = function(){
	var r = null;
	switch(this.direction){
		case "upLeft":
			r = randomNum(2,3); 
			break;
		case "upRight":
			r = randomNum(3,4); 
			break;
		case "downLeft":
			r = randomNum(1,2); 
			break;
		case "downRight":
			r = randomNum(1,4);
			r = r == 2? 1 : r == 3? 4: r;
			break;
	}
	var size = randomNum(0,3);
	switch(this.aDirection[r]){
		case "down":
			this.bullet.style.top = this.bullet.offsetTop + size +"px";
			break;
		case "right":
			this.bullet.style.left = this.bullet.offsetLeft + size +"px";
			break;
		case "up":
			this.bullet.style.top = this.bullet.offsetTop - size +"px";
			break;
		case "left":
			this.bullet.style.left = this.bullet.offsetLeft - size +"px";
			break;
	}
	this.isKill();
	if(this.isDie(r)){
		this.operDie();
	}
}

//是否死亡：即碰到四周围墙
Bullet.prototype.isDie = function(r){
	switch(this.aDirection[r]){
		case "down":
			if(this.bullet.offsetTop >= this.box.offsetHeight){
				return true;
			}
			break;
		case "right":
			if(this.bullet.offsetLeft >= this.box.offsetWidth){
				return true;
			}
			break;
		case "up":
			if(this.bullet.offsetTop <= 0){ return true; }
			break;
		case "left":
			if(this.bullet.offsetLeft <= 0){ return true; }
			break;
	}
	return false;
}

//死亡后续的处理
Bullet.prototype.operDie = function(){
	clearInterval(this.timer);
	this.box.removeChild(this.bullet);
}

//是否杀死飞机
Bullet.prototype.isKill = function(){
	if(isBomb(this.bullet, this.flyer)){
		clearInterval(oTimer);
		for(var i=0; i<aTimer.length; i++){
			clearInterval(aTimer[i]);
		}
		alert("你输了");
		var aBullet = getElementsByClass(this.box, "bullet");
		for(var k in aBullet){
			this.box.removeChild(aBullet[k]);
		}
		document.getElementById("btnStart").style.display = "block";
	}
}

//飞机对象
function Flyer(){
	this.flyer = document.getElementById("flyer");
	this.box = document.getElementById("box");
}

Flyer.prototype.move = function(kCode){
	keyMove(this.flyer, this.box, kCode, 5); 
}

////common.js///////////////

function randomNum(minNum,maxNum){
	var count = maxNum - minNum + 1;
	return Math.floor(Math.random()* count + minNum );
}

function randomMultiple(totalNum, multiple){
	if(typeof totalNum != "number" || typeof multiple != "number"){ return false; }
	return Math.floor(Math.random()* totalNum/multiple )* multiple;
}

function getAttr(obj, attr){
	if(obj.currentStyle){
		return parseInt(obj.currentStyle[attr]);
	}
	else{
		return parseInt(getComputedStyle(obj,false)[attr]);
	}
}

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

//两个物体是否发生碰撞
function isBomb(obj, compareObj){
	var cTop = compareObj.offsetTop;
	var cLeft = compareObj.offsetLeft;
	var cWidth = compareObj.offsetWidth;
	var cHeight = compareObj.offsetHeight;
	
	var oTop = obj.offsetTop;
	var oLeft = obj.offsetLeft;
	var oWidth = obj.offsetWidth;
	var oHeight = obj.offsetHeight;
	
	if(!(oLeft+ oWidth <= cLeft || oTop + oHeight <= cTop || oLeft >= cLeft+ cWidth || oTop >= cTop + cHeight)){
		return true;
	}
	return false;
}

//键盘事件移动对象
function keyMove(obj, compareObj, kCode, size){
	var oLeft = obj.offsetLeft;
	var oTop = obj.offsetTop;
	
	switch(kCode){
		case 37:
			if(oLeft <= 0){ return false; }
			obj.style.left = oLeft - size +"px";
			break;
		case 38:
			if(oTop <= 0){ return false; }
			obj.style.top = oTop - size + "px";
			break;
		case 39:
			if(oLeft + obj.offsetWidth >= compareObj.offsetWidth){
				return false;
			}
			obj.style.left = oLeft + size +"px";
			break;
		case 40:
			if(obj.offsetTop + obj.offsetHeight >= compareObj.offsetHeight){
				return false;
			}
			obj.style.top = oTop + size +"px";
			break;
	}
	return true;
}