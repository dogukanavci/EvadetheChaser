var score=0;
var player;
var barriers;
var enemies;
var start=false;

function putText(){
  fill(255,90,0);
  text("Score: "+score,500,40);
  textSize(30);
  fill(255);
  text('EVADE THE CHASER',150,40);
  textSize(15);
  text('Try to reach this box',110,120);
  text('Avoid the',420,120);
  fill(255,255,0);
  text('chasers',490,120);
  textSize(15);
  fill(255,255,255);
  text('W',400,720);
  text('A',378,749);
  text('D',430,750);
  text("Movement",378,768);
}

function setup(){
  game=createCanvas(600,800);
  barriers=new Group();
  enemies=new Group();
  player=createSprite(520,740,20,20);
  player.position=createVector(520,740);
  player.shapeColor=color(255,255,255);

  for(var ctr=0;ctr<2;ctr++){
    for (var i=0; i<37; i++) {
      barriers.add(createSprite(10+ctr*580,60+i*20,20,20));
      var randomclose=int(random(0, 100));
      if (randomclose>90) {
        barriers.add(createSprite(30+ctr*540,60+i*20,20,20));
      }
      if (i<4 && ctr==0) {
        barriers.add(createSprite(310,60+i*20,20,20));
      }
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
    length=int(random(12, 18));
    if (yPosition<34) {
      yPosition=yPosition+int(random(2, 3));
    }
    k=int(random(0,30-length));
    for (; ctr<length; k++) {
      var gapProb=int(random(0,100));
      if(gapProb<70){
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
  fill(255, 87, 51 );
  rect(490, 710, 60, 60);
  fill(218, 247, 166);
  rect(40, 90, 60, 60);
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
