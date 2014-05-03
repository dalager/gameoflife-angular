var ConwayGrid = function(size){
	this.size = size;
	this.rows=[];
}
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

ConwayGrid.prototype.reseed = function(seedpct){
	for(var i=0;i<this.rows.length;i++){
		for(var j=0;j<this.rows[i].length;j++){
			this.rows[i][j].alive=(Math.random()*100)<seedpct;
		}
	}
};

ConwayGrid.prototype.getLiveNeighbours = function(row,cell){
		var count=0;
		var notFirstCol=cell>0;
		var notLastCol = cell<this.rows[0].length-1;

		// top
		if(row>0){
			var toprow=this.rows[row-1];
			if(notFirstCol && toprow[cell-1].alive){
				count++;
			}
			if(toprow[cell].alive){
				count++;
			}
			if(notLastCol && toprow[cell+1].alive){
				count++;
			}
		}
		
		// bottom
		if(row<this.rows.length-1){
			var bottomrow=this.rows[row+1];
			if(notFirstCol && bottomrow[cell-1].alive){
				count++;
			}
			if(bottomrow[cell].alive){
				count++;
			}
			if(notLastCol && bottomrow[cell+1].alive){
				count++;
			}
		}

		//front
		if(notFirstCol && this.rows[row][cell-1].alive){
			count++;
		}
		
		// back
		if(notLastCol && this.rows[row][cell+1].alive){
			count++;
		}

		return count;
	};
