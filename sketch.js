  




var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver,endImg;
var treasureCollection = 0;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

//making gamestates
var PLAY = 1;
var END = 0;
var life = 5;
var gameState = PLAY;
var treasureCollection = 0;


function setup(){
  createCanvas(windowWidth,windowHeight);
  
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
//path.velocityY = 4;
  
//creating boy running(
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

    gameOver = createSprite();
}

function draw() {

  background(0);
   
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === PLAY){
     boy.x = World.mouseX;
    
     //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
    path.velocityY = 4;
  
       
      //incrementing treasure collection.
if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 200;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
      
      //CODE FOR GAME OVER.
    }else if  (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
      gameState = END;
      }

    
    
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    

  }
    
  
  if(gameState === END){
    cashG.destroyEach();
    cashG.setVelocityYEach(0);
    diamondsG.destroyEach();
    diamondsG.setVelocityYEach(0);
    jwelleryG.destroyEach();
     jwelleryG.setVelocityYEach(0);
     swordGroup.destroyEach();
     swordGroup.setVelocityYEach(0);
     path.velocityY = 0;
    
    boy.addAnimation("SahilRunning",endImg)
    boy.x = width/2;
    boy.y = height/2;
    boy.scale = 1;
    
    
  }
      
  drawSprites();

  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  
}//function draw
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = height/3 + 100;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = height/3 + 100;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = height/3 + 100;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = height/3 + 100;
  swordGroup.add(sword);
  }
}
//please tell why I can't see the treasure heading.
