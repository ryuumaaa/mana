let character;
let obstacles = [];
let gameSpeed = 5;
let gravity = 0.6;
let score = 0;


function setup() {
  createCanvas(800, 400);
  character = new Character();
}

function draw() {
  background(220);
  score ++;
  text("score: " + score, width -300, 50)
  textSize(20);
  
  
  
  if (frameCount % 100 === 0) {
    gameSpeed +=　1; 
  }

  // キャラクターを表示し、更新
  character.update();
  character.display();

  // 障害物を生成し、表示、削除
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
    
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();

    // キャラクターと障害物の衝突を判定
    if (obstacles[i].hits(character)) {
      noLoop(); // ゲーム終了
      textSize(32);
      fill(255, 0, 0);
      text('Game Over', width / 2 - 80, height / 2);
    }

    // 画面外に出た障害物を削除
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }
}

// function keyPressed() {
//   if (key === ENTER && character.onGround()) {
//     character.jump(); 
//   }
// }

function  mousePressed() {
  if (character.onGround()){
    character.jump();
    
  }
}


class Character {
  constructor() {
    this.r = 50; // キャラクターのサイズ
    this.x = 50;
    this.y = height - this.r;
    this.velocity = 0;
    this.jumpForce = -15; // ジャンプの強さ
  }

  jump() {
    this.velocity += this.jumpForce; // ジャンプ時の上昇
  }

  update() {
    this.velocity += gravity; // 重力による加速
    this.y += this.velocity;

    // 地面に到達したら位置を固定し、速度をリセット
    if (this.y > height - this.r) {
      this.y = height - this.r;
      this.velocity = 0;
    }
  }

  display() {
    fill(0);
    rect(this.x, this.y, this.r, this.r);
  }

  onGround() {
    return this.y === height - this.r;
  }
}

class Obstacle {
  constructor() {
    this.w = random(10, 30); // 障害物の幅
    this.h = random(30, 80); // 障害物の高さ
    this.x = width;
    this.y = height - this.h;
    
  }

  update() {
    this.x -= gameSpeed;
  }

  display() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }

  
  
  offscreen() {
    return this.x < -this.w;
  }

  hits(character) {
    // キャラクターと障害物が衝突しているかを確認
    return (
      character.x < this.x + this.w &&
      
      character.x + character.r > this.x &&
      character.y + character.r > this.y
    );
  }
}

