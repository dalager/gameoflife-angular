'use strict';
/* global ConwayGrid */
describe('ConwayGrid',function(){
	it('should exist',function(){
		var grid=new ConwayGrid();
		expect(grid).not.toBeUndefined();
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





