var PLAY = 1;
var END = 2;
var gamestate = PLAY;
var banana,bananaImg;
var ground;
var monkey,monkeyAnimation;
var survival = 0;
var bananaGroup;
var rock,rockImg,rockGroup;

function preload(){
  bananaImg = loadImage("banana.png");
  monkeyAnimation = loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_7.png","sprite_8.png");
  
  rockImg = loadImage("obstacle.png");
  
}

function setup(){
  createCanvas(600,600);
  
  ground = createSprite(400,500,1000,10);
  ground.x = ground.width /2;
  
  monkey = createSprite(50,450,20,20);
  monkey.addAnimation("monkey run",monkeyAnimation);
  monkey.scale = 0.2;
  monkey.debug = true;
  
  bananaGroup = new Group();
  rockGroup = new Group();
}

function draw(){
   background("white");
  
  if(gamestate === PLAY){
  spawnBanana();
  rockez();
  
   rockGroup.depth = monkey.depth+1; 
    
  if(keyDown("space")){
  monkey.velocityY = -8;
  
}
  if(monkey.isTouching(bananaGroup)){
       bananaGroup.destroyEach();
    }  
    
  if (ground.x < 0){
    ground.x = ground.width/2;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
    
    survival = Math.round(frameCount/10);
    if(rockGroup.isTouching(monkey)){
      gamestate = END;
    }

  }else if(gamestate === END){
  
      rockGroup.destroyEach();
      bananaGroup.destroyEach();

     rockGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
     rockGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
    if (ground.x < 0){
      ground.x = ground.width/2;
  }
}  
 drawSprites(); 
 text("survival time"+survival,300,20); 
 
}

function spawnBanana() {
  
  if (frameCount % 80 === 0) {
     banana = createSprite(600,100,40,10);
     banana.y = Math.round(random(120,200));
     banana.addImage(bananaImg);
     banana.scale = 0.2;
     banana.velocityX = -5;

    banana.lifetime = 180;
    bananaGroup.add(banana);
    }
  
}

function rockez(){

  if (frameCount % 300 === 0) {
     rock = createSprite(450,490,40,10);
     rock.velocityX = -4;
     rock.addImage(rockImg);
     rock.scale = 0.2;
      
    
    rock.lifetime = 180;
    rockGroup.add(rock);
    }
}
