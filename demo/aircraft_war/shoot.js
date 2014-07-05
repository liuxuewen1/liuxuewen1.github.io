// JavaScript Document

////////飞机类//////////////////
function Flyer(){
	this.flyer = document.createElement("div");
	this.flyer.id = "flyer";
	this.flyer.className = "flyerClass";
	oBox.appendChild(this.flyer);
	this.tTop = oBox.offsetHeight - getAttr(this.flyer, "height");
	this.tLeft = 140;
	
	this.flyer.style.top = this.tTop +"px";
	this.flyer.style.left = this.tLeft +"px";
}

Flyer.prototype.move = function(kCode){
	var flyerLeft = this.flyer.offsetLeft;
	var flyerTop = this.flyer.offsetTop;
	var width = height = 0;
	switch(kCode){
		case 37: width = -20;
			if(flyerLeft <=0){ return false; }
			this.flyer.style.left = flyerLeft + width +"px";
			break;
		case 38: height = -20; 
			if(flyerTop <=0){ return false; }
			this.flyer.style.top = flyerTop + height +"px";
			break;
		case 39: width = 20;
			if(flyerLeft >= oBox.offsetWidth-this.flyer.offsetWidth){ return false; }
			this.flyer.style.left = flyerLeft + width +"px";
			break;
		case 40: height = 20;
			if(flyerTop >= oBox.offsetHeight - this.flyer.offsetHeight){ return false; }
			this.flyer.style.top = flyerTop + height +"px";
			break;
	}
	
}

Flyer.prototype.shoot = function(){
	var bullet = new Bullet();
	bullet.fire(this.isDestory);
}

 
////////子弹类//////////////////
function Bullet(){
	this.bullet = document.createElement("div");
	this.bullet.className = "bulletClass";
	oBox.appendChild(this.bullet);
	var bulletWidth = getAttr(this.bullet, "width");
	var bulletHeight = getAttr(this.bullet, "height");
	var flyer = document.getElementById("flyer");
	var flyerWidth = getAttr(flyer, "width");
	this.bullet.style.top = flyer.offsetTop - bulletHeight +"px";
	this.bullet.style.left = flyer.offsetLeft + (flyerWidth - bulletWidth)/2 +"px";
}

Bullet.prototype.fire = function(isDestory){
	var _this = this;
	var bHeight = getAttr(this.bullet, "height");
	this.bulletTimer = setInterval(function(){
		if(_this.isHit()){
			
		}
		
		var bTop = _this.bullet.offsetTop;							 
		if(	bTop <= 0){
			oBox.removeChild(_this.bullet);
			clearInterval(_this.bulletTimer);
		}
		else{
			_this.bullet.style.top = _this.bullet.offsetTop - bHeight +"px";					 
		}
	},30);
}

Bullet.prototype.isHit = function(){
	var aEle = getElementsByClass(oBox, "enemyClass");
	var bLeft = this.bullet.offsetLeft;
	var bTop = this.bullet.offsetTop;
	
	for(var i=0; i<aEle.length; i++){
		var oEnomy = aEle[i];
		var eHeight = getAttr(oEnomy, "height");
		var eTop = oEnomy.offsetTop;
		if(oEnomy.offsetLeft == bLeft && oEnomy.offsetTop + eHeight >= bTop){
			this.dieEnemy(oEnomy);
		}
		oEnomy = null;
	}
}

Bullet.prototype.dieEnemy = function(oEnomy){
	clearInterval(this.bulletTimer);
	oBox.removeChild(oEnomy);
	this.bullet.style.backgroundImage = "url('bingo.png')";
	var _this = this;
	setTimeout(function(){ oBox.removeChild(_this.bullet); },30);
}

////////敌机类//////////////////
function Enemy(){
	this.enemy = document.createElement("div");
	this.enemy.className = "enemyClass";
	var ranLeft = Math.floor(Math.random()*15)*20;
	this.enemy.style.top = "0px";
	this.enemy.style.left = ranLeft +"px";
	oBox.appendChild(this.enemy);
}

Enemy.prototype.isDestory = function(){
	var flyer = document.getElementById("flyer");
	var eLeft = this.enemy.offsetLeft;
	var eTop = this.enemy.offsetTop;
	var eWidth = fWidth = 20;
	var eHeight = fHeight = 20;
	var fLeft =flyer.offsetLeft;
	var fTop = flyer.offsetTop;
	//console.log(eLeft+","+fLeft+","+(eTop+ eHeight)+","+fTop+","+eLeft+","+(fLeft + fWidth)+","+eTop+","+(fTop + fHeight));
	if(!(eLeft<= fLeft || eTop+ eHeight <= fTop || eLeft>= fLeft + fWidth || eTop>= fTop + fHeight)){
		//return false;
		alert("你被撞了！");
	}
	//return true;
	flyer = null;
}

Enemy.prototype.attack = function(){
	var _this = this;
	//var eHeight = getAttr(this.enemy, "height");
	this.eTimer = setInterval(function(){
		var eTop = _this.enemy.offsetTop;
		_this.isDestory();
		if(eTop >= oBox.offsetHeight - getAttr(_this.enemy, "height")){
			clearInterval(enemyTimer);
			clearInterval(_this.eTimer);
			alert("Game Over");
		}						   
		else{
			_this.enemy.style.top = eTop + 10 + "px";
		}
	},500);
}

function getAttr(obj,attr){
	if(obj.currentStyle){
		return parseInt(obj.currentStyle[attr]);
	}
	else{
		return parseInt(getComputedStyle(obj,false)[attr]);
	}
}

function getElementsByClass(obj, cName) {
    var aAllEle = obj.getElementsByTagName("*");
    var aEle = [];
    for (var i = 0; i < aAllEle.length; i++) {
        if (aAllEle[i].className == cName) {
            aEle.push(aAllEle[i]);
        }
    }
    return aEle;
}