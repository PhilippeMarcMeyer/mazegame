
function Point2D(x,y){
	this.x=x;
	this.y=y;
}

function ActionBar(ctx2, nr, sbarH) {
    this.nr = nr;
    this.nrDim = 5;
    this.arrBarName = new Array(nr);
    this.arrBarParam = new Array(nr);
    this.arrBarImg = new Array(nr);
    this.arrBarState = new Array(nr);
    this.arrBarWay = new Array(nr);
    this.sbarH = sbarH;
    this.sbarH2 = Math.floor(sbarH / 2);
    this.Init = function () {

        for (i = 0; i < this.nr; i++) {
            this.arrBarName[i] = "";
            this.arrBarParam[i] = 0;
            this.arrBarImg[i] = "";
            this.arrBarState[i] = 0;
            this.arrBarWay[i] = i;
        }

        for (i = 0; i < this.nrDim; i++) {
            this.arrBarName[i] = "dim";
            this.arrBarParam[i] = 12 + (i * 4);
            this.arrBarImg[i] = "maz";
            this.arrBarState[i] = 0;
            this.arrBarWay[i] = 0;// radio btn family
        }

        this.arrBarName[5] = "round"
        this.arrBarParam[5] = "open";
        this.arrBarImg[5] = "key";
        this.arrBarState[0] = 0;

        this.arrBarName[6] = "round"
        this.arrBarParam[6] = "frost";
        this.arrBarImg[6] = "ice";
        this.arrBarState[6] = 0;

        for (i = 7; i < this.nr; i++) {
            this.arrBarName[i] = "Lvl";

            this.arrBarParam[i] = i - 6;
            this.arrBarImg[i] = "";
            this.arrBarState[i] = 0;
            this.arrBarWay[i] = 7;// radio btn family
        }
		
        this.arrBarState[7] = 1;
        this.arrBarState[0] = 1;
        this.Play(0);
    }
    this.Clic = function (x, y) {
        var curCell = Math.floor(x / this.sbarH);
        if (curCell > this.nr - 1) curCell = this.nr - 1;
        var way = this.arrBarWay[curCell];
        this.arrBarState[curCell] = 1;
        for (i = 0; i < this.nr; i++) {
            if (i != curCell && way == this.arrBarWay[i]) {
                this.arrBarState[i] = 0;
            }
        }
        this.Play(curCell);
        this.Draw();
    }
    this.Play = function (curCell) {
        var mobsNr = 3;
        var mazeSize = 12;
        var nextCell = -1;
        var prevCell = -1;

        if (this.arrBarName[curCell] == "Lvl" && running) {
            setLevel(this.arrBarParam[curCell]);
        }

        else if (this.arrBarName[curCell] == "dim" && !running) {

            mazeSize = this.arrBarParam[curCell];
            mobsNr = 3 + curCell;
            genMaze(mazeSize, mazeSize, mobsNr);
            running = true;
            setLevel(1);
        }

        else if (this.arrBarName[curCell] == "round" && running) {

            if (this.arrBarParam[curCell] == "frost") {
                manageCamera(KEY_FIRE);
            }

            else if (this.arrBarParam[curCell] == "open" && aMaze.nrKeys > 0) {
                aMaze.nrKeys--;
                curCell = aPlayer.playerPos;
                var facing = aPlayer.facing;
                if (facing == KEY_UP) {
                    if (aMaze.arr[curCell].y > 0) {
                        nextCell = curCell - aMaze.nbH;
                        aPlayer.playerPos = nextCell;
                        if(aMaze.arr[curCell].wallUp != undefined ) aMaze.arr[curCell].wallUp = 0;
                    }
                }
                else if (facing == KEY_RIGHT) {
                    nextCell = curCell + 1;

                    if (aMaze.arr[curCell].x < aMaze.nbH - 1) {
                        aPlayer.playerPos = nextCell;
                        curCell.wallRight = 0;
                        if(aMaze.arr[curCell].wallRight != undefined ) aMaze.arr[curCell].wallRight = 0;
                    }
                }
                else if (facing == KEY_LEFT) {

                    nextCell = curCell - 1;
                    if (aMaze.arr[curCell].x != 0)
                        aPlayer.playerPos = nextCell;
                        if(aMaze.arr[curCell].wallLeft != undefined ) aMaze.arr[curCell].wallLeft = 0;
                }
                else if (facing == KEY_DOWN) {
                    nextCell = curCell + aMaze.nbH;
                    if (nextCell < aMaze.nrCells)
                        aPlayer.playerPos = nextCell;
                        if(aMaze.arr[curCell].wallDown != undefined ) aMaze.arr[curCell].wallDown = 0;

                }
                if (curCell != aPlayer.playerPos) {
/*
                    var aMobReach = Math.max(curCell, Math.floor(aMaze.nrCells / 3));
                    i = mobs.length + 1;
                    mobs.push(new mob(curCell, i, aMobReach, aMaze.ctx, aMaze, "shadow", 5 + i));
*/
                }
                aMaze.Draw();
                if (aMaze.arr[aPlayer.playerPos].usage == 'end') {
                    running = false;
                    splash("you are amazing!");
                }
                if (running) {

                    for (z = 0; z < mobs.length; z++) {
                        mobs[z].Move();
                    }
                }
            }
        }
    }
    this.Draw = function () {
        var cSkyLight = "rgba(230,220,240,0.5)";
        var cSkyDark = "rgba(40,50,55,0.5)";
        var x = 0;
        var y = this.sbarH2;
        var xleft = 0;
        var yTop = 0;
        ctx2.strokeStyle = "#000";
        ctx2.clearRect(0, 0, smin, this.sbarH);
        ctx2.strokeRect(0, 0, smin, this.sbarH);
        for (i = 0; i < this.nr; i++) {
            x = i * this.sbarH + this.sbarH2;
            xLeft = i * this.sbarH;
            if (this.arrBarState[i] == 0)
                ctx2.fillStyle = cSkyLight;
            else
                ctx2.fillStyle = cSkyDark;

            if (this.arrBarName[i] == "Lvl") {
                writeCentered(ctx2, 18, "Lvl " + this.arrBarParam[i], "black", x, y);
            }

            else if (this.arrBarName[i] == "dim") {
                var img = document.getElementById(this.arrBarImg[i]);
                ctx2.drawImage(img, xLeft, yTop, this.sbarH, this.sbarH);
                mazeSize = this.arrBarParam[i];
                writeCentered(ctx2, 24, this.arrBarParam[i], "red", x, y);
            }
            else if (this.arrBarName[i] == "round") {
                if (this.arrBarImg[i] == "")
                    writeCentered(ctx2, 24, this.arrBarParam[i], "red", x, y);
                else {
                    var img = document.getElementById(this.arrBarImg[i]);
                    ctx2.drawImage(img, xLeft, yTop, this.sbarH, this.sbarH);
                    if (this.arrBarParam[i] == "open")
                        writeCentered(ctx2, 12, aMaze.nrKeys, "black", xLeft + 12, yTop + 12);
                }
            }
            ctx2.fillRect(sbarH * i, 0, sbarH, sbarH);
            ctx2.strokeRect(sbarH * i, 0, sbarH, sbarH);
        }
    }
}

