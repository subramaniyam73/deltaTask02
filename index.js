var canvas=document.querySelector("canvas");
var c=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;
var colorArray=["#FAE100","#900DFF","#FF0181","#32DBF0"];
var af,obs,obs2,colorFinals=[],gameStatus=-1;
var flag=1,min=innerHeight,change,m,n,p;
var scoreMin=600,score=0,scoreChange,randomAngle;var temporaryColor,temporaryColor2,pauseStatus=-1;
var obsArray=[],starCount=0,previousValue;
var colors=[],colorsCurrent;
var displayValue;

var difficulty,directionArray=[];
directionArray.push(true);directionArray.push(false);

var deltaImage=document.createElement("image");
deltaImage.src="deltaLogoGreen.png";
function generateColor(){
colors.length=0;
for(var k=0;k<4;k++)
{
  colorsCurrent=Math.floor(Math.random()*4);
  while(colors.includes(colorsCurrent))
  {
    colorsCurrent=Math.floor(Math.random()*4);
  }
  colors.push(colorsCurrent);

}
}

var themeMusic=new Audio("audioFiles/themeMusic.mp3");
var jump=new Audio("audioFiles/jump.wav");
var dead=new Audio("audioFiles/dead.wav");
var starAudio=new Audio("audioFiles/star.wav");
var buttonAudio=new Audio("audioFiles/button.wav");
var colorswitchAudio=new Audio("audioFiles/colorswitch.wav");
var startAudio=new Audio("audioFiles/start.wav");
buttonAudio.volume=1;
colorswitchAudio.volume=1;
startAudio.volume=1;

themeMusic.loop=true;
themeMusic.volume=0.2;
jump.volume=1;
dead.volume=1;
starAudio.volume=1;


canvas.style.opacity=0;
canvas.style.zIndex=-1;
document.querySelector(".gameButtons").style.opacity=0;
document.querySelector(".gameButtons").style.zIndex=-1;
document.querySelector("#resume").classList.add("noHover");
document.querySelector(".resultsPage").style.opacity=0;
document.querySelector(".resultsPage").style.zIndex=-1;
document.querySelector(".startPage").style.opacity=1;
document.querySelector(".startPage").style.zIndex=1;
document.querySelector(".modeChooser").style.opacity=0;
document.querySelector(".modeChooser").style.zIndex=-1;
document.querySelector(".modeChooser").style.height=`${innerHeight}`;
var staticDetail={
  x:innerWidth*0.5,
  y:630,
  status:1,
  draw:function(){
    if(this.status==1)
    {
    c.beginPath();
    c.moveTo(this.x-10,this.y);
    c.lineTo(this.x-20,this.y);
    c.lineTo(this.x,this.y-20);
    c.lineTo(this.x+20,this.y);
    c.lineTo(this.x+10,this.y);
    c.lineTo(this.x+10,this.y+20);
    c.lineTo(this.x-10,this.y+20);
    c.closePath();
    c.fillStyle="white";
    c.fill();
    c.beginPath();
    c.textAlign="center";
    c.font = "50px Righteous";

    //c.fontFamily="'Righteous', cursive";
    if(screen.width>=1024)
    c.fillText("PRESS B TO JUMP !",this.x,this.y+85);
    else
    c.fillText("TAP TO JUMP !",this.x,this.y+85);

    }

  }
};


document.querySelector("#easy").addEventListener("click",function(event){
  restart();
  document.querySelector(".modeChooser").style.opacity=0;
  document.querySelector(".modeChooser").style.zIndex=-1;
  canvas.style.opacity=1;
  canvas.style.zIndex=1;
  document.querySelector(".gameButtons").style.zIndex=2;
  document.querySelector(".gameButtons").style.opacity=1;
  gameStatus=1;
  difficulty=this.textContent;
  speed=300;
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0.01;
    document.querySelector(".touchPad").style.zIndex=3;

  }
    
  startAudio.play();

});
document.querySelector("#medium").addEventListener("click",function(event){
  restart();
  document.querySelector(".modeChooser").style.opacity=0;
  document.querySelector(".modeChooser").style.zIndex=-1;
  canvas.style.opacity=1;
  canvas.style.zIndex=1;
  document.querySelector(".gameButtons").style.zIndex=2;
  document.querySelector(".gameButtons").style.opacity=1;
  gameStatus=1;
  difficulty=this.textContent;
  speed=150;
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0.01;
    document.querySelector(".touchPad").style.zIndex=3;

  }
    
  startAudio.play();

});
document.querySelector("#hard").addEventListener("click",function(event){
  restart();
  document.querySelector(".modeChooser").style.opacity=0;
  document.querySelector(".modeChooser").style.zIndex=-1;
  canvas.style.opacity=1;
  canvas.style.zIndex=1;
  document.querySelector(".gameButtons").style.zIndex=2;
  document.querySelector(".gameButtons").style.opacity=1;
  gameStatus=1;
  difficulty=this.textContent;
  speed=75;
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0.01;
    document.querySelector(".touchPad").style.zIndex=3;

  }
  
  startAudio.play();
});
document.querySelector("#newGame").addEventListener("click",function(){
  restart();
  buttonAudio.play();
});

