export function Grid (rows) {
  this.rows = [];
  this.duplicateIdx = [];
  rows.forEach(function(row){
    this.rows.push(row.slice())
  }, this)
}

Grid.prototype.gridChecker = function(){
  this.duplicateIdx = [];
  const checkRows = this.checkRows();
  const checkColumns = this.checkColumns();
  const checkGrids = this.checkGrids();
  // return this.checkRows() && this.checkColumns() && this.checkGrids();
  return checkRows && checkColumns && checkGrids;
}

Grid.prototype.checkGrids = function(){
  var result = true;
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 3; ++x){
      result = this.checkGrid(y*3, x*3);
    }
  }
  return result;
}

Grid.prototype.checkGrid = function(startY, startX){
  var gridNums = []
  let result = true;
  for (let y = startY; y < startY+3; ++y) {
    for (let x = startX; x < startX+3; ++x){
      let value = this.rows[y][x];
      if (value !== 0){
        gridNums.push({num:value, idx:[y,x]})
      }
    }
  }

  for (var i = 0; i < gridNums.length; i++) {
    for (var j = i + 1; j < gridNums.length; j++) {
      if (gridNums[i].num === gridNums[j].num) {
        result = false;
        this.duplicateIdx.push(gridNums[i].idx);
        this.duplicateIdx.push(gridNums[j].idx);
      }
    }
  }
  return result;
}

Grid.prototype.checkRows = function(){
  var result = true;
  this.rows.forEach(function(row, rowIdx){
    for(let i = 0; i < row.length; ++i){
      if(row[i] !== 0){
        const dupIdx= row.slice(i+1, row.length).indexOf(row[i]) + i + 1;
        if(dupIdx > i) {
          result = false;
          this.duplicateIdx.push([rowIdx, i]);
          this.duplicateIdx.push([rowIdx, dupIdx]);
        }
      }
    }
  }, this)
  return result;
}

Grid.prototype.checkColumns = function () {
  var result = true;
  for(let colIdx = 0; colIdx < this.rows.length; ++colIdx){
    let col = this.rows.map(function(row){
      return row[colIdx]
    })
    for(let i = 0; i < col.length; ++i){
      if(col[i] !== 0){
        const dupIdx= col.slice(i+1, col.length).indexOf(col[i]) + i + 1;
        if(dupIdx > i) {
          result = false;
          this.duplicateIdx.push([i, colIdx]);
          this.duplicateIdx.push([dupIdx, colIdx]);
        }
        // if(col.slice(i+1, col.length).includes(col[i])) {
        //   result = false;
        //   this.duplicateIdx.push([i, colIdx]);
        // }
      }
    }

  }
  return result;
}