function mazeCell(x, y, nbH, nbV) {
    var tossUp = Math.floor(Math.random() * 100);
    this.i = x + (y * nbH);
    this.x = x;
    this.y = y;
    this.usage = 'none';
    this.usageNr = 0;
    if (this.i == 0) {
        this.usage = 'start';
    }
    else if (this.i == ((nbH * nbV) - 1)) {
        this.usage = 'end';
    }

    this.way = (x + (y * nbH) + 1);
    this.wallRight = 1; // closed
    this.wallDown = 1;// closed
    this.nextRight = -1; // no neighboor
    this.nextDown = -1; // no neighboor
    var Test = ((x + 1) % nbH);
    if (Test == 0)
        this.wallRight = -1; //forbidden
    else
        this.nextRight = this.i + 1; // right neighboor
    var Test = ((y + 1) % nbV);
    if (Test == 0)
        this.wallDown = -1; //forbidden
    else
        this.nextDown = this.i + nbH; // bottom neighboor
    tossUp = Math.floor(Math.random() * 100);
    if (tossUp < 10) if (this.wallRight == 1) this.wallRight = 2;
    if (tossUp > 90) if (this.wallDown == 1) this.wallDown = 2;

    this.setUsage = function (n) {
        this.usageNr = n;
    }
    this.closeTheDoorPlease = function () {
        if (this.wallRight == 0) {
            this.wallRight = 1;
        }
        if (this.wallDown == 0) {
            this.wallDown = 1;
        }
    }
}// end object

