let canvas = document.getElementById('canvas');
let sonicBg = document.getElementById('bcg-game');
let sonicImg = document.getElementById('sonic-player');
let little = document.getElementById('little-red');
let coins = document.getElementById('gold-ring');
let weapon = document.getElementById('weapon');
let boss = document.getElementById('boss');
let spanSonicCoins = document.getElementById('span-sonic-coins');
let spanCoinsUsed = document.getElementById('span-coins-used');
let spanBulletsAvailable = document.getElementById('span-bullets-available');
let spanBossLife = document.getElementById('span-boss-life');

class Sonic1P {
  constructor (canvas, sonicBg) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.interval;
    this.player;
    this.gravity = 5;
    this.floorY = 400;
    this.sonicBgX = 0;
    this.sonicBgY = 0;
    this.sonicBgX2 = canvas.width;
    this.sonicBg = sonicBg;
    this.sonicCoins = 0;
    this.coinsArr = [];
    this.enemies = [];
    this.weapon = [];
    this.bullestAvailable = 0;
    this.boss;
    this.usedCoins = 0;
    this.frames = 0;
  }

  shoot() {
    if (this.sonicCoins - this.usedCoins >= 5) {
      this.usedCoins+=5;
      this.weapon.push(new Weapon(this.player.x + this.player.w, this.player.y + this.player.h / 2, 50, 50, weapon));
    }
  }

  startGame() {
    this.createKeyEvents();
    this.player = new Sonic(0, 350, 55, 125, sonicImg);
    this.boss = new Boss(this.width - 250, this.floorY-250, 250, 250, boss);
    this.interval = setInterval(() => {
      this.frames++
      if (this.frames % 10 == 0) {
        this.coinsArr.push(new Coin(this.width, this.floorY-50, 50, 50, coins))
      }
      if (this.frames % 173 == 0) {
        this.enemies.push(new Little(this.width, this.floorY-75, 75, 75, little))
      }
      this.coinsArr.forEach((coin,ci) => {
        if (this.player.checkCollition(coin)){
          this.sonicCoins+=1;
          this.coinsArr.splice(ci,1);
        }
      })
      this.enemies.forEach((enemy, ei) => {
        if (this.player.checkCollition(enemy)) {
          this.sonicCoins-=10;
          this.enemies.splice(ei,1);
        }
      })
      this.weapon.forEach((bullet, bi) => {
        if (this.boss.checkCollition(bullet)) {
          this.weapon.splice(bi,1);
          this.boss.life-=5;
        }
      })
      this.bullestAvailable = Math.floor(this.sonicCoins/5);
      this.draw()
      this.moveBack(-5);
      this.gameOver();
      this.updateScore();
      this.winGame();
    },1000/60)
  }

  gameOver() {
    if (this.frames > 200 && this.sonicCoins == 0) {
      clearInterval(this.interval);
      alert('YOU LOSE');
    }
  }

  winGame() {
    if (this.frames > 500 && this.boss.life == 0) {
      clearInterval(this.interval);
      alert('YOU WIN');
    }
  }

  draw() {
    this.ctx.clearRect(0,0,this.width, this.height);
    this.drawBackground();
    this.player.drawItself(this.ctx, this.gravity, this.floorY);
    this.coinsArr.forEach(coin => {
      coin.x-=15;
      coin.drawItself(this.ctx)
    })
    this.enemies.forEach(e => {
      e.x-=15;
      e.drawItself(this.ctx)
    })
    this.weapon.forEach((bullet, bi) => {
      bullet.x+=10
      bullet.drawItself(this.ctx);
    })
    if (this.sonicCoins > 50) {
      this.boss.bossReady(this.ctx, this.gravity, this.floorY);
      spanBossLife.innerHTML = this.boss.life;
    } else {
      spanBossLife.innerHTML = '';
    }
  }

  drawBackground() {
    if (this.sonicBgX <= 0) {
      this.sonicBgX2 = this.sonicBgX + this.width
    }
    if (this.sonicBgX > 0) {
      this.sonicBgX2 = this.sonicBgX - this.width
    }
    if (this.sonicBgX2 <= 0) {
      this.sonicBgX = this.sonicBgX2 + this.width
    }
    if (this.sonicBgX2 > 0) {
      this.sonicBgX = this.sonicBgX2 - this.width
    }
    this.ctx.drawImage(this.sonicBg, this.sonicBgX, this.sonicBgY, this.width, this.height);
    this.ctx.drawImage(this.sonicBg, this.sonicBgX2, this.sonicBgY, this.width, this.height);
  }

  //Sonic moves
  move(value) {
   if (this.player.x + this.player.w < this.width) {
     this.player.x-=value;
   }
   if (this.player.x + this.player.w > this.width) {
     this.player.x+=value;
   }
   if (this.player.x < 0) {
     this.player.x+=value;
   }
  }

  //Background move
  moveBack(value) {
   this.sonicBgX+=value;
  }

  updateScore() {
    spanSonicCoins.innerHTML = this.sonicCoins;
    spanCoinsUsed.innerHTML = this.usedCoins;
    spanBulletsAvailable.innerHTML = this.bullestAvailable;
  }

  //Event Listener
  createKeyEvents() {
   document.onkeydown = (event) => {
     switch(event.which) {
        case 37:
          this.move(5);
          break;
        case 38:
          this.player.jump(this.gravity);
          break;
        case 39:
          this.move(-5);
          break;
        case 40:
          this.player.goDown(this.ctx);
          break;
        case 32:
          this.bullestAvailable-=1;
          this.shoot();
          break;
        default:
          break;
      }
    }

    document.onkeyup = (event) => {
      switch(event.which) {
        case 40:
        this.player.goUp(this.ctx)
        break;
       }
     }
   }
}