document.querySelector("#pause").addEventListener("click",function(){
  document.querySelector("#pause").classList.add("noHover");
  gameStatus=-1;
  pauseStatus=1;
  document.querySelector("#resume").classList.remove("noHover");
  buttonAudio.play();


});
document.querySelector("#resume").addEventListener("click",function(){
  document.querySelector("#resume").classList.add("noHover");
  gameStatus=1;
  pauseStatus=-1;
  document.querySelector("#pause").classList.remove("noHover");
  buttonAudio.play();

});

document.querySelector("#startGame").addEventListener("click",function(){
  document.querySelector(".modeChooser").style.opacity=1;
  document.querySelector(".modeChooser").style.zIndex=1;
  document.querySelector(".startPage").style.opacity=0;
  document.querySelector(".startPage").style.zIndex=-1;
  themeMusic.play();
  buttonAudio.play();
});

document.querySelector("#newGame2").addEventListener("click",function(){
  gameStatus=-1;
  document.querySelector(".gameButtons").style.opacity=0;
  document.querySelector(".gameButtons").style.zIndex=-1;
  canvas.style.opacity=0;
  canvas.style.zIndex=-1;
  document.querySelector(".modeChooser").style.opacity=1;
  document.querySelector(".modeChooser").style.zIndex=1;
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0;
    document.querySelector(".touchPad").style.zIndex=-1;

  }
  buttonAudio.play();

});

if(screen.width<1024)
{
  document.querySelector(".touchPad").addEventListener("touchstart",function(){
    if(gameStatus==1)
    {
      jump.play();
      gameBall.dy=-2;
      gameBall.change=0;
      gameBall.y+=-15;

    }
  },false);
}
generateColor();
c.lineWidth=20;
var checkCondition=colorArray[colors[0]];
previousValue=colorArray[colors[0]];



