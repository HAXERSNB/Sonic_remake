let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let sonic = document.getElementById('sonic-player');
let sonicX = 0;
let sonicY = 250;
let sonicW = 75;
let sonicH = 150;
let sonicBg = document.getElementById('bcg-game');
let sonicBgX = 0;
let sonicBgY = 0;
let sonicBgX2 = canvas.width;
let sonicCoins = 0;
let coins = document.getElementById('gold-ring');
let coinsX = 776;
let coinsY = 0;
let coinsW = 50;
let coinsH = 50;
let coinsArr = [];
let interval;
let gravity = 10;
let floorY = 250;
let frames = 0;

// let singleP = document.getElementById('single-player');
// singleP.onclick = () => {
//   startGame();
// }

class Sonic1P {
  constructor (canvas, sonicBg) {
  }
}

class Unit {
  constructor (enemyX, enemyY,) {}
}

class Sonic2P {
  constructor (canvas, sonicBg) {}
}

class Coin {
  constructor(img, x, y) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
}

function startGame() {
  createKeyEvents();
  interval = setInterval(() => {
    frames++
    if (frames % 50 == 0) {
      coinsArr.push(new Coin(coins, coinsX, coinsY))
    }
    coinsArr.forEach(coin => {
      if (checkCollition(coin)) {
        sonicCoins+=1;
        console.log(sonicCoins)
      }
    })
    draw()
  },1000/60)
}

//Draw Everything
function draw() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBackground();
  drawSonic();
  drawCoins();
}

//Drawing Sonic
function drawSonic() {
  if (sonicY < floorY) {
    sonicY+=gravity
  }
  if (sonicY > floorY) {
    sonicY = floorY - sonicH;
  }
  ctx.drawImage(sonic, sonicX, sonicY, sonicW, sonicH);
}

//Draw Coins
function drawCoins() {
  coinsY = Math.floor(Math.random()* (326 - 126 + 1) + 126);
  coinsArr.forEach(coin => {
    coin.x-=5
    ctx.drawImage(coin.img, coin.x, coin.y, coinsW, coinsH);
    if (checkCollition()) {
      sonicCoins+=1;
      console.log(sonicCoins)
    }
  })
}

//Drawing Background
function drawBackground() {
  if (sonicBgX < 0) {
    sonicBgX2 = sonicBgX + canvas.width
  }
  if (sonicBgX > 0) {
    sonicBgX2 = sonicBgX - canvas.width
  }
  if (sonicBgX2 < 0) {
    sonicBgX = sonicBgX2 + canvas.width
  }
  if (sonicBgX2 > 0) {
    sonicBgX = sonicBgX2 - canvas.width
  }
  ctx.drawImage(sonicBg, sonicBgX, sonicBgY, canvas.width, canvas.height);
  ctx.drawImage(sonicBg, sonicBgX2, sonicBgY, canvas.width, canvas.height);
}

//Event Listener
function createKeyEvents() {
 document.onkeydown = (event) => {
   switch(event.which) {
     case 37:
       move(5);
       moveBack(10);
       break;
     case 38:
       sonicY-=200
       break;
     case 39:
       move(-5);
       moveBack(-10);
       break;
     default:
       break;
   }
 }
}

//Collision
function checkCollition(unit) {
  if (sonicX + sonicW > Coin.x && Coin.x + coinsW > sonicX && sonicY + sonicH > Coin.y && sonicY < Coin.y + coinsH) {
    console.log('hi')
    return true;
  }
  return false;
}

//Sonic moves
function move(value) {
 if (sonicX + sonicW < canvas.width) {
   sonicX-=value;
 }
 if (sonicX + sonicW > canvas.width) {
   sonicX+=value;
 }
 if (sonicX < 0) {
   sonicX+=value;
 }
}

//Background move
function moveBack(value) {
 sonicBgX+=value;
}


startGame();
