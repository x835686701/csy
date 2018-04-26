
var WINDOW_WIDTH = 1920;		//画布宽度
var WINDOW_HEIGHT = 1080;		//画布高度
var RADIUS = 8;		//小圆半径
var MAGIN_TOP = 180;
var MAGIN_LEFT = 450;
var balls = [];
const colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","#ff8800","#ff4444","#cc0000"];

window.onload = function () {

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();

	setInterval(function(){	//定时器
			render(context);
			update();
	},50);
}

function render(cxt){		//绘制方法

	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
	var seconds = curShowTimeSeconds%60;


	renderDigit(MAGIN_LEFT,MAGIN_TOP,parseInt(hours/10), cxt);		//绘制小时第一位数字
	renderDigit(MAGIN_LEFT+15*(RADIUS+1),MAGIN_TOP,parseInt(hours%10), cxt);	//绘制小时第二位数字
	renderDigit(MAGIN_LEFT+30*(RADIUS+1),MAGIN_TOP,10,cxt);			//绘制冒号
	renderDigit(MAGIN_LEFT+39*(RADIUS+1),MAGIN_TOP,parseInt(minutes/10), cxt);	//绘制分钟第一位数字
	renderDigit(MAGIN_LEFT+54*(RADIUS+1),MAGIN_TOP,parseInt(minutes%10), cxt);	//绘制分钟第二位数字
	renderDigit(MAGIN_LEFT+69*(RADIUS+1),MAGIN_TOP,10,cxt);			//绘制冒号
	renderDigit(MAGIN_LEFT+78*(RADIUS+1),MAGIN_TOP,parseInt(seconds/10), cxt);	//绘制秒钟第一位数字
	renderDigit(MAGIN_LEFT+93*(RADIUS+1),MAGIN_TOP,parseInt(seconds%10), cxt);	//绘制秒钟第二位数字

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
}

function renderDigit(x,y,num,cxt){			//绘制时间数字每个小圆点

	cxt.fillStyle = "#007500";

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	return ret;
}


function update(){
	var next_date = getCurrentShowTimeSeconds();
	var next_hours = parseInt(next_date / 3600);
	var next_minutes = parseInt((next_date - next_hours*3600)/60);
	var next_seconds = next_date%60;

	var cur_hours = parseInt(curShowTimeSeconds/3600);
	var cur_minutes = parseInt((curShowTimeSeconds - cur_hours*3600)/60);
	var cur_seconds = curShowTimeSeconds%60;

	if(next_seconds != cur_seconds){
		if(parseInt(cur_hours/10) != parseInt(next_hours/10)){		//小时十位数字改变
	  		addBalls(MAGIN_LEFT+0,MAGIN_TOP,parseInt(cur_hours/10));
	  	}
	  	if (parseInt(cur_hours%10) != parseInt(next_hours%10)) {	//小时个位数字改变
	  		addBalls(MAGIN_LEFT+15*(RADIUS+1),MAGIN_TOP,parseInt(cur_hours%10));
	  	}

	  	if (parseInt(cur_minutes/10) != parseInt(next_minutes/10)) {		//分钟十位数字改变
	  		addBalls(MAGIN_LEFT+39*(RADIUS+1),MAGIN_TOP,parseInt(cur_minutes/10));
	  	}
	  	if (parseInt(cur_minutes%10) != parseInt(next_minutes%10)) {		//分钟个位数字改变
	  		addBalls(MAGIN_LEFT+54*(RADIUS+1),MAGIN_TOP,parseInt(cur_minutes%10));
	  	}

	  	if (parseInt(cur_seconds/10) != parseInt(next_seconds/10)) {		//秒钟十位数字改变
	  		addBalls(MAGIN_LEFT+78*(RADIUS+1),MAGIN_TOP,parseInt(cur_seconds/10));
	  	}
	  	if (parseInt(cur_seconds%10) != parseInt(next_seconds%10)) {		//秒钟个位数字改变
	  		addBalls(MAGIN_LEFT+93*(RADIUS+1),MAGIN_TOP,parseInt(cur_seconds%10));
	  	}
	  }
	  updateBalls();
		curShowTimeSeconds = next_date;
	}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),		//加速度
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,		//水平方向速度 4或者-4
					vy:-5,		//垂直方向速度
					color:colors[Math.floor(Math.random()*colors.length)]		//从colors里面随机取颜色
				}
				balls.push(aBall);
			}
		}
	}
}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >=WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = - balls[i].vy*0.75;
		}
	}

	var cnt = 0;
	for(var i=0;i<balls.length;i++){
		if(RADIUS+balls[i].x > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		}
	}

	while (balls.length > cnt) {
		balls.pop();
	}
}