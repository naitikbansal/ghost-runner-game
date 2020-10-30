var gameState="PLAY";
var tower,towerImage;
var ghost,ghostImage;
var doors,doorsImage,doorsGroup;
var climbers,climbersImage,climbersGroup;
var invisibleblock,invisibleGroup;
var sound;
function preload(){
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorsImage = loadImage("door.png");
  climbersImage = loadImage("climber.png");
  sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  sound.play();
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImage);
  tower.velocityY=2;
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();
}


function draw(){
  background("black");
  if(gameState === "PLAY"){
    
  
  if(tower.y>400){
    tower.y=tower.width/2;
  }
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("space")){
    ghost.velocityY=-6;
  }
  
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  spawndoors();
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleGroup.isTouching(ghost)||ghost.y>600){
    gameState = "END";
  }
  drawSprites();
  }
  if(gameState === "END"){
    stroke("yellow");
    textSize(30);
    fill("yellow");
    text("GAME OVER!",200,300);
  }
}

function spawndoors(){ 
  if(frameCount%200 === 0){
    doors = createSprite(300,-30,20,20);
    doors.addImage(doorsImage);
    climbers = createSprite(300,30,20,20);
     climbers.addImage(climbersImage);
    invisibleblock = createSprite(300,35,100,5);
    
    doors.x=Math.round(random(100,500));
    invisibleblock.x=doors.x;
    climbers.x=doors.x;
    doors.velocityY=2;
    climbers.velocityY=2;
    invisibleblock.velocityY=2;
    
    doors.lifetime=640;
    climbers.lifetime=640;
    invisibleblock.lifetime=640;
    
    doors.depth= ghost.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleblock.debug=true;
    
    doorsGroup.add(doors);
    climbersGroup.add(climbers);
    invisibleGroup.add(invisibleblock);
    
    
    
    
    
  }
  
}