function Obstacle(x,y,radius){
  while(colorArray[colors[0]]==previousValue)
  generateColor();
  previousValue=colorArray[colors[0]];
  randomAngle=Math.random()*(Math.PI*2);
  this.x=x;
  this.y=y;
  this.radius=radius;
  this.starRadius=10;
  this.color1=colorArray[colors[0]];
  this.color2=colorArray[colors[1]];
  this.color3=colorArray[colors[2]];
  this.color4=colorArray[colors[3]];
  this.angle1=randomAngle;
  this.angle2=this.angle1+Math.PI*0.5;
  this.angle3=this.angle1+Math.PI*1;
  this.angle4=this.angle1+Math.PI*1.5;
  this.down=-1;
  this.star=1;
  this.colorSwitchValue=colorArray[colors[0]];
  this.colorSwitchStatus=1;
  this.update2=function()
  {
    this.angle1-=Math.PI/speed;
    this.angle2-=Math.PI/speed;
    this.angle3-=Math.PI/speed;
    this.angle4-=Math.PI/speed;

    /*if(this.angle1<=0&&this.angle1>=-Math.PI/speed)
    this.angle1=Math.PI*2;*/

    this.draw2();

    if((gameBall.y-this.y<=0||gameBall.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount++;
      this.star=-1;

    }
    if((gameBall.y-(this.y+175)<=0||gameBall.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall.color=this.colorSwitchValue;
      checkCondition=colorArray[colors[0]];
      colorswitchAudio.play();

    }
    if(this.angle1<=0)
    var a1=Math.PI*2-(Math.abs(this.angle1)%(Math.PI*2));
    else
    var a1=this.angle1;

    if((a1>=0&&a1<=Math.PI*0.5))
    this.down=this.color1;
    else if(a1>=Math.PI*0.5&&a1<=Math.PI*1)
    this.down=this.color4;
    else if(a1>=Math.PI*1&&a1<=Math.PI*1.5)
    this.down=this.color3;
    else if(a1>=Math.PI*1.5&&a1<=Math.PI*2)
    this.down=this.color2;

    if(a1>=Math.PI&&a1<=Math.PI*1.5)
    this.up=this.color1;
    else if(a1>=Math.PI*1.5&&a1<=Math.PI*2)
    this.up=this.color4;
    else if(a1>=0&&a1<=Math.PI*0.5)
    this.up=this.color3;
    else if(a1>=Math.PI*0.5&&a1<=Math.PI*1)
    this.up=this.color2;

    if(this.radius==100)
    {
    if(gameBall.y>=this.y+this.radius&&gameBall.y<=this.y+this.radius+15)
    {
      if(this.down!==checkCondition)
      {dead.play();gameStatus=-1;endGame();}
    }
    if(gameBall.y>=this.y-this.radius-15&&gameBall.y<=this.y-this.radius)
    {
      if(this.up!==checkCondition)
      {dead.play();gameStatus=-1;endGame();}
    }

    if(this.y>=700)
    {
      if(this.radius==100)
      {
      obsArray.push(new Obstacle(innerWidth*0.5,0,100));
      this.radius=0;
      }
    }
    }


  }
  this.update=function(){
    this.angle1+=Math.PI/speed;
    this.angle2+=Math.PI/speed;
    this.angle3+=Math.PI/speed;
    this.angle4+=Math.PI/speed;
    /*if(this.angle1>=Math.PI*2&&this.angle1<=Math.PI*2+Math.PI/speed)
    this.angle1=0;*/

    this.draw();
    if((gameBall.y-this.y<=0||gameBall.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount++;
      this.star=-1;
    }
    if((gameBall.y-(this.y+175)<=0||gameBall.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall.color=this.colorSwitchValue;
      checkCondition=colorArray[colors[0]];
      colorswitchAudio.play();

    }
    var a1=this.angle1%(Math.PI*2);

    if((a1>=0&&a1<=Math.PI*0.5))
    this.down=this.color1;
    else if(a1>=Math.PI*0.5&&a1<=Math.PI*1)
    this.down=this.color4;
    else if(a1>=Math.PI*1&&a1<=Math.PI*1.5)
    this.down=this.color3;
    else if(a1>=Math.PI*1.5&&a1<=Math.PI*2)
    this.down=this.color2;

    if(a1>=Math.PI&&a1<=Math.PI*1.5)
    this.up=this.color1;
    else if(a1>=Math.PI*1.5&&a1<=Math.PI*2)
    this.up=this.color4;
    else if(a1>=0&&a1<=Math.PI*0.5)
    this.up=this.color3;
    else if(a1>=Math.PI*0.5&&a1<=Math.PI*1)
    this.up=this.color2;


    if(this.radius==100){
    if((gameBall.y-10<=this.y+this.radius+15&&gameBall.y-10>=this.y+this.radius+7.5)||(gameBall.y+10>=this.y+this.radius&&gameBall.y+10<=this.y+this.radius+7.5))
    {
      if(this.down!==checkCondition)
      {dead.play();gameStatus=-1;endGame();}
    }
    if((gameBall.y-10<=this.y-this.radius&&gameBall.y-10>=this.y-this.radius-7.5)||(gameBall.y+10>=this.y-this.radius-15&&gameBall.y+10<=this.y-this.radius-7.5))
    {
      if(this.up!==checkCondition)
      {dead.play();gameStatus=-1;endGame();}
    }

    if(this.y>=700)
    {
      if(this.radius==100)
      {
      obsArray.push(new Obstacle(innerWidth*0.5,0,100));
      this.radius=0;
      }
    }
  }
  }
  this.draw2=function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle1,this.angle1+Math.PI*0.5,false);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle2,this.angle2+Math.PI*0.5,false);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle3,this.angle3+Math.PI*0.5,false);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle4,this.angle4+Math.PI*0.5,false);
    c.strokeStyle=this.color4;
    c.lineWidth=15;
    c.stroke();

    if(this.star==1)
    {
      drawStar(this.x,this.y,5,20,10);
    }

    if(this.colorSwitchStatus==1)
    {
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle1,this.angle1+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color1;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle2,this.angle2+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color2;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle3,this.angle3+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color3
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle4,this.angle4+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color4;
      c.fill()

    }
  }
  this.draw=function()
  {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle1,this.angle1+Math.PI*0.5,false);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle2,this.angle2+Math.PI*0.5,false);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle3,this.angle3+Math.PI*0.5,false);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle4,this.angle4+Math.PI*0.5,false);
    c.strokeStyle=this.color4;
    c.lineWidth=15;
    c.stroke();
    if(this.star==1)
    {
      drawStar(this.x,this.y,5,20,10);
    }
    if(this.colorSwitchStatus==1)
    {
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle1,this.angle1+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color1;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle2,this.angle2+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color2;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle3,this.angle3+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color3
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle4,this.angle4+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color4;
      c.fill()

    }
  }
}

