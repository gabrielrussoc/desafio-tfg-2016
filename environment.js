var Env = {};
var Stripes = {};

Env.initialize = function() {
    this.borders = canvas.width/8;
    this.speed = 0;
    this.mod = 1000;
    Stripes.initialize();
    this.road_size = (canvas.width-2*Env.borders)/3 - 2*Stripes.width/3;
}

Stripes.initialize = function() {
    this.width = Player.width/4;
    this.height = canvas.height/4;
    this.gap = canvas.height/12;
    this.x = (canvas.width-2*Env.borders)/3 - 2*this.width/3 + Env.borders;
    this.x2 = 2*(canvas.width-2*Env.borders)/3 - this.width/3 + Env.borders;
    this.y = 0;
    this.mod = 0;
}

Env.draw = function() {
    //Street background
    Game.context.fillStyle="#878F92";
    Game.context.fillRect(0,0,canvas.width, canvas.height);

    //Side grass
    Game.context.fillStyle="#369120";
    Game.context.fillRect(0, 0, this.borders, canvas.height);
    Game.context.fillRect(canvas.width - this.borders, 0, this.borders, canvas.height);

    //Street stripes
    Stripes.draw();

}

Stripes.draw = function() {
    Game.context.fillStyle="#FFFFFF";

    this.zero = -this.height - this.gap/2 + this.mod;
    this.first = this.gap/2 + this.mod;
    this.second = this.height + 3*this.gap/2 + this.mod;
    this.third = 2*this.height + 5*this.gap/2 + this.mod;

    Game.context.fillRect(this.x, this.zero, this.width, this.height);
    Game.context.fillRect(this.x, this.first, this.width, this.height);
    Game.context.fillRect(this.x, this.second, this.width, this.height);
    Game.context.fillRect(this.x, this.third, this.width, this.height);

    Game.context.fillRect(this.x2, this.zero, this.width, this.height);
    Game.context.fillRect(this.x2, this.first, this.width, this.height);
    Game.context.fillRect(this.x2, this.second, this.width, this.height);
    Game.context.fillRect(this.x2, this.third, this.width, this.height);
}
