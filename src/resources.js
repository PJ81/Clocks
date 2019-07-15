const BIG_CLOCK = 0,
    SMALL_CLOCK = 1,
    SMALL_SEL_CLOCK = 2,
    BIG_SEL_CLOCK = 3,
    BIG_FACE = 4,
    SMALL_FACE = 5,
    SMALL_HAND = 6,
    BIG_HAND = 7,
    SMALL_SEL_HAND = 8,
    BIG_SEL_HAND = 9,
    SHOT = 10;

class Resources {
    constructor(cb) {
        this.images = new Array(11);
        Promise.all([
            (loadImage("../img/game/bigClock.png")).then((i) => {
                this.images[BIG_CLOCK] = i;
            }),
            (loadImage("../img/game/smallClock.png")).then((i) => {
                this.images[SMALL_CLOCK] = i;
            }),
            (loadImage("../img/game/bigFace.png")).then((i) => {
                this.images[BIG_FACE] = i;
            }),
            (loadImage("../img/game/smallFace.png")).then((i) => {
                this.images[SMALL_FACE] = i;
            }),
            (loadImage("../img/game/smallHand.png")).then((i) => {
                this.images[SMALL_HAND] = i;
            }),
            (loadImage("../img/game/bigHand.png")).then((i) => {
                this.images[BIG_HAND] = i;
            }),
            (loadImage("../img/game/smallSelHand.png")).then((i) => {
                this.images[SMALL_SEL_HAND] = i;
            }),
            (loadImage("../img/game/bigSelHand.png")).then((i) => {
                this.images[BIG_SEL_HAND] = i;
            }),
            (loadImage("../img/game/bigSelClock.png")).then((i) => {
                this.images[BIG_SEL_CLOCK] = i;
            }),
            (loadImage("../img/game/smallSelClock.png")).then((i) => {
                this.images[SMALL_SEL_CLOCK] = i;
            }),
            (loadImage("../img/game/shot.png")).then((i) => {
                this.images[SHOT] = i;
            }),
        ]).then(() => {
            cb();
        });

        this.bigClock = () => this.images[BIG_CLOCK];
        this.smallClock = () => this.images[SMALL_CLOCK];
        this.smallSelClock = () => this.images[SMALL_SEL_CLOCK];
        this.bigSelClock = () => this.images[BIG_SEL_CLOCK];
        this.bigFace = () => this.images[BIG_FACE];
        this.smallFace = () => this.images[SMALL_FACE];
        this.smallHand = () => this.images[SMALL_HAND];
        this.bigHand = () => this.images[BIG_HAND];
        this.smallSelHand = () => this.images[SMALL_SEL_HAND];
        this.bigSelHand = () => this.images[BIG_SEL_HAND];
        this.shot = () => this.images[SHOT];
    }
}