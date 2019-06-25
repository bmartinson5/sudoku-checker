import  { Grid } from '../src/grid.js';

describe('RowChecker', function() {
  var grid;
  beforeEach(function (){
    grid = new Grid ();
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
