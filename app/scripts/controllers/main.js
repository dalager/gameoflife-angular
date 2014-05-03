/* global ConwayGrid */
'use strict';

angular.module('angularconwayApp')
  .controller('MainCtrl', function ($scope,$log,$interval) {
	$scope.seedpct = 64;
	$scope.iterations = 0;
	$scope.rows = [];

	$scope.grid = new ConwayGrid(80);
	$scope.grid.initialize($scope.seedpct);

	var reseed = function(){
		$scope.grid.reseed($scope.seedpct);
	};

	var process =function(){
		$scope.grid.process();
	};

	$scope.toggle = function(row,cell){
		$scope.grid.toggleCell(row,cell);
	};

	$scope.showNeighbours = function(row,cell){
		$log.info('neighbours: '+$scope.grid.getLiveNeighbours(row,cell));
	};
	
	$scope.restart = function(donecb){
		$scope.stop();
		reseed();
		$scope.start(donecb);
	};

	$scope.step = function(){
		process();
	};


	var stop;
	$scope.start = function(completed) {
		if ( angular.isDefined(stop) ){ return;}
		$scope.iterations=0;
		stop = $interval(function() {
			var changes = process();
			if(changes===0){
				$scope.stop();
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
});
