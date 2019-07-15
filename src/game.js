
const State = {MENU: 0, PLAY: 1, SHOOTING: 2, NEXT_LEVEL: 3, GAME_OVER: 4},
      WIDTH = 608, HEIGHT = 608,
      COLORS = [
    "RoyalBlue", 
    "#166383", 
    "#396b93", 
    "#871287", 
    "#3f273f", 
    "#7a1f76", 
    "#cc3700", 
    "#cc8400", 
    "#451551",
    "#1e7b1e", 
    "#065d93", 
    "#665600", 
    "FireBrick", 
    "DarkRed", 
    "#8c0d26", 
    "#592d0d", 
    "Green",
    "#a3cc00",
    "#752424"
];

class Game {
	constructor() {
		const canvas = document.createElement('canvas');
		canvas.width = WIDTH * .75;
		canvas.height = HEIGHT * .75;
		document.body.appendChild(canvas);
		this.ctx = canvas.getContext('2d');
        this.lastTime = 0;
        this.accumulator = 0;
        this.deltaTime = 1 / 60;
        this.state = State.MENU;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        this.loadedDone = () => { this.loop(0); };

		this.loop = (time) => {
			this.accumulator += (time - this.lastTime) / 1000;
			while(this.accumulator > this.deltaTime) {
				this.accumulator -= this.deltaTime;
				this.moveFrame();
			}
			this.draw();
			this.lastTime = time;
			requestAnimationFrame(this.loop);
        }

        window.addEventListener("keydown", () => {
            this.action();
        });
        canvas.addEventListener("mouseup", () => {
            this.action();
        });
        this.clocks = new Clocks(this.loadedDone);

        this.ctx.scale(.75, .75);

    }

    action() {
        switch(this.state) {
            case State.PLAY:
                this.clocks.shoot();
                this.state = State.SHOOTING;
            break;
            case State.MENU:
                this.state = State.PLAY;
                this.clocks.reset();
            break; 
        }
    }

	moveFrame() {
        switch(this.state) {
            case State.PLAY:
            case State.SHOOTING:
                const r = this.clocks.update(this.deltaTime);
                switch(r) {
                    case 9999:
                        this.nextLevel = 2;
                        this.state = State.NEXT_LEVEL;
                    break;
                    case -1:
                        this.nextLevel = 2;
                        this.state = State.GAME_OVER;
                    break;
                    default:
                        this.state = this.clocks.shooting ? State.SHOOTING : State.PLAY;
                }
            break;
            case State.NEXT_LEVEL:
                this.nextLevel -= this.deltaTime;
                if(this.nextLevel < 0) {
                    this.clocks.getNextLevel();
                    this.state = State.PLAY;
                    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                }
            break;
            case State.GAME_OVER:
                this.nextLevel -= this.deltaTime;
                if(this.nextLevel < 0) {
                    this.state = State.MENU;
                    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                }
            break;
            case State.MENU:
                //
            break;
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
        switch(this.state) {
            case State.MENU:
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.font = "60px Mina"; 
                this.ctx.fillText("Click or", WIDTH >> 1, HEIGHT * .35);
                this.ctx.fillText("press a key", WIDTH >> 1, HEIGHT * .45);
                this.ctx.fillText("to play", WIDTH >> 1, HEIGHT * .55);
            break;
            case State.GAME_OVER:
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.font = "60px Mina"; 
                this.ctx.fillText("GAME OVER!", WIDTH >> 1, HEIGHT * .4);
            break;
            default:
                this.clocks.draw(this.ctx, this.color);
        }
    }
}