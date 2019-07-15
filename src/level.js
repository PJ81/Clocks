

class Level {
    constructor(g) {
        this.wid = 0;
        this.hei = 0;
        this.grid = g;
        this.selected = null;
    }

    selectOne() {
        let options = [];
        
        for(let r = 0; r < this.level.tiles.length; r++) {
            const l = this.level.tiles[r];
            if(l === 1 || l === 2) {
                options.push(r);
            }
        }
        return options[Math.floor(Math.random() * options.length)];
    }

    getLevel(index) {
        this.level = LEVELS[index];
        this.level.clocks = [];
        this.wid = this.level.sz[0];
        this.hei = this.level.sz[1];

        const spd = this.level.spd[1] - this.level.spd[0];

        for(let t = 0; t < this.level.tiles.length; t++) {
            const l = this.level.tiles[t];
            if(l === 1 || l === 2) {
                const clk = new Clock(l);
                clk.speed = Math.random() * spd + this.level.spd[0];
                clk.dir = Math.random() > .5 ? -1 : 1;
                
                const r = Math.floor(t / this.wid), c = t % this.wid;
                clk.y = c * this.grid + 10 + c * 4;
                clk.x = r * this.grid + 10 + r * 4;

                this.level.clocks.push(clk);
            } else {
                this.level.clocks.push(null);
            }
        }
        this.selected = this.selectOne();
        this.level.clocks[this.selected].selected = true;

        return this.level;
    }
}