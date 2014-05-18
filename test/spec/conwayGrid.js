'use strict';
/* global ConwayGrid */
describe('ConwayGrid',function(){
	it('should exist',function(){
		var grid=new ConwayGrid();
		expect(grid).not.toBeUndefined();
	});
});


describe('ConwayGrid.getLiveNeighbours',function(){
	it('should return zero when surrounded by zeros',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,0],
			[0,1,0],
			[0,0,0]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(0);
	});

	it('should see that N is alive',function(){
		console.log('N is alive');
		var grid = new ConwayGrid();
		grid.load([
			[0,1,0],
			[0,0,0],
			[0,0,0]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(1);
	});
	
	it('should see that NE is alive',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,1],
			[0,0,0],
			[0,0,0]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(1);
	});
	it('should see that NW is alive',function(){
		var grid = new ConwayGrid();
		grid.load([
			[1,0,0],
			[0,0,0],
			[0,0,0]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(1);
	});

	it('should see that S is alive',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,0],
			[0,0,0],
			[0,1,0]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(1);
	});
	it('should see that SE is alive',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,0],
			[0,0,0],
			[0,0,1]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(1);
	});
	it('should see that SW is alive',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,0],
			[0,0,0],
			[1,0,0]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(1);
	});

	it('should see that W is alive',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,0],
			[1,0,0],
			[0,0,0]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(1);
	});


	it('should see that E is alive',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,0],
			[0,0,1],
			[0,0,0]
		]);
		expect(grid.getLiveNeighbours(1,1)).toEqual(1);
	});

	it('should wrap N, return bottom if topmost row',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,0],
			[0,0,0],
			[1,1,1]
		]);
		expect(grid.getLiveNeighbours(0,1)).toEqual(3);
	});

	it('should bottomwrap, return top if last row',function(){
		var grid = new ConwayGrid();
		grid.load([
			[1,1,1],
			[0,0,0],
			[0,0,0]
		]);
		expect(grid.getLiveNeighbours(2,1)).toEqual(3);
	});

	it('should leftwrap, return rightmost col if first col',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,1],
			[0,0,1],
			[0,0,1]
		]);
		expect(grid.getLiveNeighbours(1,0)).toEqual(3);
	});

	it('should rightwrap, return leftmost col if first col',function(){
		var grid = new ConwayGrid();
		grid.load([
			[1,0,0],
			[1,0,0],
			[1,0,0]
		]);
		expect(grid.getLiveNeighbours(1,2)).toEqual(3);
	});
});

describe('ConwayGrid.load',function(){
	it('should load the same number of rows as given',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0]
		]);
		expect(grid.rows.length).toEqual(5);
	});

	it('should convert 0 to false',function(){
		var grid = new ConwayGrid();
		grid.load([
			[0]
		]);

		expect(grid.rows.length).toEqual(1);
		expect(grid.rows[0].length).toEqual(1);
		expect(grid.rows[0][0].alive).toEqual(false);
	});
	
	it('should convert 1 to true',function(){
		var grid = new ConwayGrid();
		grid.load([
			[1]
		]);

		expect(grid.rows.length).toEqual(1);
		expect(grid.rows[0].length).toEqual(1);
		expect(grid.rows[0][0].alive).toEqual(true);
	});
});





