export function Grid () {
  this.rows = [
                [1,2,3,4,5,6,7,8,9],
                [2,3,4,5,6,7,8,9,1],
                [3,4,5,6,7,8,9,1,2],
                [4,5,6,7,8,9,1,2,3],
                [5,6,7,8,9,1,2,3,4],
                [6,7,8,9,1,2,3,4,5],
                [7,8,9,1,2,3,4,5,6],
                [8,9,1,2,3,4,5,6,7]
              ];
}

Grid.prototype.gridChecker = function(){
  var result = true;
  result = this.checkRows();
  result = this.checkColumns();
  result = this.checkGrids();
  return result
}

Grid.prototype.checkGrids = function(){
  var result = true;
  for (let y = 0; y < 1; ++y) {
    for (let x = 0; x < 1; ++x){
      result = this.checkGrid(y*3, x*3);
    }
  }
  return result;
}

Grid.prototype.checkGrid = function(startY, startX){
  var gridNums = []
  for (let y = startY; y < startY+3; ++y) {
    for (let x = startX; x < startX+3; ++x){
      if(gridNums.includes(this.rows[y][x])){
        return false;
      }
      gridNums.push(this.rows[y][x])
    }
  }
  return true;
}

Grid.prototype.checkRows = function(){
  var result = true;
  this.rows.forEach(function(row){
    for(let i = 0; i < 3; ++i){
      if(row[i] !== -1){
        if(row.slice(0, i).includes(row[i]) || row.slice(i+1, row.length).includes(row[i]))
          result = false;
      }
    }
  })
  return result;
}

Grid.prototype.checkColumns = function () {
  var result = true;
  for(let i = 0; i < 3; ++i){
    var columnNums = []
    this.rows.forEach(function(row){
      if(columnNums.includes(row[i])){
        result = false;
      }
      if(row[i] !== -1)
        columnNums.push(row[i])
    })
  }
  return result;


}
