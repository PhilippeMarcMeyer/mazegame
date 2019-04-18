 
 
 function rgbaColor(r,g,b,t){
	this.r=r;
	this.g=g;
	this.b=b;
	this.t=t;
	
	this.StringIt=function(){
		return("rgba("+r+","+g+","+b+","+t+")");
	}
}


function rect(ctx,x,y,w,h,col,crossed){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle=col;
	ctx.strokeStyle="black";
	ctx.fillRect(x,y,w,h);
	ctx.strokeRect(x,y,w,h);
	ctx.closePath();
	ctx.restore();
}

function sphere(ctx,x,y,s,r,g,b,trans){
	ctx.save();
	ctx.lineWidth= 1;
	for (var a = s; a>1; a-=1)    {
		r+=3;
		g+=3;
		b+=3;
		if(r>255)r=255;
		if(g>255)g=255;
		if(b>255)b=255;
		ctx.fillStyle ="rgba("+r+","+g+","+b+","+trans+")";
		ctx.beginPath();
		if(a<1)a=1;
		ctx.arc(x,y,a,vPi*2,0,false);
		ctx.closePath();
		ctx.fill();
	}
	ctx.restore();
}

function drawLevel(){
	var x=aMaze.margin+smin2;
	var y=aMaze.margin+aMaze.wallLength;
	//gameLevel
	writeCentered(aMaze.ctx,24,"Level "+gameLevel,"black",x,y);
}

function writeCentered(aCtx,aFontSize,aMsg,aColor,x,y){
	aCtx.save();
	aCtx.beginPath();
	aCtx.font=aFontSize+"px Arial";
	aCtx.strokeStyle=aColor;
	obj = aCtx.measureText(aMsg);
	var len = Math.floor(obj.width/2);
	aCtx.strokeText(aMsg,x-len,y+10);
	aCtx.closePath();
	aCtx.restore();
}

function splash(msg){
	ctx.font="48px Arial";
	ctx.strokeStyle="darkred";
	var len = Math.floor(ctx.measureText(msg).width/2);
	ctx.strokeText(msg,aMaze.center.x-len,aMaze.center.y);
}

function drawSky(ctx,l,t,w,h){
	var cSkyLight="rgba(230,220,240,0.5)";
	var cSkyDark="rgba(40,50,55,0.5)";
	var sky = ctx.createLinearGradient(l, t, w,h);
	sky.addColorStop(0,cSkyLight); 
	sky.addColorStop(1,cSkyDark);
	ctx.fillStyle = sky;
	ctx.fillRect(l, t, w,h);
}

function myDrawUsage(ctx, usage, i, j, wallLength, nbH, nbV, vmargin, usageNr) {
    var left = (i * wallLength) + vmargin;
    var top = (j * wallLength) + vmargin;
    var len2 = Math.floor(wallLength / 4);
    var len1 = Math.floor(wallLength / 2);
    ctx.save();
    ctx.font = "9px Arial";

    if (usage == 'start') {
        ctx.fillStyle = "orangered";
        ctx.fillRect(left, top, wallLength, wallLength);

    }
    else if (usage == 'end') {
        ctx.fillStyle = "darkgreen";
        ctx.fillRect(left, top, wallLength, wallLength);

    }
    else if (usage == 'roc') {
        ctx.fillStyle = "rgba(0,0,160,0)";
        ctx.fillRect(left, top, wallLength, wallLength);
        star2(ctx, left + len1, top + len1, len1, 4, 0.7);
    }

    ctx.restore();
}

