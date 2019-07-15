
class Bullet {
    constructor(i) {
        this.x = -1;
        this.y = -1;
        this.vx = 0;
        this.vy = 0;
        this.img = i;
        this.wid = i.width;
        this.hei = i.height;
        this.speed = 400;
    }

    start(x, y, a) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(a);
        this.vy = Math.sin(a);
    }

    update(dt) {
        this.x += this.vx * dt * this.speed;
        this.y += this.vy * dt * this.speed;
        return (this.x > WIDTH  + this.wid  || this.x < -this.wid || 
                this.y > HEIGHT + this.hei || this.y < -this.hei);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x - (this.img.width >> 1), this.y - (this.img.height >> 1));
    }
}