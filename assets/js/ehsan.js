/* Canvas and context objects */

var Canvas = document.getElementById('ehsanGraph');  
var Ctx = null ;

var Width = Canvas.width ;
var Height = Canvas.height ;

var xMin = -10;
var xMax = 10; 
var yMin = xMin * Height / Width;
var yMax = xMax * Height / Width;
var XSTEP = (xMax-xMin)/Width ;
var faselX = 1;
var faselY = 1;
var indde = 3 ;
var axesColor = '#fff';
var textColors = '#fff0a6'
var pX1 = 0;
var pY1 = 0;
var pX2 = 0;
var pY2 = 0;

function XC(x) {
  return (x - xMin) / (xMax - xMin) * Width ;
}
function bXC(bx) {
	return  (bx / Width)*(xMax - xMin) + xMin ;
}

function YC(y) {
  return Height - (y - yMin) / (yMax - yMin) * Height ;
}
function bYC(by) {
	return (Height - by)/Height * (yMax - yMin) + yMin;
}

var F = function(x,a) {
	return  eval(document.getElementById('function-code').value) ;
} ;
var F1 = function(t,r,k,a) {
	return  eval(document.getElementById('funp1').value) ;
} ;
var F2 = function(t,r,k,a) {
	return  eval(document.getElementById('funp2').value) ;
} ;


function RasmKon() {


 if (Canvas.getContext) {
  
   // Set up the canvas:
   Ctx = Canvas.getContext('2d');
   Ctx.clearRect(0,0,Width,Height) ;

   // Draw:
  setMinMaxY(F);
  DrawAxes() ;

   bekesh(F) ;
  
  } else {
    // Do nothing.
  }
}

function RasmKonP() {


 if (Canvas.getContext) {
  
   // Set up the canvas:
   Ctx = Canvas.getContext('2d');
   Ctx.clearRect(0,0,Width,Height) ;

setMinMaxYP();
  DrawAxes() ;

   bekeshP(F1,F2) ;
  
  } else {
    // Do nothing.
  }
}
function SetNextPoint(a,r,k,t) {


 	
	
	
	
		var x = F1(t,r,k,a) ;
		var y = F2(t,r,k,a);
		pX1 = XC(x);
		pY1 = YC(y);
		

   
  
  
}


function bekesh(f) {
	var first = true;
	var a = document.getElementById("zariba").value;
	Ctx.beginPath() ;
	for (var x = xMin; x <= xMax; x += XSTEP) {
	var y = f(x,a) ;

	if (first) {
	Ctx.moveTo(XC(x),YC(y)) ;
	first = false ;
	} else {
	Ctx.lineTo(XC(x),YC(y)) ;
	}
	}
	Ctx.strokeStyle = '#cafff9';
	Ctx.stroke() ;
}
function bekeshP(f,g) {
	var first = true;
	var a = document.getElementById("zariba2").value;
	var r = document.getElementById("rads1").value;
	var k = document.getElementById("rads2").value;
	Ctx.beginPath() ;
	for (var t = 0; t <= a; t += 0.1) {
		var x = f(t,r,k,a) ;
		var y = g(t,r,k,a);
		if (first) {
		Ctx.moveTo(XC(x),YC(y)) ;
		first = false ;
		} else {
		Ctx.lineTo(XC(x),YC(y)) ;
		}
		Ctx.strokeStyle = '#cafff9';
		Ctx.stroke() ;
		
//		sleep(20);

	}
}
function meDrawpoint() {
	Ctx.strokeStyle = '#cafff9';
		Ctx.stroke() ;
  
}

function setMinMaxYP()
{
	var ax = document.getElementById("Axx").value;
	var ay = document.getElementById("Axy").value;
	
	yMin = -1 * ay;
	yMax = ay;
	xMax = ax;
	xMin = -1 * ax;

}