obs=new Obstacle(innerWidth*0.5,0,100);
obs.colorSwitchStatus=-1;


var gameBall={
  x:innerWidth*0.5,
  y:600,
  dy:0,
  radius:10,
  change:0,
  color:colorArray[colors[0]],
  downMovement:3,
  update: function(){
    this.y+=this.dy;
    this.change+=this.dy;
    if(this.change<-20)
    {
      this.dy=2;
    }
    /*if(this.y>=800)
    {
      this.dy=0;
    }*/
    this.draw();
    c.lineWidth=3;
    c.font = "50px Comic Sans MS";
    c.fillStyle = "red";
    //c.fillText(`${starCount}`,1000,200);

    if(this.y+10>=staticDetail.y-40&&staticDetail.y-40<innerHeight)
    this.dy=0;

    if(this.y+10>=innerHeight)
    {
      gameStatus=-1;
      endGame();
    }

    if(this.y<600&&this.y>300)
    {
      if(this.y<450)
      min=600;
      if(this.y<min)
      {

        //if(this.dy==2)
        //this.downMovement=0;
        //else
          this.downMovement=2.3;
        change=min-this.y;
        colorCircle.y+=this.downMovement;
        obs.y+=this.downMovement;
        staticDetail.y+=this.downMovement;
        for(var j=0;j<obsArray.length;j++)
        {
          obsArray[j].y+=this.downMovement;
        }
        min=this.y;


      }

    }
    else{
      if(this.y<450)
      min=600;
      if(this.y<min)
      {

        //if(this.dy==2)
        //this.downMovement=0;
        //else
          this.downMovement=2.3;
        change=min-this.y;
        colorCircle.y+=this.downMovement;
        obs.y+=this.downMovement;
        staticDetail.y+=this.downMovement;
        for(var j=0;j<obsArray.length;j++)
        {
          obsArray[j].y+=this.downMovement;
        }
        min=this.y;

    }
  }




      //c.strokeText(`${starCount}`,1000,200);


  },

  draw: function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
    c.fillStyle=this.color;
    c.fill();

  }
}

