var canvas=document.querySelector("canvas");
var c=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;
var colorArray=["#FAE100","#900DFF","#FF0181","#32DBF0"];
var af,obs,obs2,colorFinals=[],gameStatus=-1,gameStatus2=-1;
var flag=1,min=innerHeight,min2=innerHeight,change,m,n,p;
var scoreMin=600,score=0,scoreChange,randomAngle,randomAngle2;var temporaryColor,temporaryColor2,pauseStatus=-1;
var obsArray=[],obsArray2=[],starCount=0,starCount2=0,previousValue,previousValue2;
var colors=[],colors2=[],colorsCurrent,colorsCurrent2;
var displayValue;      var checkCondition2;

var difficulty,directionArray=[];
directionArray.push(true);directionArray.push(false);

var multiColorPowerUp=-1,slowPowerUp=-1;

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

var multiStatus=-1;

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
document.querySelector(".multiGameButtons").style.opacity=0;
document.querySelector(".multiGameButtons").style.zIndex=-1;
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
    c.font = "30px Righteous";

    //c.fontFamily="'Righteous', cursive";
    if(screen.width>=1024)
    c.fillText("PRESS B TO JUMP !",this.x,this.y+85);
    else
    c.fillText("TAP TO JUMP !",this.x,this.y+85);

    }

  }
};



