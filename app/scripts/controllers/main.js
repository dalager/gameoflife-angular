'use strict';

angular.module('angularconwayApp')
  .controller('MainCtrl', function ($scope,$log,$interval) {
	$scope.seedpct = 64;
	$scope.iterations = 0;
	$scope.rows = [];
	$scope.runlog = [];
	var reseed = function(){
		for(var i=0;i<$scope.rows.length;i++){
			for(var j=0;j<$scope.rows[i].length;j++){
				$scope.rows[i][j].alive=(Math.random()*100)<$scope.seedpct;
			}
		}
	};
	var seed = function(){
		$scope.rows =[];
		var gridsize = 80;
		for (var i = 0; i < gridsize; i++) {
			var row=[];
			for (var n = 0; n < gridsize; n++) {
				row.push({alive: (Math.random()*100)<$scope.seedpct});
			}
			$scope.rows.push(row);
		}
	};

	seed();
	var getLiveNeighbours = function(row,cell,rows){
		var count=0;
		var notFirstCol=cell>0;
		var notLastCol = cell<rows[0].length-1;

		// top
		if(row>0){
			var toprow=rows[row-1];
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
		if(row<rows.length-1){
			var bottomrow=rows[row+1];
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
		if(notFirstCol && rows[row][cell-1].alive){
			count++;
		}
		// back
		if(notLastCol && rows[row][cell+1].alive){
			count++;
		}

		return count;
	};


	var process = function(){
		$log.info('processing');
		var changeCount = 0;
		var clone = $scope.rows.slice(0);
		
		for(var i=0; i < clone.length; i++){
			for(var j=0; j < clone[i].length;j++){
				var cell = clone[i][j];
				var	neighbours = getLiveNeighbours(i,j,clone);
				// rules
				// 1. Any live cell with fewer than two live neighbours dies
				//    as if caused by under-population.
				if(cell.alive && neighbours<2){
					$scope.rows[i][j].alive=false;
					changeCount++;
					continue;
				}
				//2. Any live cell with two or three live neighbours 
				//   lives on to the next generation.
				if(cell.alive && neighbours===2||neighbours===3){
					continue;
				}

				// 3. Any live cell with more than three live neighbours dies, 
				//    as if by overcrowding.
				if(cell.alive && neighbours > 3){
					$scope.rows[i][j].alive=false;
					changeCount++;
					continue;
				}

				// 4. Any dead cell with exactly three live neighbours 
				//    becomes a live cell, as if by reproduction.
				if(!cell.alive && neighbours===3){
					$scope.rows[i][j].alive=true;
					changeCount++;
				}
			}
		}
		if(changeCount>0){
			$scope.iterations++;
		}
		return changeCount;
	};

	var toggleCell = function(row,cell){
		$scope.rows[row][cell].alive = !$scope.rows[row][cell].alive;	
	};
	$scope.toggle = function(row,cell){
		toggleCell(row,cell);
//		$log.info(getLiveNeighbours(row,cell));
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
		}, 400);
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