function mob(cell, nb, move, ctx, maze, color, frozenTime) {
    this.pos = cell;
    this.nb = nb;
    this.color = color;
    this.ctx = ctx;
    this.mood = 'normal';
    this.moodCpt = 0;
    this.maze = maze;
    this.move = move;
    this.diago2Player = 10000;
    this.frozenTime = frozenTime;
    this.facing = KEY_DOWN;
    this.arrFind = new Array(this.maze.nrCells);

    this.Move = function () {
        if (this.moodCpt > 0) this.moodCpt--;
        if (this.moodCpt == 0) this.mood = 'normal';
        var nbH = this.maze.nbH;
        var myPos = this.pos;
        var hisPos = aPlayer.playerPos;
        var xHisPos = this.maze.arr[hisPos].x;
        var yHisPos = this.maze.arr[hisPos].y;
        var xMyPos = this.maze.arr[myPos].x;
        var yMyPos = this.maze.arr[myPos].y;


        var steps2him = Math.abs(xHisPos - xMyPos) + Math.abs(yHisPos - yMyPos);
        if (steps2him == 0) {
            running = false;
            doStopCount();
            splash("Game Over !");
        }
        else {
            sms2("I'm " + steps2him + " steps from you !");

            for (i = 0; i < this.maze.nrCells ; i++) {
                this.arrFind[i] = 0;
            }
            var aCell;
            var found = false;
            var deadEnd = false;
            this.arrFind[myPos] = 1;//first step !
            myCurSearchIncrement = 1;
            myCurSearchCell = myPos;

            while (!found && running && myCurSearchIncrement > 0) {
                deadEnd = true;
                // find a way Right : is the wall opened ?
                if (this.maze.arr[myCurSearchCell].wallRight == 0 && deadEnd) {// no wall
                    if (this.arrFind[myCurSearchCell + 1] == 0) { // right cell not explored
                        myCurSearchIncrement++;
                        myCurSearchCell++;
                        this.arrFind[myCurSearchCell] = myCurSearchIncrement;
                        deadEnd = false;
                    }
                }
                // find a way Down : is the wall opened ?
                if (this.maze.arr[myCurSearchCell].wallDown == 0 && deadEnd) {// no wall
                    if (this.arrFind[myCurSearchCell + nbH] == 0) { // bottom cell not explored
                        myCurSearchIncrement++;
                        myCurSearchCell += nbH;
                        this.arrFind[myCurSearchCell] = myCurSearchIncrement;
                        deadEnd = false;
                    }
                }
                // find a way Left : is the right wall of the left cell opened ?
                if (myCurSearchCell % nbH > 0 && deadEnd) {
                    if (this.arrFind[myCurSearchCell - 1] == 0) { // left cell not explored
                        if (this.maze.arr[myCurSearchCell - 1].wallRight == 0) {
                            myCurSearchIncrement++;
                            myCurSearchCell--;
                            this.arrFind[myCurSearchCell] = myCurSearchIncrement;
                            deadEnd = false;
                        }
                    }
                }
                // find a way ups : is the down wall of the upper cell opened ?
                if (myCurSearchCell - nbH >= 0 && deadEnd) {
                    if (this.arrFind[myCurSearchCell - nbH] == 0) { //top cell not explored
                        if (this.maze.arr[myCurSearchCell - nbH].wallDown == 0) {
                            myCurSearchIncrement++;
                            myCurSearchCell -= nbH;
                            this.arrFind[myCurSearchCell] = myCurSearchIncrement;
                            deadEnd = false;
                        }
                    }
                }
                if (deadEnd) {
                    this.arrFind[myCurSearchCell] = -1;
                    myCurSearchIncrement--;
                    myCurSearchCell = this.arrFind.indexOf(myCurSearchIncrement);
                }

                found = (myCurSearchCell == hisPos);
            }// end while 
            if (this.mood == 'frozen') {
                // ???
            }
            else if (myCurSearchIncrement > this.move && this.diago2Player > 6) {
                this.mood = "?";
            }
            else {
                this.pos = this.arrFind.indexOf(2);
                //Dont allow the mobs to be on the same cell
                var coolCell = 2;
                var maxCell = (this.arrFind.length - 1);
                if (this.nb > 0) {
                    for (k = 0; k < this.nb; k++) {
                        if (mobs[k].pos == this.pos) {
                            if (coolCell < maxCell) coolCell++
                            // this.pos=this.arrFind.indexOf(coolCell);
                        }


                    }


                }
            }
        }
        var myPos = this.pos;
        var hisPos = aPlayer.playerPos;
        var xHisPos = this.maze.arr[hisPos].x;
        var yHisPos = this.maze.arr[hisPos].y;
        var xMyPos = this.maze.arr[myPos].x;
        var yMyPos = this.maze.arr[myPos].y;

        var A = Math.abs(xHisPos - xMyPos);
        var B = Math.abs(yHisPos - yMyPos);
        var H = Math.sqrt(A * A + B * B);

        this.diago2Player = Math.floor(H);

    }// end fct

    this.Draw = function (i, j, wallLength, vmargin, nbH) {
        var len2 = Math.floor(wallLength / 2);
        var left = (i * wallLength) + vmargin + len2;
        var top = (j * wallLength) + vmargin + len2;
        var len4 = Math.floor(wallLength / 6);
        var len3 = Math.floor(wallLength / 4);
        var xLeft = left - len2;
        var yTop = top - len2;
        /*
         var img=document.getElementById("mob");
           ctx.drawImage(img,xLeft,yTop,wallLength,wallLength);
        */
        if (this.color != "shadow") {
            sphere(ctx, left, top, len2, this.color.r, this.color.g, this.color.b, this.color.t);
            /*
            this.ctx.strokeStyle="black";
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.fillStyle=this.color.StringIt();
            this.ctx.arc(left,top,len2,0,2*Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
            */
        }
        else {
            this.ctx.strokeStyle = "grey";
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.strokeStyle = "grey";
            this.ctx.arc(left, top, len2, 0, 2 * Math.PI);
            this.ctx.stroke();
            //this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
        }


        //DomeDraw(this.ctx,len2,left,top,"black",this.color);

        if (this.mood == 'frozen') {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.fillStyle = 'white';
            var frozen = (this.moodCpt / this.frozenTime);
            this.ctx.arc(left, top, len2, 0, (2 * frozen) * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();

        }

        //-------------
        var myPos = this.pos;
        var hisPos = aPlayer.playerPos;
        var xHisPos = this.maze.arr[hisPos].x;
        var yHisPos = this.maze.arr[hisPos].y;
        var xMyPos = this.maze.arr[myPos].x;
        var yMyPos = this.maze.arr[myPos].y;
        var dx = xHisPos - xMyPos;
        var dy = yHisPos - yMyPos;
        var h = Math.sqrt((dx * dx + dy * dy));
        dx = dx / h * len3;
        dy = dy / h * len3;


        //if(this.mood!="dead"){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(left + dx, top + dy, len4, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();


        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(left + dx, top + dy, len4 / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();


        if (this.mood == "?") {
            ctx.strokeStyle = "black";
            ctx.font = len2 + "px Arial";
            ctx.strokeText(this.mood, left, top);
        }
        //}
        //-------------

    }// end fct 
}// end object

function genMazeObj(x, y, ctx, margin, wallLength) {
    this.playerPos = 0;
    this.nbH = x;
    this.nbV = y;
    this.nrCells = this.nbH * this.nbV;
    this.nrWalls2Open = this.nrCells - 1;
    this.nrWallOpened = 0;
    this.margin = margin;
    this.ctx = ctx; // le contexte de dessin
    this.wallLength = wallLength;
    this.center = new Point2D(smin2, smin2); // center of vision
    this.focal = this.wallLength * 1;
    this.nrKeys = Math.floor(x / 4);
    var offset = 0;
    // Preparation d'un tableau de cases
    this.arr = new Array(this.nrCells);
    for (y = 0; y < this.nbV; y++) {
        for (x = 0; x < this.nbH; x++) {
            this.arr[offset] = new mazeCell(x, y, this.nbH, this.nbV);
            offset++;
        }
    }


    var roc2create = Math.floor((this.nbV + this.nbV) / 4) + 1;
    var rocCreated = 0;

    while (rocCreated < roc2create) {
        aRandCell = Math.floor(Math.random() * (this.nrCells - 1));
        if (this.arr[aRandCell].usage == 'none') {
            this.arr[aRandCell].usage = 'roc';
            this.arr[aRandCell].usageNr = -1;
            rocCreated++;
        }
    }

    this.getRocCell = function (n) {
        var rocCell = -1;
        var rocFirst = -1;
        for (k = 0; k < this.nrCells; k++) {
            if (this.arr[k].usage == 'roc') {

                if (this.arr[k].usageNr == 1) {
                    rocFirst = k;
                }
                if (this.arr[k].usageNr == n) {
                    rocCell = k;
                }
            }
        }
        if (rocCell > 0) {
            aPlayer.playerPos = rocCell;
        }
        else if (rocFirst > -1)
            aPlayer.playerPos = rocFirst;
    }

    this.generate = function (aMandatoryCell) {
        var offset = 1;

        //document.getElementById('infos').innerHTML=" Generating..."; 
        var aWay = 0;
        var orAnother = 0;
        var nrCells = this.nrCells;
        var aRandCell = 0;
        var tossUp = 0;
        var chooseRight = false;
        var wallCanBeOpened = false;
        var nextCell = 0;

        if (!aMandatoryCell)
            aRandCell = Math.floor(Math.random() * (nrCells - 1));
        else {
            aRandCell = aMandatoryCell;
            this.nrWallOpened = 0;

            for (k = 0; k < nrCells; k++) {
                this.arr[k].way = (k + 1);
                if (this.arr[k].wallRight == 0) {

                    this.arr[k].wallRight = 1;

                }
                if (this.arr[k].wallDown == 0) {
                    this.arr[k].wallDown = 1;
                }

            }

        }
        while (this.nrWallOpened < this.nrWalls2Open) {
            tossUp = Math.floor(Math.random() * 100);
            aWay = this.arr[aRandCell].way;

            chooseRight = (tossUp < 50);
            wallCanBeOpened = false;
            nextCell = -1;
            if (chooseRight) {
                wallCanBeOpened = (this.arr[aRandCell].wallRight >= 1);
                if (wallCanBeOpened) { nextCell = this.arr[aRandCell].nextRight; }
            }
            else {
                wallCanBeOpened = (this.arr[aRandCell].wallDown >= 1);
                if (wallCanBeOpened) { nextCell = this.arr[aRandCell].nextDown; };
            }

            if (wallCanBeOpened)
                wallCanBeOpened = (nextCell != -1);

            if (wallCanBeOpened) {
                orAnother = this.arr[nextCell].way;
                if (aWay != orAnother) { // chemins diffï¿½rents 
                    // Ouvrir le mur
                    if (chooseRight)
                        this.arr[aRandCell].wallRight = 0; // Ouvert
                    else
                        this.arr[aRandCell].wallDown = 0; // Ouvert
                    this.nrWallOpened++; //increment du nb de murs ouverts
                    // Changer chemin d'another
                    for (k = 0; k < nrCells; k++) {
                        if (this.arr[k].way == orAnother)
                            this.arr[k].way = aWay;
                    }
                    // -----------------------------
                }
            }

            aRandCell = Math.floor(Math.random() * (this.nrCells - 1));

        }
        // End of while
        //infos("Maze Generated..."); 
        //		infos("Walls opened : "+this.nrWallOpened); 
        //		infos("Nr Cells : "+this.nrCells); 
        offset = 0;
        for (k = 0; k < this.nrCells; k++) {
            if (this.arr[k].usageNr == -1) {
                offset++;
                this.arr[k].setUsage(offset);
            }
        }
    } // end fct

    this.Draw = function () {

        ctx.strokeStyle = "#000";
        ctx.clearRect(0, 0, smin, smin);
        drawSky(ctx, this.margin, this.margin, ((this.nbH * this.wallLength)), ((this.nbV * this.wallLength)));

        ctx.strokeRect(0, 0, smin, smin);
        star2(ctx, this.center.x, this.center.y, smin2, 4, 0.3);

        ctx.strokeRect(this.margin, this.margin, ((this.nbH * this.wallLength)), ((this.nbV * this.wallLength)));



        for (i = 0; i < this.nrCells; i++)
            myDrawUsage(this.ctx, this.arr[i].usage, this.arr[i].x, this.arr[i].y, this.wallLength, this.nbH, this.nbV, this.margin, this.arr[i].usageNr);

        for (i = 0; i < this.nrCells; i++) {
            if (this.arr[i].wallRight == 1) // fermé
            {
                myDrawSign(this.ctx, 'd', this.arr[i].x, this.arr[i].y, this.wallLength, this.nbH, this.nbV, this.margin);
            }
            else if (this.arr[i].wallRight == 2) // ouvrable
            {
                myDrawSign(this.ctx, 'e', this.arr[i].x, this.arr[i].y, this.wallLength, this.nbH, this.nbV, this.margin);
            }

            // bord bas
            if (this.arr[i].wallDown == 1) // ferm
            {
                myDrawSign(this.ctx, 'b', this.arr[i].x, this.arr[i].y, this.wallLength, this.nbH, this.nbV, this.margin);
            }
            else if (this.arr[i].wallDown == 2) // ouvrable
            {
                myDrawSign(this.ctx, 'c', this.arr[i].x, this.arr[i].y, this.wallLength, this.nbH, this.nbV, this.margin);
            }
        }

        var curCell = aPlayer.playerPos;
        aPlayer.DrawPlayer(this.ctx, this.arr[curCell].x, this.arr[curCell].y, this.wallLength, this.margin, this.nbH);

        for (i = 0; i < mobs.length; i++) {
            curCell = mobs[i].pos;
            mobs[i].Draw(this.arr[curCell].x, this.arr[curCell].y, this.wallLength, this.margin, this.nbH);
        }
        drawLevel();
        //gameLevel
    }
}//end object

function player(cell, move, ctx, maze) {
    this.playerPos = cell;
    this.color = new rgbaColor(60, 0, 180, 0.7);
    this.ctx = ctx;
    this.maze = maze;
    this.reach = Math.floor(Math.sqrt(2) * 3);
    this.mood = 'normal';
    this.moodCpt = 0;
    this.frozeAgain = 0;
    this.move = move;
    this.facing = KEY_DOWN;
    this.previousFacing = KEY_DOWN;
    this.coords = new Point2D(0, 0);

    this.getPlayerCoords = function () {
        return this.coords;
    }

    this.Fire = function () {
        if (aPlayer.playerPos > 0 && this.frozeAgain == 0) {
            this.mood = 'firing';
            this.moodCpt = 1;
            this.frozeAgain = 9;
            for (k = 0; k < mobs.length; k++) {
                if (this.reach > mobs[k].diago2Player) {
                    mobs[k].mood = 'frozen';
                    mobs[k].moodCpt = mobs[k].frozenTime;
                }
            }
        }
        else this.mood = 'normal';
    }

    this.MovePlayer = function (keynum) {
        if (this.moodCpt > 0) this.moodCpt--;
        if (this.frozeAgain > 0) this.frozeAgain--;
        if (this.moodCpt == 0) this.mood = 'normal';
        var savePlayer = this.playerPos;
        var curCell = aMaze.arr[savePlayer];
        var nbH = aMaze.nbH;
        var nbV = aMaze.nbV;
        if (keynum != KEY_FIRE)
            this.previousFacing = this.facing;

        if (keynum == KEY_FIRE) {
            this.facing = keynum;
            this.Fire();
        }
        else if (this.facing != keynum)
            this.facing = keynum;
        else if (keynum == KEY_RIGHT) {
            if (curCell.wallRight == 0)
                this.playerPos++;
            else if (curCell.wallRight == 2) { this.playerPos++; shuffle(); }
        }
        else if (keynum == KEY_LEFT) {
            if ((this.playerPos % nbH) == 0)
                sms("Cant move left !");
            else {

                if (aMaze.arr[this.playerPos - 1].wallRight == 0)
                    this.playerPos--;
                else if (aMaze.arr[this.playerPos - 1].wallRight == 2) { this.playerPos--; shuffle(); }

            }
        }
        else if (keynum == KEY_UP) {

            if ((this.playerPos - nbH) < 0)
                sms("Cant move up !");
            else {
                if (aMaze.arr[this.playerPos - nbH].wallDown == 0)
                    this.playerPos = this.playerPos - nbH;
                else if (aMaze.arr[this.playerPos - nbH].wallDown == 2) { this.playerPos - nbH; shuffle(); }

            }


        }
        else if (keynum == KEY_DOWN) {
            if (curCell.wallDown == 0)
                this.playerPos = this.playerPos + nbH;
            else if (curCell.wallDown == 2) { this.playerPos + nbH; shuffle(); }
        }

        if (this.playerPos == savePlayer)
            sms("cant move !");
        else {
            //sms( aMaze.arr[this.playerPos].usage + aMaze.arr[ this.playerPos].usageNr);

            if (aMaze.arr[this.playerPos].usage == 'roc') {

                var nextRoc = aMaze.arr[this.playerPos].usageNr + 1;

                nextRoc = aMaze.getRocCell(nextRoc);
                if (nextRoc > -1) this.playerPos = nextRoc;

            }//if roc
        }

        if (this.playerPos == 0)
            aMaze.nrKeys = Math.floor(aMaze.nbH / 4);

        aMaze.Draw();


        if (aMaze.arr[this.playerPos].usage == 'end') {
            doStopCount();
            running = false;
            splash("you are amazing!");
        }
        if (running) {
            doStopCount();
            MoveMobs();
        }

    }// end fct

    this.DrawPlayer = function (ctx, i, j, wallLength, vmargin, nbH) {
        var len2 = Math.floor(wallLength / 2);
        var left = (i * wallLength) + vmargin + len2;
        var top = (j * wallLength) + vmargin + len2;
        var len4 = Math.floor(wallLength / 6);
        var facing = this.facing;
        if (facing == KEY_FIRE) facing = this.previousFacing;
        var drawEyeNW = (facing == KEY_UP || facing == KEY_LEFT);
        var drawEyeNE = (facing == KEY_UP || facing == KEY_RIGHT);
        var drawEyeSW = (facing == KEY_DOWN || facing == KEY_LEFT);
        var drawEyeSE = (facing == KEY_DOWN || facing == KEY_RIGHT);

        /*
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillStyle=this.color;
        ctx.arc(left,top,len2,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth=2;
        ctx.strokeStyle="white";
        ctx.arc(left,top,len2,0,(2-this.frozeAgain/5)*Math.PI);
        ctx.stroke();
        ctx.restore();
        */

        sphere(ctx, left, top, len2, this.color.r, this.color.g, this.color.b, this.color.t);

        if (this.facing == KEY_FIRE) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255)";
            ctx.arc(left, top, this.reach * wallLength, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";

        if (drawEyeNW) {
            ctx.beginPath();
            ctx.arc(left - len4, top - len4, len4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        if (drawEyeNE) {
            ctx.beginPath();
            ctx.arc(left + len4, top - len4, len4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        if (drawEyeSW) {
            ctx.beginPath();
            ctx.arc(left - len4, top + len4, len4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        if (drawEyeSE) {
            ctx.beginPath();
            ctx.arc(left + len4, top + len4, len4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        ctx.closePath();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        len4 = Math.floor(len4 / 2);
        var len5 = Math.floor(len4 * 2.5);
        if (drawEyeNW) {
            ctx.arc(left - len5, top - len5, len4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        if (drawEyeNE) {
            ctx.arc(left + len5, top - len5, len4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        if (drawEyeSW) {
            ctx.arc(left - len5, top + len5, len4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        if (drawEyeSE) {
            ctx.arc(left + len5, top + len5, len4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        ctx.closePath();
        ctx.restore();

    }
} //end object

function MoveMobs() {

    for (z = 0; z < mobs.length; z++) {
        if (running && mobs[z].mood != "dead")
            mobs[z].Move();
    }
    //-------------------------
    for (i = 1; i < mobs.length; i++) {
        var offset = 1;
        for (j = 0; j < i; j++) {
            if (mobs[i].pos == mobs[j].pos && mobs[j].mood != "dead") {//meme position
                if (arrFind) {
                    if (offset < mobs.length)
                        mobs[i].pos = arrFind.indexOf(offset);
                    else mobs[i].mood = "dead";
                }

            }
        }
    }
    //-------------------------
    if (running) {
        aMaze.Draw();
        doCount();
    }
}