document.querySelector("#easy").addEventListener("click",function(event){
  document.querySelector(".modeChooser").style.opacity=0;
  document.querySelector(".modeChooser").style.zIndex=-1;
  canvas.style.opacity=1;
  canvas.style.zIndex=1;
  if(multiStatus==-1){
  document.querySelector(".gameButtons").style.zIndex=2;
  document.querySelector(".gameButtons").style.opacity=1;
  }
  else
  {
    document.querySelector(".multiGameButtons").style.zIndex=2;
    document.querySelector(".multiGameButtons").style.opacity=1;
  }
  difficulty=this.textContent;
  speed=300;
  slowPowerUp=300;
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0.01;
    document.querySelector(".touchPad").style.zIndex=3;

  }

  startAudio.play();

});
document.querySelector("#medium").addEventListener("click",function(event){
  document.querySelector(".modeChooser").style.opacity=0;
  document.querySelector(".modeChooser").style.zIndex=-1;
  canvas.style.opacity=1;
  canvas.style.zIndex=1;
  if(multiStatus==-1){
  document.querySelector(".gameButtons").style.zIndex=2;
  document.querySelector(".gameButtons").style.opacity=1;
  }
  else
  {
    document.querySelector(".multiGameButtons").style.zIndex=2;
    document.querySelector(".multiGameButtons").style.opacity=1;
  }
  difficulty=this.textContent;
  speed=150;
  slowPowerUp=150;
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0.01;
    document.querySelector(".touchPad").style.zIndex=3;

  }

  startAudio.play();

});
document.querySelector("#hard").addEventListener("click",function(event){
  document.querySelector(".modeChooser").style.opacity=0;
  document.querySelector(".modeChooser").style.zIndex=-1;
  canvas.style.opacity=1;
  canvas.style.zIndex=1;
  if(multiStatus==-1){
  document.querySelector(".gameButtons").style.zIndex=2;
  document.querySelector(".gameButtons").style.opacity=1;
  }
  else
  {
    document.querySelector(".multiGameButtons").style.zIndex=2;
    document.querySelector(".multiGameButtons").style.opacity=1;
  }
  difficulty=this.textContent;
  speed=75;
  slowPowerUp=75;
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0.01;
    document.querySelector(".touchPad").style.zIndex=3;

  }

  startAudio.play();
});
document.querySelector("#newGame").addEventListener("click",function(){
  restart();
  document.querySelector(".startPage").style.opacity=1;
  document.querySelector(".startPage").style.zIndex=1;
  document.querySelector(".gameButtons").style.opacity=0;
  document.querySelector(".gameButtons").style.zIndex=-1;
  document.querySelector(".resultsPage").style.opacity=0;
  document.querySelector(".resultsPage").style.zIndex=-1;
  canvas.style.opacity=0;
  canvas.style.zIndex=-1;
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

document.querySelector("#multiPause1").addEventListener("click",function(){
  document.querySelector("#multiPause1").classList.add("noHover");
  gameStatus=-1;
  pauseStatus=1;
  document.querySelector("#multiResume1").classList.remove("noHover");
  buttonAudio.play();
});
document.querySelector("#multiPause2").addEventListener("click",function(){
  document.querySelector("#multiPause2").classList.add("noHover");
  gameStatus2=-1;
  pauseStatus=1;
  document.querySelector("#multiResume2").classList.remove("noHover");
  buttonAudio.play();
});
document.querySelector("#multiResume1").addEventListener("click",function(){
  document.querySelector("#multiResume1").classList.add("noHover");
  gameStatus=1;
  pauseStatus=-1;
  document.querySelector("#multiPause1").classList.remove("noHover");
  buttonAudio.play();

});
document.querySelector("#multiResume2").addEventListener("click",function(){
  document.querySelector("#multiResume2").classList.add("noHover");
  gameStatus2=1;
  pauseStatus=-1;
  document.querySelector("#multiPause2").classList.remove("noHover");
  buttonAudio.play();

});
document.querySelector("#multiNew1").addEventListener("click",function(){
  restart();
  document.querySelector(".multiGameButtons").style.opacity=0;
  document.querySelector(".multiGameButtons").style.zIndex=-1;
  canvas.style.opacity=0;
  canvas.style.zIndex=-1;
  document.querySelector(".player1Result").style.opacity=0;
  document.querySelector(".player1Result").style.zIndex=-1;
  document.querySelector(".player2Result").style.opacity=0;
  document.querySelector(".player2Result").style.zIndex=-1;
  document.querySelector(".startPage").style.opacity=1;
  document.querySelector(".startPage").style.zIndex=1;
  buttonAudio.play();
});
document.querySelector("#multiNew2").addEventListener("click",function(){
  restart();
  document.querySelector(".multiGameButtons").style.opacity=0;
  document.querySelector(".multiGameButtons").style.zIndex=-1;
  canvas.style.opacity=0;
  canvas.style.zIndex=-1;
  document.querySelector(".player1Result").style.opacity=0;
  document.querySelector(".player1Result").style.zIndex=-1;
  document.querySelector(".player2Result").style.opacity=0;
  document.querySelector(".player2Result").style.zIndex=-1;
  document.querySelector(".startPage").style.opacity=1;
  document.querySelector(".startPage").style.zIndex=1;
  buttonAudio.play();
});



document.querySelector("#startGame").addEventListener("click",function(){
  gameStatus=1;
  document.querySelector(".modeChooser").style.opacity=1;
  document.querySelector(".modeChooser").style.zIndex=1;
  document.querySelector(".startPage").style.opacity=0;
  document.querySelector(".startPage").style.zIndex=-1;
  themeMusic.play();
  buttonAudio.play();
});

document.querySelector("#newGame2").addEventListener("click",function(){
  restart();
  document.querySelector(".gameButtons").style.opacity=0;
  document.querySelector(".gameButtons").style.zIndex=-1;
  canvas.style.opacity=0;
  canvas.style.zIndex=-1;
  document.querySelector(".startPage").style.opacity=1;
  document.querySelector(".startPage").style.zIndex=1;
  if(screen.width<=1024)
  {
    document.querySelector(".touchPad").style.opacity=0;
    document.querySelector(".touchPad").style.zIndex=-1;

  }
  buttonAudio.play();

});

document.querySelector("#multiPlayer").addEventListener("click",function(){
  document.querySelector(".modeChooser").style.opacity=1;
  document.querySelector(".modeChooser").style.zIndex=1;
  document.querySelector(".startPage").style.opacity=0;
  document.querySelector(".startPage").style.zIndex=-1;
  multiStatus=1;
  gameStatus=1;
  gameStatus2=1;
  themeMusic.play();
  buttonAudio.play();

  staticDetail.x=innerWidth*0.25;
  gameBall.x=innerWidth*0.25;
  colorCircle.x=innerWidth*0.25;
  obs.x=innerWidth*0.25;


});

document.querySelector("#multiNewNew").addEventListener("click",function(){
  restart();
  document.querySelector(".player1Result").style.opacity=0;
  document.querySelector(".player1Result").style.zIndex=-1;
  document.querySelector(".player2Result").style.opacity=0;
  document.querySelector(".player2Result").style.zIndex=-1;
  document.querySelector(".multiGameButtons").style.opacity=0;
  document.querySelector(".multiGameButtons").style.zIndex=-1;
  canvas.style.opacity=0;
  canvas.style.zIndex=-1;
  document.querySelector(".startPage").style.opacity=1;
  document.querySelector(".startPage").style.zIndex=1;
  document.querySelector("#multiNewNew").style.opacity=0;
  document.querySelector("#multiNewNew").style.zIndex=-1;

});

if(screen.width<1024)
{
  document.querySelector(".touchPad").addEventListener("touchstart",function(){
    if(gameStatus==1)
    {
      jump.play();
      if(gameBall.y>innerHeight*0.5){
      gameBall.dy=-2;
      gameBall.mechanism=-2;
      gameBall.change=0;
      gameBall.y+=-15;
      }
      else
      {
        gameBall.mechanism=-2;
        gameBall.change=0;
        gameBall.dy=0;
        colorCircle.y+=7;
        obs.y+=7;
        staticDetail.y+=7;
        for(var j=0;j<obsArray.length;j++)
        {
          obsArray[j].y+=7;
        }
      }

    }
  },false);
}
generateColor();
c.lineWidth=20;
var checkCondition=colorArray[colors[0]];
previousValue=colorArray[colors[0]];
generateColor2();
checkCondition2=colorArray[colors2[0]];
previousValue2=colorArray[colors2[0]];


function Obstacle2(x,y,radius){
  while(colorArray[colors2[0]]==previousValue2)
  generateColor2();
  previousValue2=colorArray[colors2[0]];
  randomAngle2=Math.random()*(Math.PI*2);
  this.x=x;
  this.y=y;
  this.radius=radius;
  this.starRadius=10;
  this.color1=colorArray[colors2[0]];
  this.color2=colorArray[colors2[1]];
  this.color3=colorArray[colors2[2]];
  this.color4=colorArray[colors2[3]];
  this.angle1=randomAngle2;
  this.angle2=this.angle1+Math.PI*0.5;
  this.angle3=this.angle1+Math.PI*1;
  this.angle4=this.angle1+Math.PI*1.5;
  this.a1=0;
  this.a2=Math.PI*0.5;
  this.a3=Math.PI*1;
  this.a4=Math.PI*1.5;
  this.b1=Math.PI;
  this.b2=Math.PI*0.5;
  this.b3=0;
  this.b4=-Math.PI*0.5;
  this.radius2=135;
  this.down=-1;
  this.star=1;
  this.colorSwitchValue=colorArray[colors2[0]];
  this.colorSwitchStatus=1;
  this.update5=function()
  {
    if(this.star==1){
    this.radius=80;
    this.radius2=115;}
    this.a1+=(Math.PI*2)/(speed*2.4);
    this.a2+=(Math.PI*2)/(speed*2.4);
    this.a3+=(Math.PI*2)/(speed*2.4);
    this.a4+=(Math.PI*2)/(speed*2.4);
    this.b1-=(Math.PI*2)/(speed*2.4);
    this.b2-=(Math.PI*2)/(speed*2.4);
    this.b3-=(Math.PI*2)/(speed*2.4);
    this.b4-=(Math.PI*2)/(speed*2.4);

    this.draw5();

    if((gameBall2.y-this.y<=0||gameBall2.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount2++;
      this.star=-1;
      if(starCount2!==0&&starCount2%4==0&&starCount2%8!==0)
      {
        multiColorPowerUp=1;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount2!==0&&starCount2%8==0)
      {
        speed=330;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }


    }
    if((gameBall2.y-(this.y+175)<=0||gameBall2.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall2.color=this.colorSwitchValue;
      checkCondition2=colorArray[colors2[0]];
      colorswitchAudio.play();

    }
    if(this.b1<=0)
    var tempAngle2=Math.PI*2-(Math.abs(this.b1)%(Math.PI*2));
    else
    var tempAngle2=this.b1;

    if((tempAngle2>=Math.PI*0.5&&tempAngle2<=Math.PI))
    this.down1=this.color1;
    else if(tempAngle2>=0&&tempAngle2<=Math.PI*0.5)
    this.down1=this.color4;
    else if(tempAngle2>=Math.PI*1.5&&tempAngle2<=Math.PI*2)
    this.down1=this.color3;
    else if(tempAngle2>=Math.PI&&tempAngle2<=Math.PI*1.5)
    this.down1=this.color2;

    if(tempAngle2>=Math.PI*1.5&&tempAngle2<=Math.PI*2)
    this.up1=this.color1;
    else if(tempAngle2>=Math.PI&&tempAngle2<=Math.PI*1.5)
    this.up1=this.color4;
    else if(tempAngle2>=Math.PI*0.5&&tempAngle2<=Math.PI)
    this.up1=this.color3;
    else if(tempAngle2>=0&&tempAngle2<=Math.PI*0.5)
    this.up1=this.color2;

    var tempAngle22=this.a1%(Math.PI*2);

    if((tempAngle22>=0&&tempAngle22<=Math.PI*0.5))
    this.down2=this.color1;
    else if(tempAngle22>=Math.PI*0.5&&tempAngle22<=Math.PI*1)
    this.down2=this.color4;
    else if(tempAngle22>=Math.PI*1&&tempAngle22<=Math.PI*1.5)
    this.down2=this.color3;
    else if(tempAngle22>=Math.PI*1.5&&tempAngle22<=Math.PI*2)
    this.down2=this.color2;

    if(tempAngle22>=Math.PI&&tempAngle22<=Math.PI*1.5)
    this.up2=this.color1;
    else if(tempAngle22>=Math.PI*1.5&&tempAngle22<=Math.PI*2)
    this.up2=this.color4;
    else if(tempAngle22>=0&&tempAngle22<=Math.PI*0.5)
    this.up2=this.color3;
    else if(tempAngle22>=Math.PI*0.5&&tempAngle22<=Math.PI*1)
    this.up2=this.color2;

    if(this.radius==80)
    {
      if((gameBall2.y-10<=this.y+this.radius+15&&gameBall2.y-10>=this.y+this.radius+7.5)||(gameBall2.y+10>=this.y+this.radius&&gameBall2.y+10<=this.y+this.radius+7.5))
      {
        if(this.down1!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}

      }
      if((gameBall2.y-10<=this.y-this.radius&&gameBall2.y-10>=this.y-this.radius-7.5)||(gameBall2.y+10>=this.y-this.radius-15&&gameBall2.y+10<=this.y-this.radius-7.5))
      {
        if(this.up1!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }

      if((gameBall2.y-10<=this.y+this.radius2+15&&gameBall2.y-10>=this.y+this.radius2+7.5)||(gameBall2.y+10>=this.y+this.radius2&&gameBall2.y+10<=this.y+this.radius2+7.5))
      {
        if(this.down2!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}

      }
      if((gameBall2.y-10<=this.y-this.radius2&&gameBall2.y-10>=this.y-this.radius2-7.5)||(gameBall2.y+10>=this.y-this.radius2-15&&gameBall2.y+10<=this.y-this.radius2-7.5))
      {
        if(this.up2!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }

      if(this.y>=700)
      {
        if(this.starCount!==1)
        {
        obsArray2.push(new Obstacle2(innerWidth*0.75,0,100));
        this.radius=0;
        this.radius2=0;
        }
      }
    }

  };
  this.update4=function()
  {
    this.x1=this.x-100;
    this.x2=this.x+100;
    this.a1+=(Math.PI*2)/speed;
    this.a2+=(Math.PI*2)/speed;
    this.a3+=(Math.PI*2)/speed;
    this.a4+=(Math.PI*2)/speed;
    this.b1-=(Math.PI*2)/speed;
    this.b2-=(Math.PI*2)/speed;
    this.b3-=(Math.PI*2)/speed;
    this.b4-=(Math.PI*2)/speed;


    this.draw4();

    if((gameBall2.y-this.y<=0||gameBall2.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount2++;
      this.star=-1;

      if(starCount2!==0&&starCount2%4==0&&starCount2%8!==0)
      {
        multiColorPowerUp=1;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount2!==0&&starCount2%8==0)
      {
        slowPowerUp=speed;
        speed=330;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }

    }
    if((gameBall2.y-(this.y+175)<=0||gameBall2.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall2.color=this.colorSwitchValue;
      checkCondition2=colorArray[colors2[0]];
      colorswitchAudio.play();

    }

    if(Math.cos(this.a1)*this.radius<=-80&&Math.cos(this.a1)*this.radius>=-100)
    {this.check2=this.color1;}
    else if(Math.cos(this.a2)*this.radius<=-80&&Math.cos(this.a2)*this.radius>=-100)
    {this.check2=this.color2;}
    else if(Math.cos(this.a3)*this.radius<=-80&&Math.cos(this.a3)*this.radius>=-100)
    {this.check2=this.color3;}
    else if(Math.cos(this.a4)*this.radius<=-80&&Math.cos(this.a4)*this.radius>=-100)
    {this.check2=this.color4;}

    if(this.radius==100)
    {
      if(Math.abs(gameBall2.y-this.y)<=22.5)
      {
        if(this.check2!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }

      if(this.y>=700)
      {
        if(this.radius==100)
        {
        obsArray2.push(new Obstacle2(innerWidth*0.75,0,100));
        this.radius=0;
        }
      }

    }

  };
  this.update3=function()
  {
    this.x1=this.x-100;
    this.x2=this.x+100;

    this.a1+=(Math.PI*2)/(speed*2.4);
    this.a2+=(Math.PI*2)/(speed*2.4);
    this.a3+=(Math.PI*2)/(speed*2.4);
    this.a4+=(Math.PI*2)/(speed*2.4);
    this.b1-=(Math.PI*2)/(speed*2.4);
    this.b2-=(Math.PI*2)/(speed*2.4);
    this.b3-=(Math.PI*2)/(speed*2.4);
    this.b4-=(Math.PI*2)/(speed*2.4);

    this.draw3();

    if((gameBall2.y-this.y<=0||gameBall2.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount2++;
      this.star=-1;

      if(starCount2!==0&&starCount2%4==0&&starCount2%8!==0)
      {
        multiColorPowerUp=1;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount2!==0&&starCount2%8==0)
      {
        speed=330;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }

    }
    if((gameBall2.y-(this.y+175)<=0||gameBall2.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall2.color=this.colorSwitchValue;
      checkCondition2=colorArray[colors2[0]];
      colorswitchAudio.play();

    }

    if(Math.cos(this.a1)*this.radius<=-80&&Math.cos(this.a1)*this.radius>=-100)
    {this.check2=this.color1;}
    else if(Math.cos(this.a2)*this.radius<=-80&&Math.cos(this.a2)*this.radius>=-100)
    {this.check2=this.color2;}
    else if(Math.cos(this.a3)*this.radius<=-80&&Math.cos(this.a3)*this.radius>=-100)
    {this.check2=this.color3;}
    else if(Math.cos(this.a4)*this.radius<=-80&&Math.cos(this.a4)*this.radius>=-100)
    {this.check2=this.color4;}

    if(this.radius==100)
    {

      if(Math.cos(this.a1)*this.radius<=-90&&Math.cos(this.a1)*this.radius>=-100)
      {if(Math.abs(gameBall2.y-this.y)<=25)
      {
        if(this.check2!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }}
      else if(Math.cos(this.a2)*this.radius<=-90&&Math.cos(this.a2)*this.radius>=-100)
      {if(Math.abs(gameBall2.y-this.y)<=25)
      {
        if(this.check2!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }}
      else if(Math.cos(this.a3)*this.radius<=-90&&Math.cos(this.a3)*this.radius>=-100)
      {if(Math.abs(gameBall2.y-this.y)<=25)
      {
        if(this.check2!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }}
      else if(Math.cos(this.a4)*this.radius<=-90&&Math.cos(this.a4)*this.radius>=-100)
      {if(Math.abs(gameBall2.y-this.y)<=25)
      {
        if(this.check2!==checkCondition2&&multiColorPowerUp==-1)
        {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }}

      if(this.y>=700)
      {
        if(this.starCount!==1)
        {
        obsArray2.push(new Obstacle2(innerWidth*0.75,0,100));
        this.radius=0;
        }
      }

    }
  };

  this.update2=function()
  {
    this.angle1-=Math.PI/speed;
    this.angle2-=Math.PI/speed;
    this.angle3-=Math.PI/speed;
    this.angle4-=Math.PI/speed;

    /*if(this.angle1<=0&&this.angle1>=-Math.PI/speed)
    this.angle1=Math.PI*2;*/

    this.draw2();

    if((gameBall2.y-this.y<=0||gameBall2.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount2++;
      this.star=-1;

      if(starCount2!==0&&starCount2%4==0&&starCount2%8!==0)
      {
        multiColorPowerUp=1;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount2!==0&&starCount2%8==0)
      {
        slowPowerUp=speed;
        speed=330;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }

    }
    if((gameBall2.y-(this.y+175)<=0||gameBall2.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall2.color=this.colorSwitchValue;
      checkCondition2=colorArray[colors2[0]];
      colorswitchAudio.play();

    }
    if(this.angle1<=0)
    var temp2=Math.PI*2-(Math.abs(this.angle1)%(Math.PI*2));
    else
    var temp2=this.angle1;

    if((temp2>=0&&temp2<=Math.PI*0.5))
    this.down=this.color1;
    else if(temp2>=Math.PI*0.5&&temp2<=Math.PI*1)
    this.down=this.color4;
    else if(temp2>=Math.PI*1&&temp2<=Math.PI*1.5)
    this.down=this.color3;
    else if(temp2>=Math.PI*1.5&&temp2<=Math.PI*2)
    this.down=this.color2;

    if(temp2>=Math.PI&&temp2<=Math.PI*1.5)
    this.up=this.color1;
    else if(temp2>=Math.PI*1.5&&temp2<=Math.PI*2)
    this.up=this.color4;
    else if(temp2>=0&&temp2<=Math.PI*0.5)
    this.up=this.color3;
    else if(temp2>=Math.PI*0.5&&temp2<=Math.PI*1)
    this.up=this.color2;

    if(this.radius==100)
    {
    if(gameBall2.y>=this.y+this.radius&&gameBall2.y<=this.y+this.radius+15)
    {
      if(this.down!==checkCondition2&&multiColorPowerUp==-1)
      {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
    }
    if(gameBall2.y>=this.y-this.radius-15&&gameBall2.y<=this.y-this.radius)
    {
      if(this.up!==checkCondition2&&multiColorPowerUp==-1)
      {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
    }

    if(this.y>=700)
    {
      if(this.starCount!==1)
      {
      obsArray2.push(new Obstacle2(innerWidth*0.75,0,100));
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
    if((gameBall2.y-this.y<=0||gameBall2.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount2++;
      this.star=-1;

      if(starCount2!==0&&starCount2%4==0&&starCount2%8!==0)
      {
        multiColorPowerUp=1;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount2!==0&&starCount2%8==0)
      {
        speed=330;
        document.querySelector("#player2PowerUp").style.zIndex=4;
        document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player2PowerUp").style.zIndex=4;
          document.querySelector("#player2PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player2PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }
    }
    if((gameBall2.y-(this.y+175)<=0||gameBall2.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall2.color=this.colorSwitchValue;
      checkCondition2=colorArray[colors2[0]];
      colorswitchAudio.play();

    }
    var temp2=this.angle1%(Math.PI*2);

    if((temp2>=0&&temp2<=Math.PI*0.5))
    this.down=this.color1;
    else if(temp2>=Math.PI*0.5&&temp2<=Math.PI*1)
    this.down=this.color4;
    else if(temp2>=Math.PI*1&&temp2<=Math.PI*1.5)
    this.down=this.color3;
    else if(temp2>=Math.PI*1.5&&temp2<=Math.PI*2)
    this.down=this.color2;

    if(temp2>=Math.PI&&temp2<=Math.PI*1.5)
    this.up=this.color1;
    else if(temp2>=Math.PI*1.5&&temp2<=Math.PI*2)
    this.up=this.color4;
    else if(temp2>=0&&temp2<=Math.PI*0.5)
    this.up=this.color3;
    else if(temp2>=Math.PI*0.5&&temp2<=Math.PI*1)
    this.up=this.color2;


    if(this.radius==100){
    if((gameBall2.y-10<=this.y+this.radius+15&&gameBall2.y-10>=this.y+this.radius+7.5)||(gameBall2.y+10>=this.y+this.radius&&gameBall2.y+10<=this.y+this.radius+7.5))
    {
      if(this.down!==checkCondition2&&multiColorPowerUp==-1)
      {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
    }
    if((gameBall2.y-10<=this.y-this.radius&&gameBall2.y-10>=this.y-this.radius-7.5)||(gameBall2.y+10>=this.y-this.radius-15&&gameBall2.y+10<=this.y-this.radius-7.5))
    {
      if(this.up!==checkCondition2&&multiColorPowerUp==-1)
      {dead.play();gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
    }

    if(this.y>=700)
    {
      if(this.starCount!==1)
      {
      obsArray2.push(new Obstacle2(innerWidth*0.75,0,100));
      this.radius=0;
      }
    }
  }
};
this.draw3=function()
{

  c.beginPath();
  c.moveTo(this.x1,this.y);
  c.lineTo(this.x1+Math.cos(this.b1)*100,this.y+Math.sin(this.b1)*100);
  c.strokeStyle=this.color1;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x1,this.y);
  c.lineTo(this.x1+Math.cos(this.b2)*100,this.y+Math.sin(this.b2)*100);
  c.strokeStyle=this.color2;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x1,this.y);
  c.lineTo(this.x1+Math.cos(this.b3)*100,this.y+Math.sin(this.b3)*100);
  c.strokeStyle=this.color3;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x1,this.y);
  c.lineTo(this.x1+Math.cos(this.b4)*100,this.y+Math.sin(this.b4)*100);
  c.strokeStyle=this.color4;
  c.lineWidth=25;
  c.stroke();

  c.beginPath();
  c.moveTo(this.x2,this.y);
  c.lineTo(this.x2+Math.cos(this.a1)*100,this.y+Math.sin(this.a1)*100);
  c.strokeStyle=this.color1;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x2,this.y);
  c.lineTo(this.x2+Math.cos(this.a2)*100,this.y+Math.sin(this.a2)*100);
  c.strokeStyle=this.color2;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x2,this.y);
  c.lineTo(this.x2+Math.cos(this.a3)*100,this.y+Math.sin(this.a3)*100);
  c.strokeStyle=this.color3;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x2,this.y);
  c.lineTo(this.x2+Math.cos(this.a4)*100,this.y+Math.sin(this.a4)*100);
  c.strokeStyle=this.color4;
  c.lineWidth=25;
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
};
  this.draw4=function(){
    c.beginPath();
    c.arc(this.x1,this.y,this.radius,this.b1,this.b1-Math.PI*0.5,true);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x1,this.y,this.radius,this.b2,this.b2-Math.PI*0.5,true);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x1,this.y,this.radius,this.b3,this.b3-Math.PI*0.5,true);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x1,this.y,this.radius,this.b4,this.b4-Math.PI*0.5,true);
    c.strokeStyle=this.color4;
    c.lineWidth=15;
    c.stroke();

    c.beginPath();
    c.arc(this.x2,this.y,this.radius,this.a1,this.a1+Math.PI*0.5,false);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x2,this.y,this.radius,this.a2,this.a2+Math.PI*0.5,false);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x2,this.y,this.radius,this.a3,this.a3+Math.PI*0.5,false);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x2,this.y,this.radius,this.a4,this.a4+Math.PI*0.5,false);
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
  };
  this.draw5=function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.b1,this.b1-Math.PI*0.5,true);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.b2,this.b2-Math.PI*0.5,true);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.b3,this.b3-Math.PI*0.5,true);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.b4,this.b4-Math.PI*0.5,true);
    c.strokeStyle=this.color4;
    c.lineWidth=15;
    c.stroke();

    c.beginPath();
    c.arc(this.x,this.y,this.radius2,this.a1,this.a1+Math.PI*0.5,false);
    c.lineWidth=15;
    c.strokeStyle=this.color1;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius2,this.a2,this.a2+Math.PI*0.5,false);
    c.lineWidth=15;
    c.strokeStyle=this.color2;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius2,this.a3,this.a3+Math.PI*0.5,false);
    c.lineWidth=15;
    c.strokeStyle=this.color3;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius2,this.a4,this.a4+Math.PI*0.5,false);
    c.lineWidth=15;
    c.strokeStyle=this.color4;
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
      c.fillStyle=this.color3;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle4,this.angle4+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color4;
      c.fill()

    }


  };
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
      c.fillStyle=this.color3;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle4,this.angle4+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color4;
      c.fill()

    }
  };
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
      c.fillStyle=this.color3;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle4,this.angle4+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color4;
      c.fill()

    }
  };

}

var gameBall2={
  x:innerWidth*0.75,
  y:600,
  dy:0,
  radius:10,
  change:0,
  color:colorArray[colors[0]],
  downMovement:3,
  mechanism:0,
  update: function(){
    this.y+=this.dy;
    this.change+=this.mechanism;
    if(this.change<-20)
    {
      this.dy=2;
      this.mechanism=2;
    }
    /*if(this.y>=800)
    {
      this.dy=0;
    }*/
    this.draw();
    c.lineWidth=3;
    c.font = "50px Comic Sans MS";
    c.fillStyle = "red";
    //c.fillText(`${starCount}`,1500,200);

    if(this.y+10>=staticDetail2.y-40&&staticDetail2.y-40<innerHeight)
    this.dy=0;

    if(this.y+10>=innerHeight)
    {
      gameStatus2=-1;
      if(multiStatus==-1){endGame();}else{endGame2();}
    }

    if(this.y>innerHeight*0.5)
    {
      if(this.y<min)
      {

        if(this.mechanism==2)
        this.downMovement=0;
        else
        this.downMovement=3;
        colorCircle2.y+=this.downMovement;
        obs2.y+=this.downMovement;
        staticDetail2.y+=this.downMovement;
        for(var j=0;j<obsArray2.length;j++)
        {
          obsArray2[j].y+=this.downMovement;
        }
        min=this.y;


      }

    }
    else{

        if(this.mechanism==2)
        this.downMovement=0;
        else
        this.downMovement=3;
        colorCircle2.y+=this.downMovement;
        obs2.y+=this.downMovement;
        staticDetail2.y+=this.downMovement;
        for(var j=0;j<obsArray2.length;j++)
        {
          obsArray2[j].y+=this.downMovement;
        }
        min=this.y;


  }




      //c.strokeText(`${starCount}`,1500,200);


  },

  draw: function(){
    if(multiColorPowerUp==-1){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
    c.fillStyle=this.color;
    c.fill();
    }
    else
    {
      drawStar(this.x,this.y,10,this.radius+6,this.radius+3);
    }

  }
};

var colorCircle2={
  x:innerWidth*0.75,
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
    if((gameBall2.y-this.y<=0||gameBall2.y-this.y<=20)&&this.star==1)
    {
      starCount2++;
      this.star=-1;
      starAudio.play();
    }

    var temp2=this.angle1%(Math.PI*2);
    if((temp2>=0&&temp2<=Math.PI*0.5))
    this.down=1;
    else
    this.down=-1;
    if(temp2>=Math.PI&&temp2<=Math.PI*1.5)
    this.up=1;
    else
    this.up=-1;
    //console.log(this.down);
    //gameBall2.y-10<=this.y+this.radius+15&&gameBall2.y-10>=this.y+this.radius+10||gameBall2.y+10>=this.y+this.radius&&gameBall2.y+10<=this.y+this.radius+5
    //gameBall2.y-10<=this.y-this.radius&&gameBall2.y-10>=this.y-this.radius-5||gameBall2.y+10<=this.y-this.radius-10&&gameBall2.y+10>=this.y-this.radius-15
    if((gameBall2.y-10<=this.y+this.radius+15&&gameBall2.y-10>=this.y+this.radius+7.5)||(gameBall2.y+10>=this.y+this.radius&&gameBall2.y+10<=this.y+this.radius+7.5))
    {
      if(this.down!==1)
      {gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}dead.play();}
    }
    if((gameBall2.y-10<=this.y-this.radius&&gameBall2.y-10>=this.y-this.radius-7.5)||(gameBall2.y+10>=this.y-this.radius-15&&gameBall2.y+10<=this.y-this.radius-7.5))
    {
      if(this.up!==1)
      {gameStatus2=-1;if(multiStatus==-1){endGame();}else{endGame2();}dead.play();}
    }
    if(this.y>=700)
    {
      if(this.radius==100)
      {
      obsArray2.push(new Obstacle2(innerWidth*0.75,0,100));
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
};

var staticDetail2={
  x:innerWidth*0.75,
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
    c.font = "30px Righteous";

    //c.fontFamily="'Righteous', cursive";
    if(screen.width>=1024)
    c.fillText("PRESS UP ARROW TO JUMP !",this.x,this.y+85);
    else
    c.fillText("TAP TO JUMP !",this.x,this.y+85);

    }

  }
};

function generateColor2(){
  colors2.length=0;
  for(var k2=0;k2<4;k2++)
  {
    colorsCurrent2=Math.floor(Math.random()*4);
    while(colors2.includes(colorsCurrent2))
    {
      colorsCurrent2=Math.floor(Math.random()*4);
    }
    colors2.push(colorsCurrent2);

  }
}

function Obstacle(x,y,radius){
  while(colorArray[colors[0]]==previousValue)
  generateColor();
  previousValue=colorArray[colors[0]];
  randomAngle=Math.random()*(Math.PI*2);
  this.x=x;
  this.y=y;
  this.radius=radius;
  this.starRadius=10;
  this.color1=colorArray[0];
  this.color2=colorArray[1];
  this.color3=colorArray[2];
  this.color4=colorArray[3];
  this.angle1=randomAngle;
  this.angle2=this.angle1+Math.PI*0.5;
  this.angle3=this.angle1+Math.PI*1;
  this.angle4=this.angle1+Math.PI*1.5;
  this.a1=0;
  this.a2=Math.PI*0.5;
  this.a3=Math.PI*1;
  this.a4=Math.PI*1.5;
  this.b1=Math.PI;
  this.b2=Math.PI*0.5;
  this.b3=0;
  this.b4=-Math.PI*0.5;
  this.radius2=135;
  this.down=-1;
  this.star=1;
  this.colorSwitchValue=colorArray[colors[0]];
  this.colorSwitchStatus=1;
  this.update5=function()
  {
    if(this.star==1){
      this.radius=80;
      this.radius2=115;
    }
    this.a1+=(Math.PI*2)/(speed*2.4);
    this.a2+=(Math.PI*2)/(speed*2.4);
    this.a3+=(Math.PI*2)/(speed*2.4);
    this.a4+=(Math.PI*2)/(speed*2.4);
    this.b1-=(Math.PI*2)/(speed*2.4);
    this.b2-=(Math.PI*2)/(speed*2.4);
    this.b3-=(Math.PI*2)/(speed*2.4);
    this.b4-=(Math.PI*2)/(speed*2.4);

    this.draw5();

    if((gameBall.y-this.y<=0||gameBall.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount++;
      this.star=-1;
      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==1)
      {
        multiColorPowerUp=1;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==1)
      {
        speed=330;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==-1)
      {
        multiColorPowerUp=1;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==-1)
      {
        speed=330;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }

    }
    if((gameBall.y-(this.y+175)<=0||gameBall.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall.color=this.colorSwitchValue;
      checkCondition=colorArray[colors[0]];
      colorswitchAudio.play();

    }
    if(this.b1<=0)
    var tempAngle=Math.PI*2-(Math.abs(this.b1)%(Math.PI*2));
    else
    var tempAngle=this.b1;

    if((tempAngle>=Math.PI*0.5&&tempAngle<=Math.PI))
    this.down1=this.color1;
    else if(tempAngle>=0&&tempAngle<=Math.PI*0.5)
    this.down1=this.color4;
    else if(tempAngle>=Math.PI*1.5&&tempAngle<=Math.PI*2)
    this.down1=this.color3;
    else if(tempAngle>=Math.PI&&tempAngle<=Math.PI*1.5)
    this.down1=this.color2;

    if(tempAngle>=Math.PI*1.5&&tempAngle<=Math.PI*2)
    this.up1=this.color1;
    else if(tempAngle>=Math.PI&&tempAngle<=Math.PI*1.5)
    this.up1=this.color4;
    else if(tempAngle>=Math.PI*0.5&&tempAngle<=Math.PI)
    this.up1=this.color3;
    else if(tempAngle>=0&&tempAngle<=Math.PI*0.5)
    this.up1=this.color2;

    var tempAngle2=this.a1%(Math.PI*2);

    if((tempAngle2>=0&&tempAngle2<=Math.PI*0.5))
    this.down2=this.color1;
    else if(tempAngle2>=Math.PI*0.5&&tempAngle2<=Math.PI*1)
    this.down2=this.color4;
    else if(tempAngle2>=Math.PI*1&&tempAngle2<=Math.PI*1.5)
    this.down2=this.color3;
    else if(tempAngle2>=Math.PI*1.5&&tempAngle2<=Math.PI*2)
    this.down2=this.color2;

    if(tempAngle2>=Math.PI&&tempAngle2<=Math.PI*1.5)
    this.up2=this.color1;
    else if(tempAngle2>=Math.PI*1.5&&tempAngle2<=Math.PI*2)
    this.up2=this.color4;
    else if(tempAngle2>=0&&tempAngle2<=Math.PI*0.5)
    this.up2=this.color3;
    else if(tempAngle2>=Math.PI*0.5&&tempAngle2<=Math.PI*1)
    this.up2=this.color2;

    if(this.radius==80)
    {
      if((gameBall.y-10<=this.y+this.radius+15&&gameBall.y-10>=this.y+this.radius+7.5)||(gameBall.y+10>=this.y+this.radius&&gameBall.y+10<=this.y+this.radius+7.5))
      {
        if(this.down1!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}

      }
      if((gameBall.y-10<=this.y-this.radius&&gameBall.y-10>=this.y-this.radius-7.5)||(gameBall.y+10>=this.y-this.radius-15&&gameBall.y+10<=this.y-this.radius-7.5))
      {
        if(this.up1!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }

      if((gameBall.y-10<=this.y+this.radius2+15&&gameBall.y-10>=this.y+this.radius2+7.5)||(gameBall.y+10>=this.y+this.radius2&&gameBall.y+10<=this.y+this.radius2+7.5))
      {
        if(this.down2!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}

      }
      if((gameBall.y-10<=this.y-this.radius2&&gameBall.y-10>=this.y-this.radius2-7.5)||(gameBall.y+10>=this.y-this.radius2-15&&gameBall.y+10<=this.y-this.radius2-7.5))
      {
        if(this.up2!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }

      if(this.y>=700)
      {
        if(this.starCount!==1)
        {
          if(multiStatus==-1){
           obsArray.push(new Obstacle(innerWidth*0.5,0,100));
           this.radius=0;
           this.radius2=0;
          }
          else if(multiStatus==1)
          {
            obsArray.push(new Obstacle(innerWidth*0.25,0,100));
            this.radius=0;
            this.radius2=0;
          }
        }
      }
    }

  };
  this.update4=function()
  {
    this.x1=this.x-100;
    this.x2=this.x+100;
    this.a1+=(Math.PI*2)/speed;
    this.a2+=(Math.PI*2)/speed;
    this.a3+=(Math.PI*2)/speed;
    this.a4+=(Math.PI*2)/speed;
    this.b1-=(Math.PI*2)/speed;
    this.b2-=(Math.PI*2)/speed;
    this.b3-=(Math.PI*2)/speed;
    this.b4-=(Math.PI*2)/speed;


    this.draw4();

    if((gameBall.y-this.y<=0||gameBall.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount++;
      this.star=-1;

      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==1)
      {
        multiColorPowerUp=1;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==1)
      {
        speed=330;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==-1)
      {
        multiColorPowerUp=1;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==-1)
      {
        speed=330;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }
    }
    if((gameBall.y-(this.y+175)<=0||gameBall.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall.color=this.colorSwitchValue;
      checkCondition=colorArray[colors[0]];
      colorswitchAudio.play();

    }

    if(Math.cos(this.a1)*this.radius<=-80&&Math.cos(this.a1)*this.radius>=-100)
    {this.check2=this.color1;}
    else if(Math.cos(this.a2)*this.radius<=-80&&Math.cos(this.a2)*this.radius>=-100)
    {this.check2=this.color2;}
    else if(Math.cos(this.a3)*this.radius<=-80&&Math.cos(this.a3)*this.radius>=-100)
    {this.check2=this.color3;}
    else if(Math.cos(this.a4)*this.radius<=-80&&Math.cos(this.a4)*this.radius>=-100)
    {this.check2=this.color4;}

    if(this.radius==100)
    {
      if(Math.abs(gameBall.y-this.y)<=22.5)
      {
        if(this.check2!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }

      if(this.y>=700)
      {
        if(this.radius==100)
        {
          if(multiStatus==-1){
           obsArray.push(new Obstacle(innerWidth*0.5,0,100));
           this.radius=0;
           this.radius2=0;
          }
          else if(multiStatus==1)
          {
            obsArray.push(new Obstacle(innerWidth*0.25,0,100));
            this.radius=0;
            this.radius2=0;
          }
        }
      }

    }

  };
  this.update3=function()
  {
    this.x1=this.x-100;
    this.x2=this.x+100;

    this.a1+=(Math.PI*2)/(speed*2.4);
    this.a2+=(Math.PI*2)/(speed*2.4);
    this.a3+=(Math.PI*2)/(speed*2.4);
    this.a4+=(Math.PI*2)/(speed*2.4);
    this.b1-=(Math.PI*2)/(speed*2.4);
    this.b2-=(Math.PI*2)/(speed*2.4);
    this.b3-=(Math.PI*2)/(speed*2.4);
    this.b4-=(Math.PI*2)/(speed*2.4);

    this.draw3();

    if((gameBall.y-this.y<=0||gameBall.y-this.y<=20)&&this.star==1)
    {
      starAudio.play();
      starCount++;
      this.star=-1;

      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==1)
      {
        multiColorPowerUp=1;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==1)
      {
        speed=330;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==-1)
      {
        multiColorPowerUp=1;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==-1)
      {
        speed=330;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }

    }
    if((gameBall.y-(this.y+175)<=0||gameBall.y-(this.y+175)<=20)&&this.colorSwitchStatus==1)
    {
      this.colorSwitchStatus=-1;
      gameBall.color=this.colorSwitchValue;
      checkCondition=colorArray[colors[0]];
      colorswitchAudio.play();

    }

    if(Math.cos(this.a1)*this.radius<=-80&&Math.cos(this.a1)*this.radius>=-100)
    {this.check2=this.color1;}
    else if(Math.cos(this.a2)*this.radius<=-80&&Math.cos(this.a2)*this.radius>=-100)
    {this.check2=this.color2;}
    else if(Math.cos(this.a3)*this.radius<=-80&&Math.cos(this.a3)*this.radius>=-100)
    {this.check2=this.color3;}
    else if(Math.cos(this.a4)*this.radius<=-80&&Math.cos(this.a4)*this.radius>=-100)
    {this.check2=this.color4;}

    if(this.radius==100)
    {
      if(Math.cos(this.a1)*this.radius<=-90&&Math.cos(this.a1)*this.radius>=-100)
      {if(Math.abs(gameBall.y-this.y)<=25)
      {
        if(this.check2!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }}
      else if(Math.cos(this.a2)*this.radius<=-90&&Math.cos(this.a2)*this.radius>=-100)
      {if(Math.abs(gameBall.y-this.y)<=25)
      {
        if(this.check2!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }}
      else if(Math.cos(this.a3)*this.radius<=-90&&Math.cos(this.a3)*this.radius>=-100)
      {if(Math.abs(gameBall.y-this.y)<=25)
      {
        if(this.check2!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }}
      else if(Math.cos(this.a4)*this.radius<=-90&&Math.cos(this.a4)*this.radius>=-100)
      {if(Math.abs(gameBall.y-this.y)<=25)
      {
        if(this.check2!==checkCondition&&multiColorPowerUp==-1)
        {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
      }}


      if(this.y>=700)
      {
        if(this.starCount!==1)
        {
          if(multiStatus==-1){
           obsArray.push(new Obstacle(innerWidth*0.5,0,100));
           this.radius=0;
           this.radius2=0;
          }
          else if(multiStatus==1)
          {
            obsArray.push(new Obstacle(innerWidth*0.25,0,100));
            this.radius=0;
            this.radius2=0;
          }
        }
      }

    }
  };

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

      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==1)
      {
        multiColorPowerUp=1;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==1)
      {
        speed=330;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==-1)
      {
        multiColorPowerUp=1;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==-1)
      {
        speed=330;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }
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
      if(this.down!==checkCondition&&multiColorPowerUp==-1)
      {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
    }
    if(gameBall.y>=this.y-this.radius-15&&gameBall.y<=this.y-this.radius)
    {
      if(this.up!==checkCondition&&multiColorPowerUp==-1)
      {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
    }

    if(this.y>=700)
    {
      if(this.starCount!==1)
      {
        if(multiStatus==-1){
         obsArray.push(new Obstacle(innerWidth*0.5,0,100));
         this.radius=0;
         this.radius2=0;
        }
        else if(multiStatus==1)
        {
          obsArray.push(new Obstacle(innerWidth*0.25,0,100));
          this.radius=0;
          this.radius2=0;
        }
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

      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==1)
      {
        multiColorPowerUp=1;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==1)
      {
        speed=330;
        document.querySelector("#player1PowerUp").style.zIndex=4;
        document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#player1PowerUp").style.zIndex=4;
          document.querySelector("#player1PowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#player1PowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%4==0&&starCount%8!==0&&multiStatus==-1)
      {
        multiColorPowerUp=1;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){
          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="MULTICOLOR POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;multiColorPowerUp=-1;},1500);
        },5000);
      }
      if(starCount!==0&&starCount%8==0&&multiStatus==-1)
      {
        speed=330;
        document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
        document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP ACTIVATED !";
        setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;},1500);
        setTimeout(function(){

          document.querySelector("#singlePlayerPowerUp").style.zIndex=4;
          document.querySelector("#singlePlayerPowerUp").textContent="SLOW ROTATION POWERUP DEACTIVATED !";
          setTimeout(function(){document.querySelector("#singlePlayerPowerUp").style.zIndex=-1;speed=slowPowerUp;},1500);
        },5000);
      }


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
      if(this.down!==checkCondition&&multiColorPowerUp==-1)
      {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
    }
    if((gameBall.y-10<=this.y-this.radius&&gameBall.y-10>=this.y-this.radius-7.5)||(gameBall.y+10>=this.y-this.radius-15&&gameBall.y+10<=this.y-this.radius-7.5))
    {
      if(this.up!==checkCondition&&multiColorPowerUp==-1)
      {dead.play();gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}}
    }

    if(this.y>=700)
    {
      if(this.starCount!==1)
      {
        if(multiStatus==-1){
         obsArray.push(new Obstacle(innerWidth*0.5,0,100));
         this.radius=0;
         this.radius2=0;
        }
        else if(multiStatus==1)
        {
          obsArray.push(new Obstacle(innerWidth*0.25,0,100));
          this.radius=0;
          this.radius2=0;
        }
      }
    }
  }
};
this.draw3=function()
{

  c.beginPath();
  c.moveTo(this.x1,this.y);
  c.lineTo(this.x1+Math.cos(this.b1)*100,this.y+Math.sin(this.b1)*100);
  c.strokeStyle=this.color1;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x1,this.y);
  c.lineTo(this.x1+Math.cos(this.b2)*100,this.y+Math.sin(this.b2)*100);
  c.strokeStyle=this.color2;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x1,this.y);
  c.lineTo(this.x1+Math.cos(this.b3)*100,this.y+Math.sin(this.b3)*100);
  c.strokeStyle=this.color3;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x1,this.y);
  c.lineTo(this.x1+Math.cos(this.b4)*100,this.y+Math.sin(this.b4)*100);
  c.strokeStyle=this.color4;
  c.lineWidth=25;
  c.stroke();

  c.beginPath();
  c.moveTo(this.x2,this.y);
  c.lineTo(this.x2+Math.cos(this.a1)*100,this.y+Math.sin(this.a1)*100);
  c.strokeStyle=this.color1;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x2,this.y);
  c.lineTo(this.x2+Math.cos(this.a2)*100,this.y+Math.sin(this.a2)*100);
  c.strokeStyle=this.color2;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x2,this.y);
  c.lineTo(this.x2+Math.cos(this.a3)*100,this.y+Math.sin(this.a3)*100);
  c.strokeStyle=this.color3;
  c.lineWidth=25;
  c.stroke();
  c.beginPath();
  c.moveTo(this.x2,this.y);
  c.lineTo(this.x2+Math.cos(this.a4)*100,this.y+Math.sin(this.a4)*100);
  c.strokeStyle=this.color4;
  c.lineWidth=25;
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
};
  this.draw4=function(){
    c.beginPath();
    c.arc(this.x1,this.y,this.radius,this.b1,this.b1-Math.PI*0.5,true);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x1,this.y,this.radius,this.b2,this.b2-Math.PI*0.5,true);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x1,this.y,this.radius,this.b3,this.b3-Math.PI*0.5,true);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x1,this.y,this.radius,this.b4,this.b4-Math.PI*0.5,true);
    c.strokeStyle=this.color4;
    c.lineWidth=15;
    c.stroke();

    c.beginPath();
    c.arc(this.x2,this.y,this.radius,this.a1,this.a1+Math.PI*0.5,false);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x2,this.y,this.radius,this.a2,this.a2+Math.PI*0.5,false);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x2,this.y,this.radius,this.a3,this.a3+Math.PI*0.5,false);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x2,this.y,this.radius,this.a4,this.a4+Math.PI*0.5,false);
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
  };
  this.draw5=function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.b1,this.b1-Math.PI*0.5,true);
    c.strokeStyle=this.color1;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.b2,this.b2-Math.PI*0.5,true);
    c.strokeStyle=this.color2;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.b3,this.b3-Math.PI*0.5,true);
    c.strokeStyle=this.color3;
    c.lineWidth=15;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius,this.b4,this.b4-Math.PI*0.5,true);
    c.strokeStyle=this.color4;
    c.lineWidth=15;
    c.stroke();

    c.beginPath();
    c.arc(this.x,this.y,this.radius2,this.a1,this.a1+Math.PI*0.5,false);
    c.lineWidth=15;
    c.strokeStyle=this.color1;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius2,this.a2,this.a2+Math.PI*0.5,false);
    c.lineWidth=15;
    c.strokeStyle=this.color2;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius2,this.a3,this.a3+Math.PI*0.5,false);
    c.lineWidth=15;
    c.strokeStyle=this.color3;
    c.stroke();
    c.beginPath();
    c.arc(this.x,this.y,this.radius2,this.a4,this.a4+Math.PI*0.5,false);
    c.lineWidth=15;
    c.strokeStyle=this.color4;
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
      c.fillStyle=this.color3;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle4,this.angle4+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color4;
      c.fill()

    }


  };
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
      c.fillStyle=this.color3;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle4,this.angle4+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color4;
      c.fill()

    }
  };
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
      c.fillStyle=this.color3;
      c.fill();
      c.beginPath();
      c.moveTo(this.x,this.y+175);
      c.arc(this.x,this.y+175,20,this.angle4,this.angle4+Math.PI*0.5,false);
      c.closePath();
      c.fillStyle=this.color4;
      c.fill()

    }
  };

}

