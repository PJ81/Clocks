let ctx, lvl;
const LEFT = 0,
    MID = 1,
    RIGHT = 2;

function mup(ev) {
    const x = Math.floor((ev.clientX - ev.originalTarget.offsetLeft) / 32),
        y = Math.floor((ev.clientY - ev.originalTarget.offsetTop) / 32);

    if (ev.ctrlKey) {
        lvl[x][y] = 0;
    } else {
        if (ev.button === LEFT) {
            lvl[x][y] = 1;
        } else if (ev.button === RIGHT) {
            lvl[x][y] = 2;
            lvl[x][y + 1] = lvl[x + 1][y] = lvl[x + 1][y + 1] = 3;
        }
    }
    drawLevel();
}

function drawLevel() {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            switch (lvl[c][r]) {
                case 0:
                    ctx.clearRect(c * 33 - c + 1, r * 33 - r + 1, 31, 31);
                    break;
                case 1:
                    ctx.fillStyle = "#26c";
                    ctx.fillRect(c * 33 - c + 1, r * 33 - r + 1, 31, 31);
                    break;
                case 2:
                case 3:
                    ctx.fillStyle = "#c62";
                    ctx.fillRect(c * 33 - c + 1, r * 33 - r + 1, 31, 31);
                    break;
            }
        }
    }
}

function save() {
    function download(text, name, type) {
        var a = document.getElementById("a");
        var file = new Blob([text], {
            type: type
        });
        a.href = URL.createObjectURL(file);
        a.download = name;
    }

    download(lvl.toString(), 'myfilename.txt', 'text/plain');
}

function init() {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 257;
    ctx = cv.getContext("2d");
    cv.style.backgroundImage = "url(../img/editor/small.png)";
    document.body.appendChild(cv);

    const btn = document.createElement("button");
    btn.addEventListener("click", save);
    btn.style.width = "75px";
    btn.style.height = "25px";
    btn.style.marginLeft = "10px";
    btn.innerHTML = "SAVE";
    document.body.appendChild(btn);

    const lnk = document.createElement("a");
    lnk.id = "a";
    lnk.innerHTML = "Download";
    lnk.style.marginLeft = "10px";
    document.body.appendChild(lnk);

    cv.addEventListener("click", function (event) {
        mup(event);
    });
    cv.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        mup(event);
    });

    lvl = new Array(8);
    for (let r = 0; r < 8; r++) {
        lvl[r] = new Array(8);
        for (let c = 0; c < 8; c++) {
            lvl[r][c] = 0;
        }
    }
}