function DrawAxes() {
 Ctx.save() ;
 Ctx.lineWidth = 2 ;
 // +Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(yMax)) ;
	Ctx.strokeStyle = axesColor;
 Ctx.stroke() ;

 // -Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(yMin)) ;
	Ctx.strokeStyle = axesColor;
 Ctx.stroke() ;

 // Y axis tick marks
 var delta = faselY ;
 var i = 0;
 for (i = 1; (i * delta) < yMax ; ++i) 
 {
	Ctx.beginPath() ;
	Ctx.moveTo(XC(0) - indde,YC(i * delta)) ;
	Ctx.lineTo(XC(0) + indde,YC(i * delta)) ;
	Ctx.strokeStyle = axesColor;
	Ctx.stroke() ;  
	Ctx.fillStyle = textColors;
	if(i!=0)
		Ctx.fillText(i, XC(0) + indde-13, YC(i * delta)+3);
 }

 delta = faselY ;
 for (i = 0; (i * delta) > yMin ; --i) 
 {
	Ctx.beginPath() ;
	Ctx.moveTo(XC(0) - indde,YC(i * delta)) ;
	Ctx.lineTo(XC(0) + indde,YC(i * delta)) ;
	Ctx.strokeStyle = axesColor;
	Ctx.fillStyle = textColors;
	Ctx.stroke() ;  
	if(i!=0) 
		Ctx.fillText(i, XC(0) + indde-16, YC(i * delta)+3);
 }  

 // +X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(xMax),YC(0)) ;
	Ctx.strokeStyle = axesColor;
 Ctx.stroke() ;

 // -X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(xMin),YC(0)) ;
	Ctx.strokeStyle = axesColor;
 Ctx.stroke() ;

 // X tick marks
 delta = faselX ;
 
 for (i = 1; (i * delta) < xMax ; ++i) 
 {
	Ctx.beginPath() ;
	Ctx.moveTo(XC(i * delta),YC(0)-indde) ;
	Ctx.lineTo(XC(i * delta),YC(0)+indde) ;
	Ctx.strokeStyle = axesColor;
	Ctx.stroke() ; 
	Ctx.fillStyle = textColors;
	if(i!=0)
		Ctx.fillText(i, XC(i * delta)-3, YC(0)+indde+9); 
 }

 delta = faselX ;
 for (i = 0; (i * delta) > xMin ; --i) 
 {
	Ctx.beginPath() ;
	Ctx.moveTo(XC(i * delta),YC(0)-indde) ;
	Ctx.lineTo(XC(i * delta),YC(0)+indde) ;
	Ctx.strokeStyle = axesColor;
	Ctx.stroke() ;
	Ctx.fillStyle = textColors; 
	if(i!=0)
		Ctx.fillText(i, XC(i * delta)-5, YC(0)+indde+9); 
 }
 
 Ctx.restore() ;
}
function DrawAxesP2(CtC) {
 CtC.save() ;
 CtC.lineWidth = 2 ;
 // +Y axis
 CtC.beginPath() ;
 CtC.moveTo(XC(0),YC(0)) ;
 CtC.lineTo(XC(0),YC(yMax)) ;
	CtC.strokeStyle = axesColor;
 CtC.stroke() ;

 // -Y axis
 CtC.beginPath() ;
 CtC.moveTo(XC(0),YC(0)) ;
 CtC.lineTo(XC(0),YC(yMin)) ;
	CtC.strokeStyle = axesColor;
 CtC.stroke() ;

 // Y axis tick marks
 var delta = faselY ;
 var i = 0;
 for (i = 1; (i * delta) < yMax ; ++i) 
 {
	CtC.beginPath() ;
	CtC.moveTo(XC(0) - indde,YC(i * delta)) ;
	CtC.lineTo(XC(0) + indde,YC(i * delta)) ;
	CtC.strokeStyle = axesColor;
	CtC.stroke() ;  
	CtC.fillStyle = textColors;
	if(i!=0)
		CtC.fillText(i, XC(0) + indde-13, YC(i * delta)+3);
 }

 delta = faselY ;
 for (i = 0; (i * delta) > yMin ; --i) 
 {
	CtC.beginPath() ;
	CtC.moveTo(XC(0) - indde,YC(i * delta)) ;
	CtC.lineTo(XC(0) + indde,YC(i * delta)) ;
	CtC.strokeStyle = axesColor;
	CtC.fillStyle = textColors;
	CtC.stroke() ;  
	if(i!=0) 
		CtC.fillText(i, XC(0) + indde-16, YC(i * delta)+3);
 }  

 // +X axis
 CtC.beginPath() ;
 CtC.moveTo(XC(0),YC(0)) ;
 CtC.lineTo(XC(xMax),YC(0)) ;
	CtC.strokeStyle = axesColor;
 CtC.stroke() ;

 // -X axis
 CtC.beginPath() ;
 CtC.moveTo(XC(0),YC(0)) ;
 CtC.lineTo(XC(xMin),YC(0)) ;
	CtC.strokeStyle = axesColor;
 CtC.stroke() ;

 // X tick marks
 delta = faselX ;
 
 for (i = 1; (i * delta) < xMax ; ++i) 
 {
	CtC.beginPath() ;
	CtC.moveTo(XC(i * delta),YC(0)-indde) ;
	CtC.lineTo(XC(i * delta),YC(0)+indde) ;
	CtC.strokeStyle = axesColor;
	CtC.stroke() ; 
	CtC.fillStyle = textColors;
	if(i!=0)
		CtC.fillText(i, XC(i * delta)-3, YC(0)+indde+9); 
 }

 delta = faselX ;
 for (i = 0; (i * delta) > xMin ; --i) 
 {
	CtC.beginPath() ;
	CtC.moveTo(XC(i * delta),YC(0)-indde) ;
	CtC.lineTo(XC(i * delta),YC(0)+indde) ;
	CtC.strokeStyle = axesColor;
	CtC.stroke() ;
	CtC.fillStyle = textColors; 
	if(i!=0)
		CtC.fillText(i, XC(i * delta)-5, YC(0)+indde+9); 
 }
 
 CtC.restore() ;
}

function setMinMaxY(f)
{
	var a = document.getElementById("zariba").value;
	var MaximY=0;
	var MinimY=0;
	for (var x = xMin; x <= xMax; x += XSTEP) {
	var y = f(x,a) ;
		if(y>MaximY)
			MaximY=y;
		if(MinimY>y)
			MinimY=y;
	}
	if(MaximY>10)
		MaximY = 10;
	if(MinimY<-10)
		MinimY = -10;
	yMin = MinimY - 1;
	yMax = MaximY + 1;

}






function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }

}

function showCoords(event) 
{
	var x = event.clientX - offsetX;
	var y = event.clientY - offsetY;
	var strr = "[x = " + bXC(x).toFixed(2) + " , y = " + bYC(y).toFixed(2) + "]";
	document.getElementById("idxy").innerHTML = strr;
} 

 
