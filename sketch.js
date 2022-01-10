var heroImg;
var brickImg;
var groundImg;
var obstacleImg;
var coinImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var ninImg;
var starImg;
var bcImg;
var wins;
var overImg;
var winImg;
var coins=0;
var life = 3;


function preload()
{
 heroImg=loadImage("ninja.png")
 brickImg=loadImage("block.png")
 groundImg=loadImage("ground.png")
 obstacleImg=loadImage("alien.png")
 coinImg=loadImage("coin.png")
 starImg=loadImage("star.png")
 ninImg=loadImage("ninwin.png")
 heart1Img = loadImage("heart_1.png")
 heart2Img = loadImage("heart_2.png")
 heart3Img = loadImage("heart_3.png")
 bcImg = loadImage("bc.png")
 overImg = loadImage("over.png")
 winImg = loadImage("win.png")
 wins = loadSound("win.mp3")
}


function setup()
{
  createCanvas(windowWidth, windowHeight);
 
  ed=createSprite(10,650,10,2000)
  ed.visible=false
  ed2=createSprite(1700,650,10,2000)
  ed2.visible=false

  ground=createSprite(100,800,20,20)
  ground.addImage(groundImg)
  ground.scale=1.5
  ground.velocityX=-5
  ground.visible=false;

  nin=createSprite(900,550,20,20)
  nin.addImage(ninImg)
  nin.scale=0.9
  nin.visible=false;

  hero=createSprite(100,650,20,20)
  hero.addImage(heroImg)
  hero.scale=0.5
  hero.visible=true;
  hero.setCollider('circle',0,0,50)
  hero.debug=true

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4
  

  over = createSprite(900,200,20,20)
  over.addImage(overImg)
  over.scale = 1.4
  over.visible=false;



  win = createSprite(900,200,20,20)
  win.addImage(winImg)
  win.scale = 1.4
  win.visible=false;

brickGroup=new Group();
alienGroup=new Group();
coinGroup=new Group();
starGroup=new Group();

coins=0
}

function draw()
{
  background(bcImg)

  edges= createEdgeSprites();
  hero.collide(edges);

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //go to gameState "lost" when 0 lives are remaining
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    over.visible=true;
    
  }

  if (coins>20)
  {
    win.visible=true;
    coinGroup.destroyEach();
    alienGroup.destroyEach();
    brickGroup.destroyEach();
    nin.visible=true;
    hero.visible=false;
    wins.play();
   
  }

 
  if (ground.x < 0){
    ground.x = ground.width/2;
  }


  if( keyDown("SPACE")) {
   
    hero.velocityY = -20;
 
  }


  if(keyDown("enter"))
  {
    createArrow();
  }
  
  if (coinGroup.isTouching(hero))
  {
   coins=coins+1
   coinGroup.destroyEach();
  }

  if(alienGroup.isTouching(hero))
  {
    life=life-1
    alienGroup.destroyEach();
  }


  if(alienGroup.isTouching(starGroup))
  {
    starGroup.destroyEach();
    alienGroup.destroyEach();

  }

  if(life===0)
  {
    alienGroup.destroyEach();
    hero.destroy();
    coinGroup.destroyEach();
    brickGroup.destroyEach();
    ground.velocityX=0
  }

  hero.velocityY = hero.velocityY + 0.8

  hero.collide(brickGroup)
  hero.collide(ground)
  hero.collide(ed)
  hero.collide(ed2)
  spawnCoins();
  spawnAliens();
  spawnBricks();
  drawSprites();

  textSize(50);
  textStyle("italic")
  fill("maroon")
  text("coins="+coins,90,30)

  textSize(50);
  textStyle("bold")
  fill("YELLOW")
  text("NINJA WARRIOR",700,40)


  textSize(30);
  textStyle("ARIAL")
  fill("BLACK")
  text("*NOTE*",90,60)
  text("1. PRESS _SPACE_ TO JUMP",80,90)
  text("2. PRESS _ENTER_ TO SHOOT",80,130)
 
 

}


function spawnBricks()
{
  if (frameCount % 60 === 0) {
    var brick = createSprite(width+20,height-300,40,10);
    brick.y = Math.round(random(300,500));
    brick.addImage(brickImg);
    brick.scale = 0.5;
    brick.velocityX = -9;
    

    brickGroup.add(brick);
  }
}


function spawnAliens()
{
  if (frameCount % 60 === 0) {
    var alien = createSprite(width+20,height-300,40,10);
    alien.y = Math.round(random(650,650));
    alien.addImage(obstacleImg);
    alien.scale = 0.3;
    alien.velocityX = -11;
    

    alienGroup.add(alien);
  }
}


function spawnCoins()
{
  if (frameCount % 60 === 0) {
    var coin = createSprite(width+20,height-300,40,10);
    coin.y = Math.round(random(300,300));
    coin.addImage(coinImg);
    coin.scale = 0.3;
    coin.velocityX = -7;
    

    coinGroup.add(coin);
  }
}


function createArrow() {
  var star= createSprite(100, 100, 60, 10);
  star.addImage(starImg);
  star.x = 360;
  star.y=hero.y;
  star.velocityX=29


  star.lifetime = 100;
  star.scale = 0.1;

  starGroup.add(star)

}