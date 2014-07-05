
var Snake = function (opts) {
	var defaults={
		width : 10,
		height : 10,
		area : document.getElementsByTagName("body")[0],
		speed : 200,
		fClass : "",	//food的class
		sClass : "",	//snake的class
		afterEatFn : null,
		afterHitFn : null
	}
	if(opts){
		defaults.width = opts.width || defaults.width;
		defaults.height = opts.height || defaults.height;
		defaults.area = opts.area || defaults.area;
		defaults.speed = opts.speed || defaults.speed;
		defaults.fClass = opts.fClass || defaults.fClass;
		defaults.sClass = opts.sClass || defaults.sClass;
		defaults.afterEatFn = opts.afterEatFn || defaults.afterEatFn;
		defaults.afterHitFn = opts.afterHitFn || defaults.afterHitFn;
	}
	this.width = defaults.width ;
	this.height = defaults.height ;
	this.area = defaults.area;
	this.speed = defaults.speed;
	this.fClass = defaults.fClass;
	this.sClass = defaults.sClass ;
	this.afterEatFn = defaults.afterEatFn ;
	this.afterHitFn = defaults.afterHitFn ;

	this.isStart = false;
	this.eatScore = 0;
	this.direction = null; //up down right left
	this.aDiv = [];
	var _this = this;
	
	document.onkeydown = function (ev) {
		var oEvent = ev || event;
		if (_this.isStart) {
			_this.changeDirection(oEvent.keyCode);
		}
	};
	
	return this.createSnake();
}

Snake.prototype = {
	start : function (ev) { 
				clearInterval(this.timer);
				var _this = this;
				this.isStart = true; 
				this.timer = setInterval(function (ev) { if(_this.direction) _this.move(ev); }, _this.speed);
			},
	stop : function (){
			this.isStart = false;
			clearInterval(this.timer);
		},
	changeDirection : function(kCode){
			switch (kCode) {
				case 37: this.direction = "left";
					break;
				case 38: this.direction = "up";
					break;
				case 39: this.direction = "right";
					break;
				case 40: this.direction = "down";
					break;
			}
	},		
	createSnake : function(){
		this.area.innerHTML = "";
		for (var i = 2; i >= 0; i--) {
			var div = document.createElement("div");
			div.className = this.sClass;
			div.innerHTML = i + 1;
			div.style.top = 0;
			div.style.left = this.width*7 - i * this.width + "px";
			if (i == 0) {
				div.setAttribute("id", "div1");
			}
			this.area.appendChild(div);
		}
		
		this.eatScore=0;
		this.direction = null;
		
		if(!getElementsByClass(this.area,this.fClass)[0]){
			var newFood=new Food({ rangeX : this.area.offsetWidth, rangeY : this.area.offsetHeight, width : this.width, height : this.height, fClass : this.fClass });
			this.area.appendChild(newFood);
		}
		
	},
	move : function (ev) {
				this.aDiv.length = 0;
				var oSnake=getElementsByClass(this.area,this.sClass);
				
				for(var i=0;i<oSnake.length;i++){
					this.aDiv.push(oSnake[i]);
				}
				if(!this.isAlive()) {
					if(typeof this.afterHitFn === "function") this.afterHitFn(this.eatScore);
					this.createSnake();
					return false;
				}
				
				var food = this.lookFood();
				if(food) {
					this.eat(food);
				}
				
				for (var i = 0; i < this.aDiv.length - 1; i++) {
					this.aDiv[i].style.left = this.aDiv[i + 1].offsetLeft + "px";
					this.aDiv[i].style.top = this.aDiv[i + 1].offsetTop + "px";
				}
				
				var iLastDivLeft = this.aDiv[this.aDiv.length - 1].offsetLeft;
				var iLastDivTop = this.aDiv[this.aDiv.length - 1].offsetTop;
				
				switch (this.direction) {
					case "left":
						this.aDiv[this.aDiv.length - 1].style.left = iLastDivLeft - this.width + "px";
						break;
					case "up":
						this.aDiv[this.aDiv.length - 1].style.top = iLastDivTop - this.height + "px";
						break;
					case "right":
						this.aDiv[this.aDiv.length - 1].style.left = iLastDivLeft + this.width + "px";
						break;
					case "down":
						this.aDiv[this.aDiv.length - 1].style.top = iLastDivTop + this.height + "px";
						break;
				}
			},
	//判断是否还活着
	isAlive : function(){
				var iLastDivLeft = this.aDiv[this.aDiv.length - 1].offsetLeft;
				var iLastDivTop = this.aDiv[this.aDiv.length - 1].offsetTop;
			
				var iLastDivWidth = this.aDiv[this.aDiv.length - 1].offsetWidth;
				var iLastDivHeight = this.aDiv[this.aDiv.length - 1].offsetHeight;
				var iLastSndDivLeft = this.aDiv[this.aDiv.length - 2].offsetLeft;
				var iLastSndDivTop = this.aDiv[this.aDiv.length - 2].offsetTop;
				var iBoxHeight = this.area.offsetHeight;
				var iBoxWidth = this.area.offsetWidth;
				
				var isDead = false;
				
				switch (this.direction) {
					case "left":
						isDead = (iLastDivLeft - this.width < 0)  ;
						if (iLastDivLeft - this.width == iLastSndDivLeft) {
							this.direction = "right";
						}
						break;
					case "up":
						isDead =  (iLastDivTop - this.height < 0) ;
						if (iLastDivTop - this.height == iLastSndDivTop) {
							this.direction = "down";
						}
						break;
					case "right":
						isDead =  ((iLastDivLeft + this.width) > iBoxWidth - iLastDivWidth) ;
						if (iLastDivLeft + this.width == iLastSndDivLeft) {
							this.direction = "left";
						}
						break;
					case "down":
						isDead = ((iLastDivTop + this.height) > iBoxHeight - iLastDivHeight) ;
						if (iLastDivTop + this.height == iLastSndDivTop) {
							this.direction = "up";
						}
						break;
				}
				return !isDead;
			},
	lookFood : function(){	
					var food = getElementsByClass(this.area,this.fClass)[0];
					var oLastDiv = this.aDiv[this.aDiv.length - 1];
					var nLeft = oLastDiv.offsetLeft + oLastDiv.offsetWidth - food.offsetLeft;
					var nUp = oLastDiv.offsetTop + oLastDiv.offsetHeight - food.offsetTop;
					var nRight = oLastDiv.offsetLeft - food.offsetLeft - food.offsetWidth;
					var nDown = oLastDiv.offsetTop - food.offsetTop - food.offsetHeight;
				
					if (!(nLeft <= 0 || nUp <= 0 || nRight >= 0 || nDown >= 0)) {
						return food;
					}
			},
	eat : function (food) {
			this.area.removeChild(food);
			var div = document.createElement("div");
			div.className = this.sClass;
			this.area.insertBefore(div, this.aDiv[0]);
			this.aDiv.unshift(div);
			
			if(!getElementsByClass(this.area,this.fClass)[0]){
				var newFood=new Food({ rangeX : this.area.offsetWidth, rangeY : this.area.offsetHeight, width : this.width, height : this.height, fClass : this.fClass });
				this.area.appendChild(newFood);
			}
		
			//计分
			this.eatScore = parseInt(parseInt(this.eatScore) + parseInt(this.speed));
			if(typeof this.afterEatFn === "function") this.afterEatFn(this.eatScore);
		}
}
    
