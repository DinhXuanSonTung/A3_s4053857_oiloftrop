let normalImg;
let xrayImg;
let maskSize = 100; 
let buffer;
let plusSize = 10;
let hearts, foods, phoneSpotify, littleMe, questionMark, home;
let heartsLarge, foodsLarge, phoneSpotifyLarge, littleMeLarge, questionMarkLarge, homeLarge;
let selectedImage = null; 
let closeButton;
let showOverlay = false; 
let maskX, maskY; 
let imageOpacity = 0;
let music; 
let isMuted = false; 

function preload() {
  xrayImg = loadImage('asset/1.png');
  normalImg = loadImage('asset/base.png');
  hearts = loadImage('asset/hearts.png');
  foods = loadImage('asset/food.png');
  phoneSpotify = loadImage('asset/phone.png');
  littleMe = loadImage('asset/little.png');
  questionMark = loadImage('asset/question.png');
  home = loadImage('asset/home.png');
  
  heartsLarge = loadImage('asset/heartLarge.png');
  foodsLarge = loadImage('asset/foodLarge.png');
  phoneSpotifyLarge = loadImage('asset/phoneLarge.png');
  littleMeLarge = loadImage('asset/littleMeLarge.png');
  questionMarkLarge = loadImage('asset/questionLarge.png');
  homeLarge = loadImage('asset/homeLarge.png');

  music = loadSound('asset/soundeffect.mp3');
}

function setup() {
  

  createCanvas(641, 800);
  noCursor();

  //mask position
  maskX = mouseX;
  maskY = mouseY;

  closeButton = createButton('Close');
  closeButton.position(windowWidth / 2 - 500, windowHeight / 2);
  closeButton.mousePressed(closeOverlay);
  closeButton.hide();

  buffer = createGraphics(width, height);

  music.play();
  music.loop();

}

function draw() {
  background(220);

  if (!showOverlay) {
    //base image
    image(normalImg, 0, 0, width, height);

    //small images
    drawImagesAsButtons();

    maskX += (mouseX - maskX) * 0.1;
    maskY += (mouseY - maskY) * 0.1;
    applyXrayEffect();

    drawPlusCursor(mouseX, mouseY);
  } else {
    // If an overlay is shown, darken the background and show the selected large image
    drawOverlay();
  }
}

function drawImagesAsButtons() {

  image(hearts, 100, 120, width / 4, height / 4);
  image(foods, 350, 600, width / 4, height / 4);
  image(phoneSpotify, 130, 540, width / 3, height / 3);
  image(littleMe, 270, 300, width / 9, height / 9);
  image(home, 70, 340, width / 3.5, height / 3.5);
  image(questionMark, 350, 300, width / 3, height / 3);
}

function applyXrayEffect() {

  buffer.clear();
  buffer.image(xrayImg, 0, 0, width, height); 
  applySoftCircleMask(buffer, maskX, maskY, maskSize);
  image(buffer, 0, 0);
}

function applySoftCircleMask(graphics, x, y, diameter) {
  let radius = diameter / 2;

  graphics.erase();
  for (let r = radius; r > 0; r -= 1) {
    let alpha = map(r, 0, radius, 0, 255);
    graphics.fill(0, 0, 0, alpha);
    graphics.ellipse(x, y, r * 2, r * 2);
  }
  graphics.noErase();
}

function drawPlusCursor(x, y) {
  stroke(225);
  strokeWeight(2);
  line(x - plusSize, y, x + plusSize, y); 
  line(x, y - plusSize, x, y + plusSize); 
}

function mousePressed() {
  if (!showOverlay) {
    checkImageClick();
  };
}

function checkImageClick() {

  if (mouseOverImage(100, 120, width / 4, height / 4)) {
    selectedImage = heartsLarge; 
    showOverlay = true;
  } else if (mouseOverImage(350, 600, width / 4, height / 4)) {
    selectedImage = foodsLarge; 
    showOverlay = true;
  } else if (mouseOverImage(130, 540, width / 3, height / 3)) {
    selectedImage = phoneSpotifyLarge;
    showOverlay = true;
  } else if (mouseOverImage(270, 300, width / 9, height / 9)) {
    selectedImage = littleMeLarge; 
    showOverlay = true;
  } else if (mouseOverImage(70, 340, width / 3.5, height / 3.5)) {
    selectedImage = homeLarge;
    showOverlay = true;
  } else if (mouseOverImage(350, 300, width / 3, height / 3)) {
    selectedImage = questionMarkLarge; 
    showOverlay = true;
  }

  if (showOverlay) {
    closeButton.show(); 
  }
}

function mouseOverImage(x, y, w, h) {

  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function drawOverlay() {

  applyXrayEffect(); 
  drawImagesAsButtons(); 
  
 
  fill(10, 225);
  rect(0, 0, width, height); 

  if (selectedImage) {
    let imgWidth, imgHeight;
    
    if (selectedImage === heartsLarge) {
      imgWidth = 510;
      imgHeight = 744; 
    } else if (selectedImage === foodsLarge) {
      imgWidth = 495;
      imgHeight = 660; 
    } else if (selectedImage === phoneSpotifyLarge) {
      imgWidth = 360;
      imgHeight = 708; 
    } else if (selectedImage === littleMeLarge) {
      imgWidth = 491;
      imgHeight = 669; 
    } else if (selectedImage === homeLarge) {
      imgWidth = 360;
      imgHeight = 708;
    } else if (selectedImage === questionMarkLarge) {
      imgWidth = 495;
      imgHeight = 660;
    }

    let xPos = (width - imgWidth) / 2;
    let yPos = (height - imgHeight) / 2;
    image(selectedImage, xPos, yPos, imgWidth, imgHeight);
  }
}

function closeOverlay() {
  showOverlay = false;
  closeButton.hide(); 
}


function mouseWheel(event) {
  if (!showOverlay) {
    let change = event.delta > 0 ? -10 : 10;
    maskSize += change;
    maskSize = constrain(maskSize, 20, 300);
  }
}

function keyPressed() {

  if (key === 'M' || key === 'm') {
    if (isMuted) {
      music.setVolume(1);
      isMuted = false;
    } else {
      music.setVolume(0);
      isMuted = true;
    }
  }
}