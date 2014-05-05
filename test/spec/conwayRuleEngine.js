'use strict';
/* global ConwayRuleEngine */
describe('Conway rule engine',function(){
	it('should exist',function(){
		var engine=new ConwayRuleEngine();
		expect(engine).not.toBeUndefined();
	});
});


describe('Given a dead cell with three live neighbours',function(){
	it('should be reanimated',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:false},3);
		expect(result.alive).toBe(true);
	});
});

describe('Given a live cell with no living neighbours',function(){
	it('should die',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},0);
		expect(result.alive).toBe(false);
	});
});


describe('Given a live cell with one living neighbours',function(){
	it('should die',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},1);
		expect(result.alive).toBe(false);
	});
});

describe('Given a live cell with two living neighbours',function(){
	it('should not change',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},2);
		expect(result).toBe(null);
	});
});

describe('Given a live cell with three living neighbours',function(){
	it('should not change',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},3);
		expect(result).toBe(null);
	});
});

describe('Given a live cell with 4 living neighbours',function(){
	it('should die',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},4);
		expect(result.alive).toBe(false);
	});
});

describe('Given a live cell with 5 living neighbours',function(){
	it('should die',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},5);
		expect(result.alive).toBe(false);
	});
});

describe('Given a live cell with 6 living neighbours',function(){
	it('should die',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},6);
		expect(result.alive).toBe(false);
	});
});

describe('Given a live cell with 7 living neighbours',function(){
	it('should die',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},7);
		expect(result.alive).toBe(false);
	});
});

describe('Given a live cell with 8 living neighbours',function(){
	it('should die',function(){
		var engine=new ConwayRuleEngine();
		var result = engine.shouldCellChange(2,3,{alive:true},8);
		expect(result.alive).toBe(false);
	});
});

