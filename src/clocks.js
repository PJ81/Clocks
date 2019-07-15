
class Clocks {
    constructor(cb) {
        this.R = new Resources(() => {
            this.grid = this.R.smallClock().width;
            this.level = new Level(this.grid);
            this.bullet = new Bullet(this.R.shot());
            this.lvlIndex = 0;
            cb();
        });
    }

    reset() {
        this.timeOut = 0;
        this.shooting = false;
        this.getNextLevel();
    }

    getNextLevel() {
        this.lvl = this.level.getLevel(this.lvlIndex);
        if(++this.lvlIndex >= LEVELS.length) {
            this.lvlIndex = 0;
        }
    }

    shoot() {
        const i = this.level.selected;
        let y = i % this.level.wid,
            x = Math.floor(i / this.level.wid);
        x += 4 * x + x * this.grid + 10;
        y += 4 * y + y * this.grid + 10;

        if(this.lvl.tiles[i] === 1) {
            x += this.R.smallClock().width >> 1;
            y += this.R.smallClock().height >> 1;
        } else {
            x += this.R.bigClock().width >> 1;
            y += this.R.bigClock().height >> 1;
        }

        this.bullet.start(x, y, this.lvl.clocks[i].angle);
        this.lvl.clocks[i] = null;
        this.shooting = true;
    }

    collided(a, b) {
        return !(((a.b < b.t) || (a.t > b.b) || (a.r < b.l) || (a.l > b.r)));
    }

    update(dt) {
        if(this.shooting) {
            this.shooting = !this.bullet.update(dt);
            if(this.shooting) {
                const shB = {l:this.bullet.x, t:this.bullet.y, r:this.bullet.x + this.bullet.wid, b:this.bullet.y + this.bullet.hei},
                    bw  = this.R.bigClock().width,
                    bh  = this.R.bigClock().height,
                    sw  = this.R.smallClock().width,
                    sh  = this.R.smallClock().height;
                
                for(let t = 0; t < this.lvl.clocks.length; t++) {
                    const c = this.lvl.clocks[t];
                    if(c !== null) {
                        const clW = c.type === 1 ? sw : bw,
                            clH = c.type === 1 ? sh : bh,
                            clB = {l:c.x, t:c.y, r:c.x + clW, b:c.y + clH};
                        
                        if(this.collided(shB, clB)) {
                            this.shooting = false;
                            c.selected = true;
                            this.level.selected = t;
                            break;
                        }
                    }
                }
            }
        } else {
            if(this.lvl.clocks[this.level.selected] === null) {
                if(--this.lvlIndex < 0) this.lvlIndex = 0;
                return -1;
            }
        }
        
        let cnt = 0, i = -1;
        for(let t = 0; t < this.lvl.clocks.length; t++) {
            const c = this.lvl.clocks[t];
            if(c !== null) {
                i = t;
                c.update(dt);
                cnt++;
            }
        }
        if(cnt === 1) {
            if(this.lvl.clocks[i].selected) cnt = 9999;
        }
        return cnt;
    }

    draw(ctx, clr) {
        const colCount = this.lvl.sz[0];
        for(let r = 0; r < this.lvl.sz[1]; r++) {
            for(let c = 0; c < colCount; c++) {
                const clk = this.lvl.clocks[c + r * colCount];
                if(clk !== null) {
                    clk.draw(ctx, clk.x, clk.y, clr, this.R);
                }
            }
        }
        if(this.shooting) {
            this.bullet.draw(ctx);
        }
    }
}