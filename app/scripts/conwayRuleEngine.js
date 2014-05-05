'use strict';

var ConwayRuleEngine = function(){
};
ConwayRuleEngine.prototype.shouldCellChange = function(i,j,cell,neighbours){
	
	// rules
	// 1. Any live cell with fewer than two live neighbours dies
	//    as if caused by under-population.
	if(cell.alive===true && neighbours < 2){
		return {'row':i,'cell':j,alive:false};
	}

	//2. Any live cell with two or three live neighbours 
	//   lives on to the next generation.
	if(cell.alive===true && (neighbours===2||neighbours===3)){
		return null;
	}

	// 3. Any live cell with more than three live neighbours dies, 
	//    as if by overcrowding.
	if(cell.alive===true && neighbours > 3){
		return {'row':i,'cell':j,alive:false};
	}


	// 4. Any dead cell with exactly three live neighbours 
	//    becomes a live cell, as if by reproduction.
	if(neighbours===3 && cell.alive!==true){
		//$log.info('LIFE!')
		return {'row':i,'cell':j,alive:true};
	}
};
	