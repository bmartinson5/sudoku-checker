export function Grid (rows) {
  this.rows = rows

}

Grid.prototype.gridChecker = function(){
  return this.checkRows() && this.checkColumns() && this.checkGrids();
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
    for(let i = 0; i < row.length; ++i){
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
  for(let i = 0; i < this.rows.length; ++i){
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
