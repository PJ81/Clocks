
class Clock {
    constructor(t, x, y) {
        this.type = t;
        this.selected = false;
        this.angle = 0;
        this.speed = 0;
        this.dir = 0;
        this.x = 0;
        this.y = 0;
    }

    update(dt) {
        this.angle += this.dir * this.speed * dt;
    }

    draw(ctx, x, y, clr, R) {
        switch(this.type) {
            case 1:
                if(this.selected) {
                    ctx.drawImage(R.smallSelClock(), x, y);
                    ctx.drawImage(R.smallFace(), x, y);
                    ctx.save();
                    ctx.translate(x + 36, y + 36);
                    ctx.rotate(this.angle);
                    ctx.drawImage(R.smallSelHand(), -6, -6);
                    ctx.restore();
                } else {
                    const i = R.smallHand();
                    ctx.drawImage(R.smallClock(), x, y);
                    ctx.save();
                    ctx.translate(x + 36, y + 36);
                    ctx.rotate(this.angle);
                    ctx.drawImage(i, -6, -6);
                    ctx.globalCompositeOperation = "lighten";
                    ctx.fillStyle = clr;
                    ctx.fillRect(-6, -6, i.width, i.height);
                    ctx.restore();
                }
            break;
            case 2:
                if(this.selected) {
                    ctx.drawImage(R.bigSelClock(), x, y);
                    ctx.drawImage(R.bigFace(), x + 2, y + 2);
                    ctx.save();
                    ctx.translate(x + 72, y + 72);
                    ctx.rotate(this.angle);
                    ctx.drawImage(R.bigSelHand(), -12, -12);
                    ctx.restore();
                } else {
                    const i = R.bigHand();
                    ctx.drawImage(R.bigClock(), x, y);
                    ctx.save();
                    ctx.translate(x + 72, y + 72);
                    ctx.rotate(this.angle);
                    ctx.drawImage(i, -12, -12);
                    ctx.globalCompositeOperation = "lighten";
                    ctx.fillStyle = clr;
                    ctx.fillRect(-12, -12, i.width, i.height);
                    ctx.restore();
                }
            break;
        }
    }
}