var colorCircle={
  x:innerWidth*0.5,
  y:350,
  radius:100,
  color1:colorArray[colors[0]],
  color2:colorArray[colors[1]],
  color3:colorArray[colors[2]],
  color4:colorArray[colors[3]],
  angle1:0,
  angle2:Math.PI/2,
  angle3:Math.PI,
  angle4:Math.PI*1.5,
  down:1,
  up:-1,
  star:1,
  update:function(){
    this.angle1+=Math.PI/speed;
    this.angle2+=Math.PI/speed;
    this.angle3+=Math.PI/speed;
    this.angle4+=Math.PI/speed;

    /*if(this.angle1===Math.PI*2)
    this.angle1=0;*/

    this.draw();
    if((gameBall.y-this.y<=0||gameBall.y-this.y<=20)&&this.star==1)
    {
      starCount++;
      this.star=-1;
      starAudio.play();
    }

    var a1=this.angle1%(Math.PI*2);
    if((a1>=0&&a1<=Math.PI*0.5))
    this.down=1;
    else
    this.down=-1;
    if(a1>=Math.PI&&a1<=Math.PI*1.5)
    this.up=1;
    else
    this.up=-1;
    //console.log(this.down);
    //gameBall.y-10<=this.y+this.radius+15&&gameBall.y-10>=this.y+this.radius+10||gameBall.y+10>=this.y+this.radius&&gameBall.y+10<=this.y+this.radius+5
    //gameBall.y-10<=this.y-this.radius&&gameBall.y-10>=this.y-this.radius-5||gameBall.y+10<=this.y-this.radius-10&&gameBall.y+10>=this.y-this.radius-15
    if((gameBall.y-10<=this.y+this.radius+15&&gameBall.y-10>=this.y+this.radius+7.5)||(gameBall.y+10>=this.y+this.radius&&gameBall.y+10<=this.y+this.radius+7.5))
    {
      if(this.down!==1)
      {gameStatus=-1;endGame();dead.play();}
    }
    if((gameBall.y-10<=this.y-this.radius&&gameBall.y-10>=this.y-this.radius-7.5)||(gameBall.y+10>=this.y-this.radius-15&&gameBall.y+10<=this.y-this.radius-7.5))
    {
      if(this.up!==1)
      {gameStatus=-1;endGame();dead.play();}
    }
    if(this.y>=700)
    {
      if(this.radius==100)
      {
      obsArray.push(new Obstacle(innerWidth*0.5,0,100));
      this.radius=0;
      }
    }

  },
  draw:function()
  {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle1,this.angle1+Math.PI*0.5,false);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle2,this.angle2+Math.PI*0.5,false);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle3,this.angle3+Math.PI*0.5,false);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.angle4,this.angle4+Math.PI*0.5,false);
    c.strokeStyle=this.color4;
    c.lineWidth=15;
    c.stroke();
    if(this.star==1)
    {
      drawStar(this.x,this.y,5,20,10);
    }
  }
}


