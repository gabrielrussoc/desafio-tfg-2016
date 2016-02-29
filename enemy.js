var Enemies = [];
var error = 0;
var uf = [], wf = [];

function Enemy(p, t) {
    this.image = new Image();
    if(t == 0) { //car
        var n = Math.random();
        if(n < 1/3) this.image.src = "assets/Enemy1.png";
        else if(n < 2/3) this.image.src = "assets/Enemy2.png";
        else this.image.src = "assets/Enemy3.png";
    } else if (t == 1) { //oil
        this.image.src = "assets/Enemy4.png";
    } else { //hole
        this.image.src = "assets/Enemy5.png";
    }
    this.width = Player.width;
    this.height = Player.height
    if(t > 0) this.height /= 2;
    this.x = Env.borders - this.width/2;
    this.x += Env.road_size/2 + p * (Stripes.width + Env.road_size);
    this.y = -this.height;
    this.street = p;
    this.type = t;
    this.on = 1;
}

function find(i) {
    if(i == uf[i]) return i;
    return uf[i] = find(uf[i]);
}

function join (i, j) {
    i = find(i); j = find(j);
    if (i == j) return;
    if(wf[i] > wf[j]) {
        var tmp = i; i = j; j = tmp;
    }
    uf[i] = j;
    wf[j] += wf[i];
}

function isValid(e) {
    var left, top, right;
    for(var i = 0; i < Enemies.length; i++) {
        uf[i] = i; wf[i] = 1;
        if(intersectOnAxis(e.x, e.width, Enemies[i].x, Enemies[i].width)
        && intersectOnAxis(e.y, e.height, Enemies[i].y, Enemies[i].height))
            return false;
    }
    var temp = Enemies.slice();
    temp.push(e);
    left = temp.length;
    right = left + 1;
    uf[left] = left; uf[right] = right;
    wf[left] = wf[right] = 1;
    //uniting disjoint sets
    for(var i = 0; i < temp.length; i++) {
        if(temp[i].street == 0) join (i, left);
        else if(temp[i].street == 2) join (i, right);
    }
    for(var i = 0; i < temp.length; i++) {
        for(var j = 0; j < temp.length; j++) {
            if(temp[i].y < temp[j].y && Math.abs(temp[i].street - temp[j].street) < 2) { //i-th is above
                if(temp[j].y - (temp[i].y + temp[i].height) < Player.height + Player.speed)
                    join(i,j);
            }
        }
    }
    if(find(left) == find(right))
        return false;

    return true;
}

Enemy.generate = function() {
    var n = Math.random();
    var m = Math.random();
    var p, t;

    if(n < 1/3) p = 0;
    else if(n < 2/3) p = 1;
    else p = 2;

    if(m < 7/10) t = 0; // car
    else if(m < 17/20) t = 1; //oil
    else t = 2; //hole

    var potentialEnemy = new Enemy(p, t);
    if(isValid(potentialEnemy))
        Enemies.push(potentialEnemy);
}

Enemy.draw = function() {
    for(var i = 0; i < Enemies.length; i++) {
        Game.context.drawImage(Enemies[i].image, Enemies[i].x, Enemies[i].y, Enemies[i].width, Enemies[i].height);
    }
}