class Unit {
  constructor (x, y, w, h, src) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.src = src;
  }

  drawItself(ctx, gravity, floorY) {
    if (this.y + this.h < floorY) {
      this.y+=gravity
    }
    if (this.y + this.h > floorY) {
      this.y = floorY - this.h;
    }
    ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
  }
}

class Sonic extends Unit {
  constructor (x, y, w, h, src) {
    super (x, y, w, h, src)
    this.h = h;
  }

  goDown (ctx) {
    this.h = 70
  }

  goUp (ctx) {
    this.h = 125;
  }

  jump (gravity) {
    if (this.y > this.h/2) {
      this.y-=200-gravity
    }
  }

  checkCollition(unit) {
    if (this.x + (this.w/2) > unit.x && unit.x + unit.w > this.x && this.y < unit.y + unit.h && this.y + this.h > unit.y) {
      return true;
    }
    return false;
  }
}

class Coin extends Unit {
  constructor (x, y, w, h, src) {
    super(x, y, w, h, src)
    this.y = Math.floor(Math.random()* (326 - 126 + 1) + 126);
  }
  drawItself(ctx) {
    ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
  }
}

class Little extends Unit {
  constructor (x, y, w, h, src) {
    super (x, y, w, h, src)
    this.y = Math.floor(Math.random() * 400);
  }
  drawItself(ctx) {
    if (this.enemies == 5) {

    } else {
      ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
    }
  }
}

class Weapon extends Unit {
  drawItself(ctx) {
    ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
  }
}

class Boss extends Unit {
  constructor (x, y, w, h, src) {
    super (x, y, w, h, src)
    this.life = 50;
  }

  checkCollition(unit) {
    if (this.x + (this.w) > unit.x && unit.x + unit.w > this.x && this.y < unit.y + unit.h && this.y + this.h > unit.y) {
      return true;
    }
    return false;
  }

  bossReady(ctx) {
    // if (this.sonicCoins) {
      ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
    // }
  }
}

class Sonic2P {
  constructor (canvas, sonicBg) {}
}
