import  { Grid }  from '../src/grid.js';
import UnsolvedGrid from '../src/UnsolvedGrid.js';

describe('Test invalid grids', function() {
  var grid;
  beforeEach(function (){
    grid = new Grid ([
                  [1,2,3,4,5,6,7,8,9],
                  [2,3,4,5,6,7,8,9,1],
                  [3,4,5,6,7,8,9,1,2],
                  [4,5,6,7,8,9,1,2,3],
                  [5,6,7,8,9,1,2,3,4],
                  [6,7,8,9,1,2,3,4,5],
                  [7,8,9,1,2,3,4,5,6],
                  [8,9,1,2,3,4,5,6,7],
                  [9,1,2,3,4,5,6,7,8]
                ]
              );
  });

  it('should test whether a number appears in the row more than once', function() {
    expect(grid.checkRows()).toEqual(true);
  });
  it('should test whether a number appears in the column more than once', function() {
    expect(grid.checkColumns()).toEqual(true);
  });
  it('should test whether a number appears in the small grid more than once', function() {
    expect(grid.checkGrids()).toEqual(false);
  });
});

describe('Test invalid rows and columns and grids', function() {
  var grid;
  beforeEach(function (){
    grid = new Grid ([
                  [1,2,3,4,5,6,7,8,9],
                  [2,3,4,5,6,7,8,9,1],
                  [3,4,5,6,7,8,9,1,2],
                  [4,5,6,7,8,9,1,2,2],
                  [5,6,7,8,9,1,2,3,4],
                  [6,7,8,9,1,2,3,4,5],
                  [7,8,9,1,2,3,4,5,6],
                  [8,9,1,2,3,4,5,6,7],
                  [9,1,2,3,4,5,6,7,8]
                ]
              );
  });

  it('should test whether a number appears in the row more than once', function() {
    expect(grid.checkRows()).toEqual(false);
  });
  it('should test whether a number appears in the column more than once', function() {
    expect(grid.checkColumns()).toEqual(false);
  });
  it('should test whether a number appears in the small grid more than once', function() {
    expect(grid.checkGrids()).toEqual(false);
  });
});

describe('Test invalid rows', function() {
  var grid;
  beforeEach(function (){
    grid = new Grid ([
      [4,8,3,9,2,1,6,5,7],
      [9,6,7,3,4,5,8,2,1],
      [2,5,1,8,7,6,4,9,3],
      [5,4,8,1,3,2,9,7,6],
      [7,2,9,5,6,4,2,3,8],
      [1,3,6,7,9,8,1,4,5],
      [3,7,2,6,8,9,5,1,4],
      [8,1,4,2,5,3,7,6,9],
      [6,9,5,4,1,7,3,8,2]
    ]);
  });

  it('should test whether a number appears in the row more than once', function() {
    expect(grid.checkRows()).toEqual(false);
  });
  it('should test whether a number appears in the column more than once', function() {
    expect(grid.checkColumns()).toEqual(true);
  });
  it('should test whether a number appears in the small grid more than once', function() {
    expect(grid.checkGrids()).toEqual(true);
  });
});

describe('Test invalid columns', function() {
  var grid;
  beforeEach(function (){
    grid = new Grid ([
      [4,8,3,9,2,1,6,5,7],
      [9,6,7,3,4,5,8,1,2],
      [2,5,1,8,7,6,4,9,3],
      [5,4,8,1,3,2,9,7,6],
      [7,2,9,5,6,4,1,3,8],
      [1,3,6,7,9,8,2,4,5],
      [3,7,2,6,8,9,5,1,4],
      [8,1,4,2,5,3,7,6,9],
      [6,9,5,4,1,7,3,8,2]
    ]);
  });

  it('should test whether a number appears in the row more than once', function() {
    expect(grid.checkRows()).toEqual(true);
  });
  it('should test whether a number appears in the column more than once', function() {
    expect(grid.checkColumns()).toEqual(false);
  });
  it('should test whether a number appears in the small grid more than once', function() {
    expect(grid.checkGrids()).toEqual(true);
  });
});

