function playKey(e) {
    var key = e.which || e.keyCode;

    if (key == KEY_LEFT) manageCamera(KEY_LEFT);
    else if (key == KEY_RIGHT) manageCamera(KEY_RIGHT);
    else if (key == KEY_UP) manageCamera(KEY_UP);
    else if (key == KEY_DOWN) manageCamera(KEY_DOWN);
    else if (key == KEY_FIRE) manageCamera(KEY_FIRE);
} 

function manageCamera(keynum) {
    if (running) {
        aPlayer.MovePlayer(keynum);
    }
}


function checkClickPos(x, y) {

    var curCell = aPlayer.playerPos; // Current cell where to find the player.
    var wall = aMaze.wallLength;
    var wall2 = wall / 2;
    var xPlayer = wall2 + aMaze.margin + (curCell % aMaze.nbH) * wall;
    var yOffset = Math.floor(curCell / aMaze.nbV);

    var yPlayer = wall2 + aMaze.margin + (yOffset * wall);

    var lenP2Clic = Math.sqrt((x - xPlayer) * (x - xPlayer) + (y - yPlayer) * (y - yPlayer));

    var xCenter = aMaze.center.x;
    var yCenter = aMaze.center.y;

    var xDelta = x - xCenter;// positive right
    var yDelta = y - yCenter; //positive down 
    var finalDelta = 0;

    var hWay = "L";
    if (xDelta > 0) {
        hWay = "R";
    }
    var vWay = "T";
    if (yDelta > 0) {
        vWay = "B";
    }
    xDelta = Math.abs(xDelta);
    yDelta = Math.abs(yDelta);
    if (xDelta > yDelta) {
        finalDelta = xDelta;
        theWay = hWay;
    }
    else {
        finalDelta = yDelta;
        theWay = vWay;
    }

    if (lenP2Clic < wall || finalDelta < wall) manageCamera(KEY_FIRE);
    else if (theWay == "L") manageCamera(KEY_LEFT);
    else if (theWay == "R") manageCamera(KEY_RIGHT);
    else if (theWay == "T") manageCamera(KEY_UP);
    else if (theWay == "B") manageCamera(KEY_DOWN);

}

function point_it2(event) {
    var pos_x = event.offsetX ? (event.offsetX) : event.pageX - document.getElementById("brain").offsetLeft;
    var pos_y = event.offsetY ? (event.offsetY) : event.pageY - document.getElementById("brain").offsetTop;
    anActionBar.Clic(pos_x, pos_y);
}


function point_it(event) {
    if (running) {
        var pos_x = event.offsetX ? (event.offsetX) : event.pageX - document.getElementById("universe").offsetLeft;
        var pos_y = event.offsetY ? (event.offsetY) : event.pageY - document.getElementById("universe").offsetTop;
        checkClickPos(pos_x, pos_y);
    }
}

