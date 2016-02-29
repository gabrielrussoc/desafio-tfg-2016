var Player = {};
var oil = 0;
var hole = 0;
var oil_dir;

Player.initialize = function() {
    this.image = new Image();
    this.image.src = "assets/Player.png";
    this.speed = 10;
    this.score = 0;
    this.width = canvas.width/8;
    this.height = canvas.height/4;
    this.x = canvas.width/2 - this.width/2;
    this.y = canvas.height - this.height - 20;
}

var rightOn = false;
var leftOn = false;

addEventListener("keydown", function(e) {
    if (e.keyCode == 37) leftOn = true;
    else if (e.keyCode == 39) rightOn = true;
}, false);

addEventListener("keyup", function(e) {
    if (e.keyCode == 37) leftOn = false;
    else if (e.keyCode == 39) rightOn = false;
}, false);

Player.draw = function() {
    //Game.context.fillStyle="#040081";
    //Game.context.fillRect(Player.x, Player.y, Player.width, Player.height);
    Game.context.drawImage(Player.image, Player.x, Player.y, Player.width, Player.height);

    Game.context.fillStyle="#FFFFFF";
    Game.context.font="20px Georgia";
    Game.context.fillText("Score", 20, 25);
    Game.context.fillText(this.score, 20, 45);

    if(hole) {
        Game.context.fillStyle="#DB302E";
        Game.context.fillText("-200", 20, 65);
        hole--;
    }
}

// 10px margin for better experience
function intersectOnAxis(a,len_a,b,len_b) {
    return Math.max(a, b) + 10 <= Math.min(a + len_a, b + len_b);
}

Player.crashCheck = function() {
    for(var i = 0; i < Enemies.length; i++)
        if(intersectOnAxis(this.x, this.width, Enemies[i].x, Enemies[i].width)
        && intersectOnAxis(this.y, this.height, Enemies[i].y, Enemies[i].height)
        && Enemies[i].on) {
            Enemies[i].on = 0;
            if(Enemies[i].type == 0) { //car
                Game.highScore = Math.max(Game.highScore, this.score);
                Game.lastScore = this.score;
                splash = true;
                oil = 0;
                Game.initialize();
            } else if (Enemies[i].type == 1) { //oil
                oil = 20;
                oil_dir = Math.random();
                if(oil_dir < 0.5) oil_dir = 1;
                else oil_dir = -1;
            } else { //hole
                hole = 20;
                Player.score -= 200;
            }
        }
}
