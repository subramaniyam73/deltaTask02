var canvas2=document.querySelector("#canvas2");
var c2=canvas2.getContext("2d");
canvas2.width=innerWidth;
canvas2.height=innerHeight;

var random2=Math.random()*Math.PI*2;


var animateCircle={
  x:innerWidth*0.5,
  y:innerHeight*0.5,
  radius:75,
  angle1:random2,
  angle2:random2+Math.PI*0.5,
  angle3:random2+Math.PI*1,
  angle4:random2+Math.PI*1.5,
  update: function(){
    this.angle1+=(Math.PI*2)/250;
    this.angle2+=(Math.PI*2)/250;
    this.angle3+=(Math.PI*2)/250;
    this.angle4+=(Math.PI*2)/250;
    this.draw();
  },

  draw:function(){
    c2.beginPath();
    c2.lineWidth=20;
    c2.strokeStyle="#FAE100";
    c2.arc(this.x,this.y,this.radius,this.angle1,this.angle1+Math.PI*0.5,false);
    c2.stroke();
    c2.beginPath();
    c2.lineWidth=20;
    c2.strokeStyle="#900DFF";
    c2.arc(this.x,this.y,this.radius,this.angle2,this.angle2+Math.PI*0.5,false);
    c2.stroke();
    c2.beginPath();
    c2.lineWidth=20;
    c2.strokeStyle="#FF0181";
    c2.arc(this.x,this.y,this.radius,this.angle3,this.angle3+Math.PI*0.5,false);
    c2.stroke();
    c2.beginPath();
    c2.lineWidth=20;
    c2.strokeStyle="#32DBF0";
    c2.arc(this.x,this.y,this.radius,this.angle4,this.angle4+Math.PI*0.5,false);
    c2.stroke();
  }
}

function animate2()
{
  c2.clearRect(0,0,innerWidth,innerHeight);
  requestAnimationFrame(animate2);
  animateCircle.update();
}
animate2();
