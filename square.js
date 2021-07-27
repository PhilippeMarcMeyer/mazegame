'use strict';

function Square(walls,x,y){
    this.def = {
        "north" : {"open" : !!walls.charAt(0),"color":"#fff"},
        "east" : {"open" : !!walls.charAt(1),"color":"#fff"},
        "south" : {"open" : !!walls.charAt(2),"color":"#fff"},
        "west" : {"open" : !!walls.charAt(3),"color":"#fff"},
        "position" : {"x":x,"y":y}
    }
  this.extras = {
        "special" :[],
  }
}

Square.prototype.wallSetOpen = function(prop,isOpen) {
  if(this.def[prop] === undefined) return;
	this.def[prop].open = isOpen;
};

Square.prototype.wallSetColor = function(prop,color) {
  if(this.def[prop] === undefined) return;
	this.def[prop].color = color;
};

Square.prototype.addSpecial = function(item) {
	this.extras.special.push(item);
};

Square.prototype.removeSpecial = function(item) {
  	let pos = this.def.special.indexOf(item);
  if(pos != -1){
    this.def.special.splice(pos, 1);
  }
};

module.exports = Square;