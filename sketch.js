let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let img;
palette = [];

let boxes = [];
let co;

let fibo = [55, 89, 144, 233]
let w;
let h = 1;

let limitW, limitH;

let drone;
let lowFilter; 

function preload() {
  
  drone = new Tone.Player('assets/scanner.mp3').toDestination();
  img = loadImage(baseURLImage + 'riley57.jpeg');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//-----------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(100, 200);
  img.loadPixels();
//-----------------------------suono  
  drone.loop = true;
  drone.autostart = true;
  
//----------------------------------palette  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 150);
    palette.push(c);    
  }
  w = random(fibo);
  limitH = random(fibo);
  co = random(0.1, 0.01);
  for(let i = 0; i < random(25, 100) ; i++) {
    
    //fill(random(palette));
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
  background(20);
  rectMode(CENTER);
  
  // stroke(255);
  // for(i = 0; i < boxes.lengh; i++) {
  //   let box = boxes[i];
  
  for (b of boxes) {
    fill(b.col);
    rect(b.x, b.y, w, h, 5);
    
    // b.x += b.speedX;
    b.y += b.speedY;

    // if (b.x < 100 || b.x > width-100) {
    //   b.speedX = -b.speedX; 
    // }
    if (b.y < 100 || b.y > height-100) {
      riparti();
    }
    //w += 0.002
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
  h = 1;
  boxes = [];
  setup();
}

//========================//
//resume audio context upon user event
//new google autoplay policy: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
