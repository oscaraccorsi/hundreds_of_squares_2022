let baseURLBackground = 'https://oscaraccorsi.github.io/backgrounds/';
let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let img, logo, back;
palette = [];

let sfondoW;
let sfondoCol, squareColor;

let boxes = [];
let co;
let numb = [25, 50, 100, 200];

let fibo = [55, 89, 144, 233]
let w;
let h = 1;

let widthRsize = 20;
let heightRsize = 50;

let limitW, limitH;

let drone;
let lowFilter; 

function preload() {
  drone = new Tone.Player('assets/scanner.mp3').toDestination();
  back = loadImage(baseURLBackground + '01.png');
  img = loadImage(baseURLImage + 'riley2.jpeg');
  logo = loadImage(baseURLImage + 'good one white.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//-----------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  sfondoW = 0-width;
  xLogo = windowWidth-40;
  img.resize(100, 200);
  img.loadPixels();
//-----------------------------suono  
  drone.loop = true;
  drone.autostart = true;
  
//------------------------------------------------palette  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 100);
    palette.push(c);    
  }
  sfondoCol = random(palette);
  w = random(fibo);
  limitH = random(fibo);
  co = random(0.1, 0.01);
  for(let i = 0; i < random(numb) ; i++) {
    
   
    noStroke();
    
    boxes[i] = {
      x: random(120,width-120),
      y: height/2,
      speedX: random(-co, co),
      speedY: random(-co, co),
      col: random(palette),
    };
  }
}   

//------------------------------------------DRAW
function draw() {
  background(20, 20, 20, 100);
  rectMode(CORNER);
  squareColor = sfondoCol;
  squareColor.setAlpha(50 * sin(millis() / 3000));
  fill(squareColor);
  rect(sfondoW, 0, width, height);
  sfondoW++;
  
  if (sfondoW>width) {
    sfondoW = 0-width;
    sfondoCol = random(palette);
  }
  // image(back, 0, 0, width, height);
  // back.resize(widthRsize, heightRsize);
  // tint(50);
  rectMode(CENTER);
  
  
  
  
  for (b of boxes) {
    fill(b.col);
    rect(b.x, b.y, w, h, 5);
   
    b.y += b.speedY;

    if (b.y < limitH/2 || b.y > windowHeight-limitH/2) {
      clear();
      clear();
      riparti();
    }
    
    h += 0.002
    if (h >= limitH) {
      h = limitH;
    }
    if (w >= limitW) {
      w = limitW;
    }
  }
  
}
function riparti() {
  boxes.lenght = 0;
  clear();
  h = 1;
  notSetUp();
}
//-------------------------------------------notSetUp
function notSetUp() {
   w = random(fibo);
  limitH = random(fibo);
  co = random(0.1, 0.01);
  for(let i = 0; i < random(numb) ; i++) {
    
    
    noStroke();
    
    boxes[i] = {
      x: random(120,width-120),
      y: height/2,
      speedX: random(-co, co),
      speedY: random(-co, co),
      col: random(palette),
    };
  }
}

function mousePressed() {
  imageMode(CENTER);
  // image(back, width/2, height/2);
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200);
  
  imageMode(CORNER);
  // background(20, 20, 20, 100);
  save();
  
  // clear();
  
}
