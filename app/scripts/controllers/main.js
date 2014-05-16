/* global ConwayGrid,_ */
'use strict';

angular.module('angularconwayApp')
  .controller('MainCtrl', function ($scope,$log,$interval,$http) {
	$scope.seedpct = 50;

	$scope.grid = new ConwayGrid(80);
	$http.get('patterns/spaceinvader.js').success(function(result){
		$scope.grid.load(result);
	});

//	$scope.grid.initialize($scope.seedpct);

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

	$scope.export = function(){
		var res = _.map($scope.grid.rows,function(r){
			return _.map(r,function(c){
				return c.alive?1:0;
			});
		});
		var hiddenElement = document.createElement('a');
		hiddenElement.href = 'data:text/json,' + encodeURI(JSON.stringify(res));
		hiddenElement.target = '_blank';
		hiddenElement.download = 'conwaygrid.json';
		hiddenElement.click();

		$log.info(JSON.stringify(res));
	};

	$scope.imported={};
	$scope.importFile = function(){
		$log.info('loading data into grid:');
		$log.info($scope.imported);
		
		$scope.grid.load(JSON.parse($scope.imported));
	};




	$scope.step = function(){
		process();
	};



	// running the thing
	var stop;
	$scope.start = function(completed) {
		if ( angular.isDefined(stop) ){ return;}
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
})
.directive('fileread', [function () {
	return {
		scope: {
			fileread: '='
		},
		link: function (scope, element) {
			element.bind('change', function (changeEvent) {
				var reader = new FileReader();
				reader.onload = function (loadEvent) {
					scope.$apply(function () {
						scope.fileread = loadEvent.target.result;
						console.log(scope.fileread);
					});
				};
				reader.readAsText(changeEvent.target.files[0]);
			});
		}
	};
}]);
