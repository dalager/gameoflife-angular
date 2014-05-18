/* global ConwayRuleEngine,_ */
'use strict';

var ConwayGrid = function(size){
	this.size = size;
	this.rows=[];
	this.ruleEngine = new ConwayRuleEngine();
};

ConwayGrid.prototype.initialize=function(seedPct){
	var gridsize = this.size;
	for (var i = 0; i < gridsize; i++) {
		var row=[];
		for (var n = 0; n < gridsize; n++) {
			row.push({alive: (Math.random()*100)<seedPct});
		}
		this.rows.push(row);
	}
};

ConwayGrid.prototype.toggleCell = function(rowindex,cellindex){
	this.rows[rowindex][cellindex].alive = !this.rows[rowindex][cellindex].alive;
};

ConwayGrid.prototype.reseed = function(seedpct){
	for(var i=0;i<this.rows.length;i++){
		for(var j=0;j<this.rows[i].length;j++){
			this.rows[i][j].alive=(Math.random()*100)<seedpct;
		}
	}
};

ConwayGrid.prototype.load = function(data){
	var rows = _.map(data,function(r){
		return _.map(r,function(c){
			return c===1?{alive:true}:{alive:false};
		});
	});
	this.rows=rows;
};


ConwayGrid.prototype.countFor=function (r,c){
		return this.rows[r][c].alive===true?1:0;
	};
ConwayGrid.prototype.getLiveNeighbours = function(row,cell){
	var count = 0;
	var firstRow = row === 0;
	var lastRow = row === this.rows.length-1;
	var firstCell = cell===0;
	var lastCell = cell===this.rows[0].length-1;

	// offsetting indices to wrap
	var bottomRowIndex = lastRow ? 0 :  (row+1);
	var topRowIndex = firstRow ? this.rows.length-1 : (row-1);
	var nextCellIndex = lastCell ? 0 : (cell+1);
	var prevCellIndex = firstCell ? this.rows[0].length-1 : (cell-1);

	//var _t=this;
	// N
	count += this.countFor(topRowIndex,cell);

	// S
	count += this.countFor(bottomRowIndex,cell);

	// E
	count += this.countFor(row,nextCellIndex);

	// NE
	count += this.countFor(topRowIndex,nextCellIndex);

	// SE
	count += this.countFor(bottomRowIndex,nextCellIndex);

	// W 
	count += this.countFor(row,prevCellIndex);

	// NW
	count += this.countFor(topRowIndex,prevCellIndex);
	
	// SW
	count += this.countFor(bottomRowIndex,prevCellIndex);
	
	return count;
};

ConwayGrid.prototype.shouldCellChange  = function(i,j,grid){
		var cell = grid[i][j];
		var	neighbours = this.getLiveNeighbours(i,j);
		return this.ruleEngine.shouldCellChange(i,j,cell,neighbours);
	};

ConwayGrid.prototype.process = function(){
	var grid = this.rows;
	var	 changelist = [];
	for(var i=0; i < grid.length; i++){
		for(var j=0; j < grid[i].length;j++){
			var result = this.shouldCellChange(i,j,grid);
			if(result){
				changelist.push(result);
			}
		}
	}
	
	for(var n=0; n < changelist.length; n++){
		this.toggleCell(changelist[n].row, changelist[n].cell);
	}
	
	return changelist.length;
};