function myDrawSign(ctx, aSign, i, j, vpath, nbLines, nbRows, vmargin) {
    ctx.beginPath();

    if (aSign == 'd') {
        ctx.strokeStyle = "#000000";
        ctx.moveTo((i * vpath) + vpath + vmargin, (j * vpath) + vmargin);
        ctx.lineTo((i * vpath) + vpath + vmargin, (j * vpath) + vmargin + vpath);
    }
    else if (aSign == 'e') {
        ctx.strokeStyle = "#FF0000";
        ctx.moveTo((i * vpath) + vpath + vmargin, (j * vpath) + vmargin);
        ctx.lineTo((i * vpath) + vpath + vmargin, (j * vpath) + vmargin + vpath);
    }
    else if (aSign == 'b') {
        ctx.strokeStyle = "#000000";
        ctx.moveTo((i * vpath) + vmargin, (j * vpath) + vpath + vmargin);
        ctx.lineTo((i * vpath) + vpath + vmargin, (j * vpath) + vpath + vmargin);
    }
    else if (aSign == 'c') {
        ctx.strokeStyle = "#FF0000";
        ctx.moveTo((i * vpath) + vmargin, (j * vpath) + vpath + vmargin);
        ctx.lineTo((i * vpath) + vpath + vmargin, (j * vpath) + vpath + vmargin);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = "#000000";
}

function star2(ctx, x, y, r, nbPts, t) {
    var midPt = Math.floor(nbPts / 2) + 1;
    var vAngle = 360 / nbPts;
    var vAngleDepart = 180;
    var vAngleDecal = Math.floor(vAngle / 2);
    var vInnerR = Math.floor(r / 3);
    var arrPoints = new Array(nbPts)
    var arrInnerPts = new Array(nbPts)
    var arrInnerPts2 = new Array(nbPts)

    // Nous calculons les emplacements des points que nous mÃ©morisons dans le tableau arrPoints
    for (var i = 1; i <= nbPts; i++) {
        // On calcule les position des pointes des Ã©toiles
        vSin = sinFromDegrees(vAngleDepart + vAngle * (i - 1));
        vCos = cosFromDegrees(vAngleDepart + vAngle * (i - 1));
        x1 = vSin * r + x;
        y1 = vCos * r + y;
        arrPoints[i - 1] = new Point2D(x1, y1);
        vSin = sinFromDegrees(vAngleDecal + vAngleDepart + vAngle * (i - 1));
        vCos = cosFromDegrees(vAngleDecal + vAngleDepart + vAngle * (i - 1));
        x1 = vSin * vInnerR + x;
        y1 = vCos * vInnerR + y;
        arrInnerPts[i - 1] = new Point2D(x1, y1);
        vSin = sinFromDegrees(-vAngleDecal + vAngleDepart + vAngle * (i - 1));
        vCos = cosFromDegrees(-vAngleDecal + vAngleDepart + vAngle * (i - 1));
        x1 = vSin * vInnerR + x;
        y1 = vCos * vInnerR + y;
        arrInnerPts2[i - 1] = new Point2D(x1, y1);
    }

    // Nouveau dessin : l'Ã©toile 

    for (var i = 1; i <= nbPts; i++) {
        //vStep
        vPointDepart = i;
        vPointArrivee1 = i - 1;
        vPointArrivee2 = i + 1;
        if (vPointArrivee2 > nbPts) {
            vPointArrivee2 = 1;
        }
        if (vPointArrivee1 < 1) {
            vPointArrivee1 = nbPts;
        }
        j = (i % midPt) + 1;

        ctx.beginPath();
        vControl = Math.floor(128 / nbPts);
        vClair = 50;
        vWest = Math.floor(j * vControl);
        r = Math.floor(136 + vClair - vWest);
        g = Math.floor(136 + vClair);
        b = Math.floor(50 + vClair + vWest);
        vcolor = rgba2ColorString(r, g, b, t);
        ctx.strokeStyle = vcolor;
        ctx.fillStyle = vcolor;

        ctx.moveTo(arrPoints[vPointDepart - 1].x, arrPoints[vPointDepart - 1].y);
        ctx.lineTo(arrInnerPts[vPointArrivee1 - 1].x, arrInnerPts[vPointArrivee1 - 1].y);
        ctx.lineTo(x, y);
        ctx.lineTo(arrPoints[vPointDepart - 1].x, arrPoints[vPointDepart - 1].y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        vcolor = rgba2ColorString(r + vClair, g + vClair, b + vClair, t);
        ctx.strokeStyle = vcolor;
        ctx.fillStyle = vcolor;
        ctx.lineTo(arrInnerPts2[vPointArrivee2 - 1].x, arrInnerPts2[vPointArrivee2 - 1].y);
        ctx.lineTo(x, y);
        ctx.lineTo(arrPoints[vPointDepart - 1].x, arrPoints[vPointDepart - 1].y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

function setLevel(n){
	 gameLevel=n;
	 hurryUp=2800-(gameLevel*700);

	 anActionBar.arrBarState[7]=0;
	 anActionBar.arrBarState[8]=0;
	 anActionBar.arrBarState[9]=0;
	 anActionBar.arrBarState[6+n]=1;
	 
	 anActionBar.Draw();
}
