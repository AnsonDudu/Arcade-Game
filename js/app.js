// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多敌人的图片或者雪碧图，
    // 用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed + Math.random() * 2;
};

Enemy.prototype.move = function(){
    if(this.x < 540){
        this.x = this.x + this.speed;
     }
     else{
        this.x = -5;
        this.x = this.x + this.speed;
     }
}

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.move()
}


// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.render = function(x,y){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt){
    player.checkCollision();
    player.handleInput()*dt;
}

Player.prototype.handleInput = function(ecode){
    var win = false;
    switch (ecode){
            case "left":
            (function turnLeft(){
                player.x = player.x - 100;
                if(player.x < 0){
                    player.x = 0
                    return false;
                }
            })();
            break;
            case "right":
            (function turnRight(){
                player.x = player.x + 100;
                if(player.x > 400){
                    player.x = 400
                    return false;
                }
            })();
            break;
            case "up":
            (function turnUp(){
                player.y = player.y - 80;
                if(player.y < 60){
                   win = true;
                }
            })();
            break;
            case "down":
            (function turnDown(){
                player.y = player.y + 80;
                if(player.y > 380){
                    player.y = 380
                    return false;
                }
            })();
            break;
        }

    if(win == true){
        player.x = 200;
        player.y = 380;
        var ele = document.createElement("div");
        ele.innerHTML = "<div style='width=:200px, height:300px, border:solid 1px #ccc'><p>Congratulation</p></div>"
        if(document.getElementById('win').children.length >= 1){
            return false;
        }
        else{
            document.getElementById('win').appendChild(ele);
        }
    }
}

Player.prototype.checkCollision = function(){
    for(var i = 0; i < allEnemies.length; i++){
        if(Math.abs(this.x - allEnemies[i].x)<55){
            if((Math.abs(this.y - allEnemies[i].y))<40){
                this.x =200;
                this.y =380;
            }
       };
    };
};

// 现在实例化你的所有对象
var enemyA = new Enemy(0,50, 5);
var enemyB = new Enemy(0,140, 7);
var enemyC = new Enemy(0,220, 4);
var enemyD = new Enemy(0,50, 8);
var enemyE = new Enemy(0,140, 6);
var enemyF = new Enemy(0,220, 9);

// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面

var allEnemies = [enemyA,enemyB,enemyC,enemyD,enemyE,enemyF];

// 把玩家对象放进一个叫 player 的变量里面

var player = new Player(200,380);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
