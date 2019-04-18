function getMobNr(cell) {
    var aMob = -1;
    for (i = 0; i < mobs.length; i++) {
        if (mobs[i].pos == cell) {
            aMob = i;
            i = mobs.length;
        }
    }
    return aMob;
}

function rgba2ColorString(r, g, b, t) {
    return "rgba(" + r + "," + g + "," + b + "," + t + ")";
}

function cosFromDegrees(d) {
    vPi = Math.PI;
    r = (d / 180) * vPi;
    return (Math.cos(r));
}

function sinFromDegrees(d) {
    vPi = Math.PI;
    r = (d / 180) * vPi;
    return (Math.sin(r));
}

function doCount() {
    myTimer = setTimeout("MoveMobs()", hurryUp);
}

function doStopCount() {
    clearTimeout(myTimer);
}


function testLocalStorage() {
    return localStorage;
}

function sms(msg) {
    //document.getElementById('infos').innerHTML=msg; 
}

function sms2(msg) {
    //document.getElementById('infos2').innerHTML=msg; 
}

function infos(msg) {
    //document.getElementById('infos').innerHTML=document.getElementById('infos').innerHTML+"</br>"+msg; 
}

function buildActions(isEnabled) {
    var vhtml = "impossible d'enregistrer le jeu sur ce navigateur";
    if (true) {
        vhtml = "Size : <input id='nrH' type='text' size='3' value='12' ></input>";

        vhtml += "by" + "<input id='nrV' type='text' size='3' value='12' ></input>";

        vhtml += "<input id='nrMobs' type='text' size='3' value='3' ></input>mobs";

        vhtml += "<input type='button' value='Go' onclick = 'CallGenMaze();'></input>";

        //vhtml += "<input type='button' value='Test' onclick = 'shuffle();'></input>";
    }
    //document.getElementById("action").innerHTML= vhtml;
}
