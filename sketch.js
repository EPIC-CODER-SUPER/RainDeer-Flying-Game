var PLAY = 1;
var END = 0;
var gameState = PLAY;

var deer,deer_running;
var ground, invisibleGround;

var obstaclesGroup, obstacle1, obstacle2;
var score=0;
var gameOver, restart;

function preload(){
deer_running = loadAnimation("ReinDeer_Land.png","ReinDeer_Jump.png","ReinDeer_Run.png");
deer_collided = loadAnimation("ReinDeer_Land.png");
backgroundImage = loadImage("Background.jpg");

obstacle1 = loadImage("Obstacle_1.png");
obstacle2 = loadImage("Obstacle_2.png");

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
}
function setup() {
    createCanvas(900, 600);

    background = createSprite(0,0,600,200);
    background.addImage(backgroundImage);
    background.scale = 3;
    deer = createSprite(110,550,20,50);

    deer.addAnimation("running", deer_running);
    deer.addAnimation("collided", deer_collided);

    ground = createSprite(200,550,400,20);
    ground.x = ground.width /2;
    ground.velocityX = -(6 + 3*score/100);
    ground.visible = false;
 
    gameOver = createSprite(350,200);
    gameOver.addImage(gameOverImg);

    restart = createSprite(350,250);
    restart.addImage(restartImg);
  
    gameOver.scale = 0.5;
    restart.scale = 0.5;
  
    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround = createSprite(200,560,400,10);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();
    
    score = 0;
  }

function draw(){
  //deer.debug = true;  
  background = ("Background.jpg") 
   
  text("Score: "+ score, 500,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
  if(keyDown("space") && deer.y >= 137) {
      deer.velocityY = -11;
    }
  
    deer.velocityY = deer.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(deer)){
      gameState = END;
  }
    }
 if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
 
  ground.velocityX = 0;
  deer.velocityY = 0;
  
  obstaclesGroup.setVelocityXEach(0);
  
  deer.changeAnimation("collided",deer_collided);

  obstaclesGroup.setLifetimeEach(-1);

  if(mousePressedOver(restart)) {
    reset();
  }
}
  deer.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,550,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
  
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
  }
  obstacle.scale = 0.5;
  obstacle.lifetime = 300;
  obstacle2.scale = 0.3;

  obstaclesGroup.add(obstacle);
}

}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 
  deer.changeAnimation("running",deer_running);
  
 score = 0;
 
}
