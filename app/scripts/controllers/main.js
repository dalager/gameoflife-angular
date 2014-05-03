'use strict';

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

angular.module('angularconwayApp')
  .controller('MainCtrl', function ($scope,$log,$interval) {
	$scope.seedpct = 64;
	$scope.iterations = 0;
	$scope.rows = [];
	$scope.runlog = [];

	var ruleEngine=new ConwayRuleEngine();
	$scope.grid = new ConwayGrid(80);
	$scope.grid.initialize($scope.seedpct);

	var reseed = function(){
		$scope.grid.reseed($scope.seedpct);
	};
	
	
	

	var shouldCellChange = function(i,j,grid){
		var cell = grid[i][j];
		var	neighbours = $scope.grid.getLiveNeighbours(i,j);
		return ruleEngine.shouldCellChange(i,j,cell,neighbours);
	};

	var process = function(){
		$log.info('processing');
		
		var grid = $scope.grid.rows;
		var	 changelist = [];
		for(var i=0; i < grid.length; i++){
			for(var j=0; j < grid[i].length;j++){
				var result = shouldCellChange(i,j,grid);
				if(result){
					changelist.push(result);
				}
			}
		}
		//$log.info('changelist: '+changelist.length);
		
		for(var n=0; n < changelist.length; n++){
			toggleCell(changelist[n].row,changelist[n].cell);
		}
		
		//$log.info('change count: '+changelist.length);
		if(changelist.length>80){
			$scope.iterations++;
		}
		return changelist.length;
	};

	var toggleCell = function(row,cell){
		//$log.info('toggle '+row + ' '+cell);
		$scope.grid.rows[row][cell].alive = !$scope.grid.rows[row][cell].alive;
	};

	$scope.toggle = function(row,cell){
		toggleCell(row,cell);
		//$log.info('neighbours: '+getLiveNeighbours(row,cell));
	};

	$scope.showNeighbours = function(row,cell){
		$log.info('neighbours: '+getLiveNeighbours(row,cell,$scope.rows));
	};

	var stop;
	$scope.start = function(completed) {
		if ( angular.isDefined(stop) ){ return;}
		$scope.iterations=0;
		stop = $interval(function() {
			var changes = process();
			if(changes===0){
				$scope.stop();
				$scope.runlog.push({seedpct:$scope.seedpct,iterations:$scope.iterations});
				if(completed){completed();}
			}
		}, 200);
		$log.info('started');
	};

  $scope.stop = function() {
    if (angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop = undefined;
      $log.info('stopped');
    }
  };

  $scope.$on('$destroy', function() {
		$scope.stop();
  });

	$scope.restart = function(donecb){
		$scope.stop();
		reseed();
		$scope.start(donecb);
	};

	$scope.step = function(){
		process();
	};

	var cycleSteps=[];
	var popcycle=function(){
		$log.info('popping cycle');
		var value = cycleSteps.pop();
		$log.info('with seed ' +value);
		if(value){
			$scope.seedpct=value;
			$scope.restart(function(){
				popcycle();
			});
		}
	};

	$scope.runcycle = function(){
		cycleSteps=[];
		for(var i = 1;i<100;i=i+2){
			cycleSteps.push(i);
		}
		popcycle();
	};
});