function animate()
{
  af=requestAnimationFrame(animate);
  if(gameStatus==1){
  c.clearRect(0,0,innerWidth,innerHeight);
  gameBall.update();
  colorCircle.update();
  obs.update();
  staticDetail.draw();
  checkHighest();
  if(difficulty=="EASY"){

  for(var j=0;j<obsArray.length;j++)
  {
    obsArray[j].update();
  }

  }
  if(difficulty=="MEDIUM")
  {
    for(var j=0;j<obsArray.length;j++)
    {
      if(j%2==0)
      obsArray[j].update2();
      else
      obsArray[j].update();
    }
  }
  if(difficulty=="HARD")
  {
    for(var j=0;j<obsArray.length;j++)
    {
      if(j%2==0)
      obsArray[j].update2();
      else
      obsArray[j].update();
    }
  }
}


}
animate();
window.addEventListener("keydown",function(event){

  if(event.key==="b"&&gameStatus==1)
  {
  jump.play();
  gameBall.dy=-2;
  gameBall.change=0;
  gameBall.y+=-15;
  }


});
function endGame()
{
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0;
    document.querySelector(".touchPad").style.zIndex=-1;

  }
  document.querySelector(".gameButtons").style.opacity=0;
  document.querySelector(".gameButtons").style.zIndex=-1;
  canvas.style.opacity=0;
  canvas.style.zIndex=-1;
  document.querySelector(".resultsPage").style.opacity=1;
  document.querySelector(".resultsPage").style.zIndex=1;
  c.clearRect(0,0,innerWidth,innerHeight);
  obs.radius=0;
  colorCircle.radius=0;
  obs.star=-1;
  obs.colorSwitchStatus=-1;
  colorCircle.star=-1;
  staticDetail.status=-1;
  document.querySelector(".gameButtons").style.opacity=0;
  document.querySelector(".gameButtons").style.zIndex=-1;
  for(let i=0;i<obsArray.length;i++)
  {
    obsArray[i].star=-1;
    obsArray[i].colorSwitchStatus=-1;

  }
  for(let i=0;i<obsArray.length;i++)
  {
    obsArray[i].radius=0;
  }
  for(m=1;m<=6;m++)
  {
    if(localStorage.getItem(difficulty+`bs${m}`)==null||localStorage.getItem(difficulty+`bs${m}`)==="?")
    {
      if(starCount!=0)
      localStorage.setItem(difficulty+`bs${m}`,starCount);
      break;
    }
  }
  for(m=6;m>=1;m--)
  {
    if(localStorage.getItem(difficulty+`bs${m}`)!==null||localStorage.getItem(difficulty+`bs${m}`)==="?")
    {
      for(n=1;n<=m;n++)
      {
        for(p=n+1;p<=m;p++)
        {
          if(Number(localStorage.getItem(difficulty+`bs${p}`))>Number(localStorage.getItem(difficulty+`bs${n}`)))
          {
            temporary=localStorage.getItem(difficulty+`bs${p}`);
            localStorage.setItem(difficulty+`bs${p}`,localStorage.getItem(difficulty+`bs${n}`));
            localStorage.setItem(difficulty+`bs${n}`,temporary);

          }
        }

      }
      if(localStorage.getItem(difficulty+`bs6`)!=null)
      localStorage.setItem(difficulty+`bs6`,"?");
      break;
    }
  }
  for(m=5;m>=1;m--)
  {
    if(localStorage.getItem(difficulty+`bs${m}`)!==null)
    {
      for(n=1;n<=m;n++)
      {
        document.querySelector("#v"+n).textContent=localStorage.getItem(difficulty+`bs${n}`);

      }
      break;
    }
  }


}
function restart()
{
  document.querySelector(".modeChooser").style.opacity=1;
  document.querySelector(".modeChooser").style.zIndex=1;
  document.querySelector(".resultsPage").style.opacity=0;
  document.querySelector(".resultsPage").style.zIndex=-1;

  difficulty="";
  
  document.querySelector("#pause").classList.remove("noHover");
  document.querySelector("#resume").classList.add("noHover");

  for(let i=1;i<=5;i++)
  {
    document.querySelector("#v"+i).textContent="";
  }
  checkCondition=gameBall.color;
  randomAngle=Math.random()*(Math.PI*2);
  gameStatus=1;
  obsArray.size=0;
  starCount=0;
  min=innerHeight;
  obs.colorSwitchStatus=-1;
  staticDetail.status=1;
  staticDetail.y=630;
  obs.x=innerWidth*0.5;
  obs.y=0;
  obs.radius=100;
  obs.color1=colorArray[colors[0]];
  obs.color2=colorArray[colors[1]];
  obs.color3=colorArray[colors[2]];
  obs.color4=colorArray[colors[3]];
  obs.angle1=randomAngle;
  obs.angle2=randomAngle+Math.PI*0.5;
  obs.angle3=randomAngle+Math.PI;
  obs.angle4=randomAngle+Math.PI*1.5;
  obs.down=-1;
  obs.star=1;
  colorCircle.x=innerWidth*0.5;
  colorCircle.y=350;
  colorCircle.radius=100;
  colorCircle.color1=colorArray[colors[0]];
  colorCircle.color2=colorArray[colors[1]];
  colorCircle.color3=colorArray[colors[2]];
  colorCircle.color4=colorArray[colors[3]];
  colorCircle.angle1=0;
  colorCircle.angle2=Math.PI/2;
  colorCircle.angle3=Math.PI;
  colorCircle.angle4=Math.PI*1.5;
  colorCircle.down=1;
  colorCircle.up=-1;
  colorCircle.star=1;
  gameBall.x=innerWidth*0.5;
  gameBall.y=590;
  gameBall.dy=0;
  gameBall.radius=10;
  gameBall.change=0;
  gameBall.color=colorArray[colors[0]];

}

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    c.strokeSyle = "white";
    c.beginPath();
    c.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y)
        rot += step
    }
    c.lineTo(cx, cy - outerRadius)
    c.closePath();
    c.lineWidth=5;
    c.strokeStyle='white';
    c.stroke();
    c.fillStyle='white';
    c.fill();

}
function Deltas()
{
  this.x=Math.random()*innerWidth/3;
}
function checkHighest()
{
  if(localStorage.getItem(difficulty+"bs1")==null)
  {
    displayValue=starCount;
  }
  else if(localStorage.getItem(difficulty+"bs1")<starCount)
  {
    displayValue=starCount;
  }
  else
  {
    displayValue=localStorage.getItem(difficulty+"bs1");
  }

  document.querySelector("#value").textContent=displayValue;
  document.querySelector("#value2").textContent=starCount;
}
