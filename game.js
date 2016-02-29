var canvas = document.getElementById("canvas");

var Game = {};
Game.highScore = 0;
Game.lastScore = 0;
var splash = true;

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        splash = false;
    }
}

Game.initialize = function() {
    this.fps = 60;
    this.entities = [];
    this.context = canvas.getContext("2d");
    Player.initialize();
    Env.initialize();
    Enemies = [];
};

Game.splash = function() {
    this.context.fillStyle="#FFFFFF";
    this.context.fillRect(0,0,canvas.width,canvas.height);
    this.context.fillStyle="#000000";
    Game.context.font="50px Georgia";
    this.context.fillText("Last Score: " + this.lastScore, canvas.width/2-150, canvas.height/2);
    this.context.fillText("High Score: " + this.highScore, canvas.width/2-150, canvas.height/2 + 100);
    this.context.fillText("Press space to begin ", canvas.width/2-150, canvas.height/2 + 200);
}


Game.draw = function() {
    if (splash) {
        Game.splash();
    } else {
        Env.draw();
        Enemy.draw();
        Player.draw();
    }
};

Game.update = function() {
    if(splash) return;
    if(oil) {
        if(oil_dir == -1) {
            if(Player.x > Player.speed + Env.borders)
                Player.x -= Player.speed;
        }
        else {
            if(Player.x < canvas.width - Player.width - Player.speed - Env.borders)
                Player.x += Player.speed;
        }
        oil--;
    }

    Player.crashCheck();
    Player.score += 1;

    var n = Math.random();
    if (n < 1/25) Enemy.generate();

    if(leftOn && Player.x > Player.speed + Env.borders) {
        Player.x -= Player.speed;
    }
    if(rightOn && Player.x < canvas.width - Player.width - Player.speed - Env.borders) {
        Player.x += Player.speed;
    }

    Env.speed = Math.log(Env.mod);
    Env.mod += 10;

    Stripes.mod += Env.speed;
    Stripes.mod %= Stripes.height + Stripes.gap;

    for(var i = 0; i < Enemies.length; i++) {
        Enemies[i].y += Env.speed;
        if (Enemies[i].y > canvas.width) Enemies.splice(i, 1);
    }
};
