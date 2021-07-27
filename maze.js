'use strict';

// 0110
function Maze(name,nrInOneLine,squares){
    this.name = name;
    this.nrInOneLine = nrInOneLine;
    this.squares = [];
  
    if(squares){
      this.nrInOneLine = Math.sqrt(squares.squares.length);
      this.squares = Object.apply({},squares);
    }else{
      this.Generate();
      this.OpenRandomWalls(Math.round(nrInOneLine/3));
    }
}

Maze.prototype.Generate = function() {
 	this.squares = [];
};

Maze.prototype.OpenRandomWalls = function(nrWalls){
   let wallsToOpen = [];
   while(wallsToOpen.length < nrWalls){
     
   }
 	this.squares = [];
};


module.exports = Maze;