function Food(opts) {
	var defaults = {
		growRangeWidth : document.documentElement.clientWidth,
		growRangeHeight : document.documentElement.clientHeight,
		width : 10,
		height : 10,
		fClass : ""
	};
	if(opts){
		defaults.growRangeWidth = opts.rangeX || defaults.growRangeWidth;
		defaults.growRangeHeight = opts.rangeY || defaults.growRangeHeight;
		defaults.width = opts.width || defaults.width;
		defaults.height = opts.height || defaults.height;
		defaults.fClass = opts.fClass || defaults.fClass;
	}
	this.growRangeWidth = defaults.growRangeWidth ;
	this.growRangeHeight = defaults.growRangeHeight; 
	this.width = defaults.width ;
	this.height = defaults.height ;
	this.fClass = defaults.fClass ;
	
	return this.grow();
}

Food.prototype.grow = function(){
	var x = this.growRangeWidth - this.width;
	var y = this.growRangeHeight - this.height;
	var rX = Math.floor(Math.random() * (x/this.width) + 1) * this.width; //指定范围内随机生成left
	var rY = Math.floor(Math.random() * (y/this.height) + 1) * this.height; //指定范围内随机生成top
	var div = document.createElement("div");
	div.className = this.fClass;	
	div.style.left = rX + "px";
	div.style.top = rY + "px";
	return div;
}

function getElementsByClass(obj, className) {
	var o = obj.getElementsByTagName("*");
	var aEle = [];
	for (var i = 0; i < o.length; i++) {
		if (o[i].className == className) {
			aEle.push(o[i]);
		}
	}
	return aEle;
}