var hurryUp;
var gameLevel;
var myTimer;
var topMargin = 0;
var running;
var smin;
var aMaze;
var aPlayer;

var mobs = new Array(8);
var mobsColors = new Array(8);
mobsColors[0] = new rgbaColor(200,0,0,0.6);
mobsColors[1] = new rgbaColor(0,200,0,0.6);
mobsColors[2] = new rgbaColor(200,200,0,0.6);
mobsColors[3] = new rgbaColor(200,170,170,0.7);
mobsColors[4] = new rgbaColor(170,200,200,0.7);
mobsColors[5] = new rgbaColor(170,200,200,0.7);
mobsColors[6] = new rgbaColor(170,200,200,0.7);
mobsColors[7] = new rgbaColor(170,200,200,0.7);


function CallGenMaze() {
    var x = 0;
    var y = 0;
    x = (document.getElementById('nrH').value) * 1;
    y = (document.getElementById('nrV').value) * 1;
    var nrMobs = (document.getElementById('nrMobs').value) * 1;
    if (nrMobs > 5) nrMobs = 5;
    if (x > 1 && y > 1) {
        genMaze(x, y, nrMobs);
        running = true;
    }
    else {
        running = false;
        alert("Bad Maze dimensions.");
    }
}

function genMaze(x, y, nrMobs) {
    var margin = 0;
    var maxSize = Math.max(x, y)
    var wallLength = Math.max(Math.floor((smin - margin - margin) / maxSize), 1);

    aMaze = new genMazeObj(x, y, ctx, margin, wallLength);
    aMaze.generate();
    aPlayer = new player(0, 1, ctx, aMaze);

    var midMaze = Math.floor(x * y / 2);

    mobs.length = nrMobs;

    for (i = 0; i < mobs.length; i++) {
        aColor = mobsColors[i];

        aRandCell = Math.floor(Math.random() * (aMaze.nrCells - midMaze)) + midMaze;
        aRandReach = Math.floor(maxSize * 2 - ((maxSize / 6) * i));
        aRandReach2 = Math.floor(maxSize * maxSize / 3);
        aRandReach = Math.max(aRandReach, aRandReach2);
        mobs[i] = new mob(aRandCell, i, aRandReach, ctx, aMaze, aColor, 5 + i);
    }

    aMaze.Draw();

    doCount();
}


function doit() {
    var booLandScape = true;
    booLocalStorage = testLocalStorage();
    buildActions(booLocalStorage);
    vcanvas = document.getElementById("universe");
    ctx = vcanvas.getContext("2d");
    scrw = vcanvas.width = window.innerWidth;
    scrh = vcanvas.height = window.innerHeight;
    booLandScape = (scrw > scrh);
    smin = Math.min(scrw, scrh);
    if (booLandScape)
        smin = Math.floor(smin / 10.1) * 9;
    else
        smin = Math.floor(smin / 10.1) * 10;
    vcanvas.width = smin;
    vcanvas.height = smin;
    smin2 = Math.floor(smin / 2);
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#FFF";

    vcanvas2 = document.getElementById("brain");
    ctx2 = vcanvas2.getContext("2d");
    vcanvas2.width = smin;
    sbarH = Math.floor(smin / 10);
    vcanvas2.height = sbarH;
    anActionBar = new ActionBar(ctx2, 10, sbarH);

    anActionBar.Init();
    setLevel(1);
}



document.onkeypress = playKey;