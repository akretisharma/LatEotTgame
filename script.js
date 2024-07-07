//Move the player with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let player, fallingObject;
let playButton, directionsButton, backButton;
let score = 0;
let screen = 0;
let titleImg, bgImg, playerImg, rockImg;

/* PRELOAD LOADS FILES */
function preload(){
  titleImg = loadImage("assets/title.png")
  bgImg = loadImage("assets/bg.jpg")
  playerImg = loadImage("assets/pixelguy.png")
  rockImg = loadImage("assets/rock.png")
  fontRegular = loadFont("assets/font.ttf")
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  world.gravity.y = 10;
  textFont(fontRegular);
  
  //Resize images
  titleImg.resize(300, 0);
  playerImg.resize(40, 0);
  rockImg.resize(80, 0);

  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  if (screen == 0) {
    if (directionsButton.mouse.presses()) {
      //screen 1 is directions screen
      screen = 1;
      directionsScreen();
    } else if (playButton.mouse.presses()) {
      //screen 2 is play screen 
      screen = 2;
      playScreenAssets();
    }
  } 

  if (screen == 1) {
    if (backButton.mouse.presses()) {
      //screen 0 is home screen
      screen = 0;
      homeScreen();
      backButton.pos = { x: -300, y: -300 };
    }
  }

  if (screen == 2) {
    background(bgImg);
    
    //If fallingObject reaches left side, move back to random position at right
    if (fallingObject.x <= -5) {
      fallingObject.y = 350;
      fallingObject.x = random(410,450);
      fallingObject.vel.x = (2,4);
      fallingObject.direction = "left";
      
      //Mild 
      score = score + 1;
    }
    
    //Move player
    if (kb.presses("up")) {
      player.vel.y = -6;
    }
  
    //Stop player at edges of screen
    if (player.x < 50) {
      player.x = 50;
    } else if (player.x > 350) {
      player.x = 350;
    }

    if (player.y < 100){
      player.y = 100;
    }
  
      // If fallingObject collides with player, move back to random position at top
    if (fallingObject.collides(player)) {
      fallingObject.y = 350;
      fallingObject.x = random(410,450);
      fallingObject.velocity.x = random(2,4);
      fallingObject.direction = "left";
      score = score - 1;
    }
  
    // Draw the score to screen
    fill('white');
    textSize(20);
    text("Score = " + score, 10, 30);
    }

   //Spicy - Check to see if player won
  if (score == 5) {
    youWin();

    // Restart the game if player clicks the mouse
    if (mouseIsPressed) {
      restart();
    }
  }
  //Medium - If score is less then zero, you lose
  if (score < 0) {
    background(bgImg);
    
    //Draw sprites off of screen
    player.pos = { x: -300, y: 600 };
    fallingObject.pos = { x: 0, y: 600 };
    
    //Draw end of game text
    textSize(30);
    fill('#FFFAFA');
    text("You lose!", width/2 - 50, height/2 - 30); 
    textSize(20);
    text("Press Run to play again.", width/2 - 85, height/2);
  }

  //allSprites.debug = mouse.pressing();
}

/* FUNCTIONS */
//Spicy
function youWin() {
  background(bgImg);
  
  //Draw sprites off of screen
  player.pos = { x: -300, y: 600 };
  fallingObject.pos = { x: 600, y: 600 };

  //Draw end of game text
  textSize(30);
  fill('#FFFAFA');
  text("You win!", width/2 - 50, height/2 - 30); 
  textSize(20);
  text("Click the mouse anywhere to play again.", width/2 - 140, height/2);
}

//Spicy 
function restart() {
  //Reset score
  score = 0;

  //Reset sprites
  player.pos = { x: 100, y: 360 };
  fallingObject.y = 350;
  fallingObject.x = random(410,450);
  fallingObject.velocity.x = random(4,6);
  fallingObject.direction = "left";
}

function homeScreen() {
  background(bgImg);
  
  //Create title
  image(titleImg,50,50);

  
  //Create play button
  playButton = new Sprite(300,300,100,70, 'k');
  playButton.color = "white";
  playButton.textColor = "black";
  playButton.textSize = 20;
  playButton.text = "Play";

  //Create directions button
  directionsButton = new Sprite(100,300,100,70, 'k');
  directionsButton.color = "white";
  directionsButton.textColor = "black";
  directionsButton.textSize = 20;
  directionsButton.text = "Directions";
  
}

function directionsScreen() {
  background(bgImg);
  // Position other buttons so they are not seen
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };
  
  // Draw directions to screen
  fill('white');
  textSize(20);
  text("Move the player with the up \narrow key to jump over \nrocks to reach the light at \nthe end of the tunnel.", 70, 50);
  
  //Create back button
  backButton = new Sprite(200,300,100,70, "k");
  backButton.color = "white";
  backButton.textColor = "black";
  backButton.textSize = 15;
  backButton.text = "Back to Home";
}

function playScreenAssets() {
  background(bgImg);
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };
  
  //Create player 
  player = new Sprite(playerImg, 75, 360);
  player.color = color(95,158,160);
  player.rotationLock = true;
  player.vel.x = 0;
  player.vel.y = 0;

  //Create falling object
  fallingObject = new Sprite(rockImg, 410, 350, 'k');
  fallingObject.color = color(0,128,128);
  fallingObject.velocity.x = 2;
  fallingObject.direction = "left";
  fallingObject.rotationLock = true; 
  fallingObject.textSize = 12;

  //Create ground
  ground = new Sprite(150, 380, 600, 40, "s");
  ground.color = color('black');
  ground.friction = 0;
}