obs=new Obstacle(innerWidth*0.5,0,100);
obs.colorSwitchStatus=-1;
obs2=new Obstacle2(innerWidth*0.75,0,100);
obs2.colorSwitchStatus=-1;

var gameBall={
  x:innerWidth*0.5,
  y:600,
  dy:0,
  radius:10,
  change:0,
  mechanism:0,
  color:colorArray[colors[0]],
  downMovement:3,
  update: function(){
    this.y+=this.dy;
    this.change+=this.mechanism;
    if(this.change<-20)
    {
      this.dy=2;
      this.mechanism=2;
    }
    /*if(this.y>=800)
    {
      this.dy=0;
    }*/
    this.draw();
    c.lineWidth=3;
    c.font = "50px Comic Sans MS";
    c.fillStyle = "red";
    //c.fillText(`${starCount}`,1500,200);

    if(this.y+10>=staticDetail.y-40&&staticDetail.y-40<innerHeight)
    this.dy=0;

    if(this.y+10>=innerHeight)
    {
      gameStatus=-1;
      if(multiStatus==-1){endGame();}else{endGame2();}
    }

    if(this.y>innerHeight*0.5)
    {
      if(this.y<min)
      {

        if(this.mechanism==2)
        this.downMovement=0;
        else
        this.downMovement=3;
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

        if(this.mechanism==2)
        this.downMovement=0;
        else
        this.downMovement=3;
        colorCircle.y+=this.downMovement;
        obs.y+=this.downMovement;
        staticDetail.y+=this.downMovement;
        for(var j=0;j<obsArray.length;j++)
        {
          obsArray[j].y+=this.downMovement;
        }
        min=this.y;


  }




      //c.strokeText(`${starCount}`,1500,200);


  },

  draw: function(){
    if(multiColorPowerUp==-1){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
    c.fillStyle=this.color;
    c.fill();
    }
    else
    {
      drawStar(this.x,this.y,10,this.radius+6,this.radius+3);
    }



  }
};

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
      {gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}dead.play();}
    }
    if((gameBall.y-10<=this.y-this.radius&&gameBall.y-10>=this.y-this.radius-7.5)||(gameBall.y+10>=this.y-this.radius-15&&gameBall.y+10<=this.y-this.radius-7.5))
    {
      if(this.up!==1)
      {gameStatus=-1;if(multiStatus==-1){endGame();}else{endGame2();}dead.play();}
    }
    if(this.y>=700)
    {
      if(this.radius==100)
      {
        if(multiStatus==-1){
         obsArray.push(new Obstacle(innerWidth*0.5,0,100));
         this.radius=0;
         this.radius2=0;
        }
        else if(multiStatus==1)
        {
          obsArray.push(new Obstacle(innerWidth*0.25,0,100));
          this.radius=0;
          this.radius2=0;
        }
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
};


function animate()
{
  af=requestAnimationFrame(animate);
  if(multiStatus==-1){
  if(gameStatus==1){
  c.clearRect(0,0,innerWidth,innerHeight);
  gameBall.update();
  colorCircle.update();
  obs.update();
  staticDetail.draw();
  checkHighest();
  for(var j=0;j<obsArray.length;j++)
  {
    if(j%3==0)
    obsArray[j].update5();
    else if(j%3==1)
    obsArray[j].update3();
    else
    obsArray[j].update();
  }

  }
}

else if(multiStatus==1)
{
  if(gameStatus==1)
  {
    c.clearRect(0,0,innerWidth*0.5,innerHeight);
    gameBall.update();
    colorCircle.update();
    obs.update();
    staticDetail.draw();
    checkHighest();
    changeBestScores();
    for(var j=0;j<obsArray.length;j++)
    {
      if(j%3==0)
      obsArray[j].update5();
      else if(j%3==1)
      obsArray[j].update3();
      else
      obsArray[j].update();
    }
  }
  if(gameStatus2==1)
  {
    c.clearRect(innerWidth*0.5,0,innerWidth*0.5,innerHeight);
    gameBall2.update();
    colorCircle2.update();
    obs2.update();
    staticDetail2.draw();
    checkHighest2();
    changeBestScores();
    for(var w=0;w<obsArray2.length;w++)
    {
      if(w%3==0)
      obsArray2[w].update5();
      else if(w%3==1)
      obsArray2[w].update3();
      else
      obsArray2[w].update();
    }
  }
}


}
animate();
window.addEventListener("keydown",function(event){

  if(event.key==="b"&&gameStatus==1)
  {
  jump.play();
  if(gameBall.y>innerHeight*0.5){
  gameBall.dy=-2;
  gameBall.mechanism=-2;
  gameBall.change=0;
  gameBall.y+=-15;
  }
  else
  {
    gameBall.mechanism=-2;
    gameBall.change=0;
    gameBall.dy=0;
    colorCircle.y+=7;
    obs.y+=7;
    staticDetail.y+=7;
    for(var j=0;j<obsArray.length;j++)
    {
      obsArray[j].y+=7;
    }
  }
  }

  if(event.key==="ArrowUp"&&gameStatus2==1)
  {
    jump.play();
    if(gameBall2.y>innerHeight*0.5){
    gameBall2.dy=-2;
    gameBall2.mechanism=-2;
    gameBall2.change=0;
    gameBall2.y+=-15;
    }
    else
    {
      gameBall2.mechanism=-2;
      gameBall2.change=0;
      gameBall2.dy=0;
      colorCircle2.y+=7;
      obs2.y+=7;
      staticDetail2.y+=7;
      for(var j=0;j<obsArray2.length;j++)
      {
        obsArray2[j].y+=7;
      }
    }
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
  /*document.querySelector(".modeChooser").style.opacity=1;
  document.querySelector(".modeChooser").style.zIndex=1;
  document.querySelector(".resultsPage").style.opacity=0;
  document.querySelector(".resultsPage").style.zIndex=-1;*/

  difficulty="";

  document.querySelector("#pause").classList.remove("noHover");
  document.querySelector("#resume").classList.add("noHover");
  document.querySelector("#multiPause1").classList.remove("noHover");
  document.querySelector("#multiResume1").classList.add("noHover");
  document.querySelector("#multiPause2").classList.remove("noHover");
  document.querySelector("#multiResume2").classList.add("noHover");

  for(let i=1;i<=5;i++)
  {
    document.querySelector("#v"+i).textContent="";
  }
  generateColor();generateColor2();
  gameBall.color=colorArray[colors[0]];gameBall2.color=colorArray[colors2[0]];
  checkCondition=gameBall.color;
  checkCondition2=gameBall2.color;
  previousValue=gameBall.color;previousValue2=gameBall2.color;multiColorPowerUp=-1;
  randomAngle=Math.random()*(Math.PI*2);
  gameStatus=1;gameStatus2=-1;multiStatus=-1;
  obsArray=[];obsArray2=[];
  starCount=0;starCount2=0;
  min=innerHeight;min2=innerHeight;
  obs.colorSwitchStatus=-1;
  staticDetail.status=1;staticDetail.x=innerWidth*0.5;
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
  gameBall.y=590;gameBall2.y=590;
  gameBall.dy=0;
  gameBall.radius=10;
  gameBall.change=0;
  gameBall.color=colorArray[colors[0]];

  staticDetail2.status=1;
  staticDetail2.y=630;
  obs2.x=innerWidth*0.75;
  obs2.y=0;
  obs2.radius=100;
  obs2.color1=colorArray[colors2[0]];
  obs2.color2=colorArray[colors2[1]];
  obs2.color3=colorArray[colors2[2]];
  obs2.color4=colorArray[colors2[3]];
  obs2.angle1=randomAngle;
  obs2.angle2=randomAngle+Math.PI*0.5;
  obs2.angle3=randomAngle+Math.PI;
  obs2.angle4=randomAngle+Math.PI*1.5;
  obs2.down=-1;
  obs2.star=1;
  colorCircle2.x=innerWidth*0.75;
  colorCircle2.y=350;
  colorCircle2.radius=100;
  colorCircle2.color1=colorArray[colors2[0]];
  colorCircle2.color2=colorArray[colors2[1]];
  colorCircle2.color3=colorArray[colors2[2]];
  colorCircle2.color4=colorArray[colors2[3]];
  colorCircle2.angle1=0;
  colorCircle2.angle2=Math.PI/2;
  colorCircle2.angle3=Math.PI;
  colorCircle2.angle4=Math.PI*1.5;
  colorCircle2.down=1;
  colorCircle2.up=-1;
  colorCircle2.star=1;
  gameBall2.x=innerWidth*0.75;
  gameBall2.y=590;gameBall2.y=590;
  gameBall2.dy=0;
  gameBall2.radius=10;
  gameBall2.change=0;
  gameBall.color=colorArray[colors[0]];

  /*if(multiStatus==1)
  {
    staticDetail.x=innerWidth*0.25;
    gameBall.x=innerWidth*0.25;
    colorCircle.x=innerWidth*0.25;
    obs.x=innerWidth*0.25;
  }*/

}
function endGame2(){
  if(gameStatus==-1&&gameStatus2==1)
  {
    changeBestScores();
    document.querySelector(".player1Result").style.opacity=1;
    document.querySelector(".player1Result").style.zIndex=3;
    document.querySelector("#player1Score").textContent=starCount;


  }
  else if(gameStatus==1&&gameStatus2==-1)
  {
    changeBestScores();
    document.querySelector(".player2Result").style.opacity=1;
    document.querySelector(".player2Result").style.zIndex=3;
    document.querySelector("#player2Score").textContent=starCount2;
  }
  else if(gameStatus==-1&&gameStatus2==-1)
  {
    changeBestScores();
    document.querySelector(".player1Result").style.opacity=1;
    document.querySelector(".player1Result").style.zIndex=3;
    document.querySelector("#player1Score").textContent=starCount;
    document.querySelector(".player2Result").style.opacity=1;
    document.querySelector(".player2Result").style.zIndex=3;
    document.querySelector("#player2Score").textContent=starCount2;
    document.querySelector("#multiNewNew").style.opacity=1;
    document.querySelector("#multiNewNew").style.zIndex=3;

  }
}


/*function resetValues(){
  gameStatus=-1;gameStatus2=-1;multiStatus=-1;
  obsArray=[];obsArray2=[];colors=[];colors2=[];
  obs2.x=innerWidth*0.75;obs2.y=0;obs.x=innerWidth*0.5;obs.y=0;
  gameBall.x=innerWidth*0.5;gameBall.y=590;gameBall2.x=innerWidth*0.75;gameBall2.y=590;
  colorCircle.x=innerWidth*0.5;colorCircle.y=350;colorCircle2.x=innerWidth*0.75;colorCircle2.y=350;
  staticDetail.x=innerWidth*0.5;staticDetail.y=630;staticDetail2.x=innerWidth*0.75;staticDetail2.y=630;
  staticDetail.status=1;staticDetail2.status=1;
  starCount=0;starCount2=0;
  min=innerHeight;min2=innerHeight;
  checkCondition=gameBall.color;checkCondition2=gameBall2.color;
  randomAngle=Math.random()*(Math.PI*2);
  obs.angle1=randomAngle;obs2.angle1=randomAngle;
  obs.angle1=randomAngle;obs2.angle1=randomAngle;
  obs.angle3=randomAngle+Math.PI;obs2.angle3=randomAngle+Math.PI;
  obs.angle4=randomAngle+Math.PI*1.5;obs2.angle4=randomAngle+Math.PI*1.5;
  colorCircle.angle1=0;colorCircle2.angle1=0;
  colorCircle.angle2=Math.PI*0.5;colorCircle2.angle2=Math.PI*0.5;
  colorCircle.angle3=Math.PI;colorCircle2.angle3=Math.PI;
  colorCircle.angle4=Math.PI*1.5;colorCircle2.angle4=Math.PI*1.5;
  gameBall.change=0;gameBall.radius=10;gameBall.color=colorArray[colors[0]];
  gameBall2.change=0;gameBall.radius=10;gameBall2.color=colorArray[colors2[0]];checkCondition2=gameBall2.color;
  colorCircle.radius=100;colorCircle.star=1;
  colorCircle2.star=1;colorCircle2.star=1;
  obs.radius=100;obs.star=1;obs.colorSwitchStatus=-1;
  obs2.star=1;obs2.radius=100;obs2.colorSwitchStatus=-1;
  gameBall.dy=0;gameBall2.dy=0;



  document.querySelector("#pause").classList.remove("noHover");
  document.querySelector("#resume").classList.add("noHover");
  document.querySelector("#multiPause1").classList.remove("noHover");
  document.querySelector("#multiResume1").classList.add("noHover");
  document.querySelector("#multiPause2").classList.remove("noHover");
  document.querySelector("#multiResume2").classList.add("noHover");
  for(let i=1;i<=5;i++)
  {
    document.querySelector("#v"+i).textContent="";
  }
  if(multiStatus==1)
  {
    staticDetail.x=innerWidth*0.25;
    gameBall.x=innerWidth*0.25;
    colorCircle.x=innerWidth*0.25;
    obs.x=innerWidth*0.25;
  }
  difficulty="";
}*/
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
    if(multiColorPowerUp==-1)
    c.fillStyle='white';
    else
    c.fillStyle="#001EBA";
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
  if(multiStatus==-1){
  document.querySelector("#value").textContent=displayValue;
  document.querySelector("#value2").textContent=starCount;}
  else
  {
    document.querySelector("#value11").textContent=displayValue;
    document.querySelector("#value12").textContent=starCount;
  }

}
function checkHighest2(){
  if(localStorage.getItem(difficulty+"bs1")==null)
  {
    displayValue2=starCount2;
  }
  else if(localStorage.getItem(difficulty+"bs1")<starCount2)
  {
    displayValue2=starCount2;
  }
  else
  {
    displayValue2=localStorage.getItem(difficulty+"bs1");
  }
    document.querySelector("#value21").textContent=displayValue2;
    document.querySelector("#value22").textContent=starCount2;
}

function changeBestScores(){
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

  for(m=1;m<=6;m++)
  {
    if(localStorage.getItem(difficulty+`bs${m}`)==null||localStorage.getItem(difficulty+`bs${m}`)==="?")
    {
      if(starCount2!=0)
      localStorage.setItem(difficulty+`bs${m}`,starCount2);
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

}
restart();
