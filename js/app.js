"use strict"
// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    // 敌人的随机位置坐标
    this.x = -500 * Math.random();
    this.y = randomY();
    // 敌人的随机速度
    this.speed = 150 + 300 * Math.random();
};

// 计算敌人随机位置
var randomY = function() {
    var random = Math.random();

    if (random < 0.33) {
        return 83 - 30;
    } else if (random > 0.66) {
        return 83 * 2 - 30;
    } else {
        return 83 * 3 - 30;
    }

};


// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

    // 超过边界后 重置坐标
    if (this.x > 600) {
        this.x = -300 * Math.random();
        this.y = randomY();

    } else {

        //移动
        this.x += this.speed * dt;
    }

};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 203;
    this.y = 400;
    this.score = 0;


    // 到达到水边 或 碰撞后返回到起始点 并更新分数
    this.update = function() {

        if (this.y < 68) {

            this.x = 203;
            this.y = 400;
            // 成功后轮换人物图像
            for (var i = 0; i < images.length; i++) {
                if (images[i] === this.sprite) {
                    this.sprite = images[(i + 1) % 5];

                    break;
                }
            }
            // 加一分
            this.score += 1;

        } else {

            // 在石子路上检测碰撞
            if (this.y < 317) {
                for (var i = 0; i < allEnemies.length; i++) {
                    // 玩家是否在同一行敌人的 50 距离的范围内
                    if (this.y - 15 === allEnemies[i].y && allEnemies[i].x + 50 > this.x && this.x > allEnemies[i].x - 50) {

                        this.x = 203;
                        this.y = 400;
                        // 减一分
                        this.score -= 1;
                    }

                }

            }

        }

    };
    // 来在屏幕上画出玩家 和 分数
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // 设置字体和颜色
        ctx.font = "36pt serif";
        ctx.fillStyle = "white";
        ctx.fillText(this.score, 20, 580);
    };

    // 处理键盘输入 以及 移动的边界问题
    this.handleInput = function(move) {
        switch (move) {

            case 'left':
                if (this.x > 1) {

                    this.x -= 101;
                }
                break;

            case 'right':
                if (this.x < 405) {

                    this.x += 101;
                }
                break;

            case 'up':
                if (this.y > -15) {

                    this.y -= 83;
                }
                break;

            case 'down':
                if (this.y < 400) {

                    this.y += 83;
                }
                break;

            default:

        }
    };
};


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = new Array();
for (var i = 0; i < 5; i++) {
    var bug = new Enemy();
    allEnemies.push(bug);
};

var player = new Player();

// 人物图像位置的数组
var images = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];


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
