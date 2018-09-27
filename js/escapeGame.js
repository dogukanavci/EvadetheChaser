var score=0;
var player;
var barriers;
var enemies;

function putText(){
  fill(255,40,79);
  text("Score: "+score,500,40);
  textSize(30);
  fill(200,40,79);
  text('EVADE THE CHASER',150,40);
  fill(32,140,212);
  textSize(15);
  text('Try to reach blue',150,120);
  text('Avoid the',350,120);
  fill(255,255,0);
  text('chasers',420,120);
  textSize(10);
  fill(255,255,255);
  text('W',400,720);
  text('A',378,749);
  text('D',430,750);
  text("Movement",385,765);
}

function setup(){
  createCanvas(600,800);
  barriers=new Group();
  enemies=new Group();
  player=createSprite(520,740,20,20);
  player.position=createVector(520,740);
  player.shapeColor=color(255,255,255);

  for(var ctr=0;ctr<2;ctr++){
    for (var i=0; i<37; i++) {
      barriers.add(createSprite(10+ctr*580,60+i*20,20,20));
    }
  }
  for (var i = 0; i < 28; i++) {
    barriers.add(createSprite(30+i*20,60,20,20));
  }
  var yPosition=6;
  var length=0;
  var k;
  for(var mtr=0;mtr<15;mtr++){
    var ctr=0;
    length=int(random(12, 23));
    if (yPosition<34) {
      yPosition=yPosition+int(random(2, 3));
    }
    k=int(random(0,30-length));
    for (; ctr<length; k++) {
      var gapProb=int(random(0,100));
      if(gapProb<80){
        barriers.add(createSprite(30+k*20,yPosition*20,20,20));
      }
      ctr++;
    }
    enemies.add(createSprite(30+20*int(random(0,25)),yPosition*20-20,20,20));
    enemies[mtr].shapeColor=color(255,255,0);
  }
}
function draw(){
  background(0);
  putText();
  fill(200,40,79);
  ellipse(520, 740, 80, 60);
  fill(25, 77, 209);
  ellipse(70, 110, 80, 60);
  drawSprites();
  if (keyWentDown) {
    move();
  }
  player.collide(barriers,toss);
  enemies.collide(barriers,toss);
  player.bounce(enemies,lose);
  if (player.position.x<110 && player.position.x>30 && player.position.y>80 && player.position.y<140) {
    score++;
    lose();
  }
}

function move(){
  switch (key) {
    case 'a':
      player.position.x=player.position.x-3;
      for (var i = 0; i < enemies.length; i++) {
        if (player.position.y+40>enemies[i].position.y && player.position.y-40<enemies[i].position.y) {
          if (player.position.x>enemies[i].position.x) {
            enemies[i].position.x=enemies[i].position.x+int(random(3,6));
          } else {
            enemies[i].position.x=enemies[i].position.x+int(random(-6,-3));
          }
        }
      }
      break;
    case 'd':
      player.position.x=player.position.x+3;
      for (var i = 0; i < enemies.length; i++) {
        if (player.position.y+40>enemies[i].position.y && player.position.y-40<enemies[i].position.y) {
          if (player.position.x>enemies[i].position.x) {
            enemies[i].position.x=enemies[i].position.x+int(random(3,6));
          } else {
            enemies[i].position.x=enemies[i].position.x+int(random(-6,-3));
          }
        }
      }
      break;
    case 'w':
      player.position.y=player.position.y-3;
      for (var i = 0; i < enemies.length; i++) {
        if (player.position.x+40>enemies[i].position.x && player.position.x-40<enemies[i].position.x) {
          if (player.position.y>enemies[i].position.y) {
            enemies[i].position.y=enemies[i].position.y+int(random(3,6));
          } else {
            enemies[i].position.y=enemies[i].position.y+int(random(-6,-3));
          }
        }
      }
      break;
    default:

  }
}
function toss(){
  print("TOSS");
}
function lose(){
  enemies.removeSprites();
  barriers.removeSprites();
  player.remove();
  setup();
}