describe('Test valid puzzle', function() {
  let grid;
  beforeEach(function (){
    grid = new Grid ([
      [4,8,3,9,2,1,6,5,7],
      [9,6,7,3,4,5,8,2,1],
      [2,5,1,8,7,6,4,9,3],
      [5,4,8,1,3,2,9,7,6],
      [7,2,9,5,6,4,1,3,8],
      [1,3,6,7,9,8,2,4,5],
      [3,7,2,6,8,9,5,1,4],
      [8,1,4,2,5,3,7,6,9],
      [6,9,5,4,1,7,3,8,2]
    ]);
  });

  it('should test whether a number appears in the row more than once', function() {
    expect(grid.checkRows()).toEqual(true);
  });
  it('should test whether a number appears in the column more than once', function() {
    expect(grid.checkColumns()).toEqual(true);
  });
  it('should test whether a number appears in the small grid more than once', function() {
    expect(grid.checkGrids()).toEqual(true);
  });
});


describe('Test unsolved solved puzzle', function() {
  let grid;
  beforeEach(function (){
    grid = new UnsolvedGrid ([
      [4,8,3,9,2,1,6,5,7],
      [9,6,7,3,4,5,8,2,1],
      [2,5,1,8,7,6,4,9,3],
      [5,4,8,1,3,2,9,7,6],
      [7,2,9,5,6,4,1,3,8],
      [1,3,6,7,9,8,2,4,5],
      [3,7,2,6,8,9,5,1,4],
      [8,1,4,2,5,3,7,6,9],
      [6,9,5,4,1,7,3,8,2]
    ]);
  });

  it('should have an empty array of open numbers', function() {
    expect(grid.openNumbers).toEqual([]);

  });
  it('should not have any open indices', function() {
    expect(grid.openIdx).toEqual([]);
  });
});

describe('Test unsolved puzzle', function() {
  let grid;
  beforeEach(function (){
    grid = new UnsolvedGrid ([
      [4,8,3,9,2,0,0,5,0],
      [9,0,0,3,4,5,8,0,1],
      [2,5,1,0,7,6,4,9,3],
      [5,4,0,1,3,2,9,7,0],
      [7,0,9,5,6,0,0,3,8],
      [1,0,6,7,9,8,2,4,0],
      [0,7,0,6,8,0,5,1,4],
      [0,0,4,2,5,0,7,0,9],
      [6,9,0,4,1,7,3,8,2]
    ]);
  });

  it('should have an filled array of open numbers', function() {
    expect(grid.openNumbers).not.toEqual([]);

  });
  it('should have many open indices', function() {
    expect(grid.openIdx).not.toEqual([]);
  });
});

describe('test fillInRandom', function() {
    let grid;
    beforeEach(function functionName() {
      grid = new UnsolvedGrid ([
        [4,8,3,9,2,0,0,5,0],
        [9,0,0,3,4,5,8,0,1],
        [2,5,1,0,7,6,4,9,3],
        [5,4,0,1,3,2,9,7,0],
        [7,0,9,5,6,0,0,3,8],
        [1,0,6,7,9,8,2,4,0],
        [0,7,0,6,8,0,5,1,4],
        [0,0,4,2,5,0,7,0,9],
        [6,9,0,4,1,7,3,8,2]
      ]);
      grid.fillInRandom();
    })
    it('should fill grid with random numbers from open numbers array and not contain any zeros', function() {
      grid.rows.forEach(function(row){
        expect(row.includes(0)).toEqual(false);
      })
      // expect(grid.rows[0].includes(0)).toEqual(false);
    })
})

describe('test fillInRandom', function() {
    let grid;
    beforeEach(function functionName() {
      grid = new UnsolvedGrid ([
        [4,8,3,9,2,0,0,5,0],
        [9,0,0,3,4,5,8,0,1],
        [2,5,1,0,7,6,4,9,3],
        [5,4,0,1,3,2,9,7,0],
        [7,0,9,5,6,0,0,3,8],
        [1,0,6,7,9,8,2,4,0],
        [0,7,0,6,8,0,5,1,4],
        [0,0,4,2,5,0,7,0,9],
        [6,9,0,4,1,7,3,8,2]
      ]);
      grid.fillInRandom();
    })
    it('should fill grid with random numbers from open numbers array and not contain any zeros', function() {
      grid.rows.forEach(function(row){
        expect(row.includes(0)).toEqual(false);
      })
    })
})
