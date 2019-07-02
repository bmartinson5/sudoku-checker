import  { Grid } from './grid.js'
export default class UnsolvedGrid {
  constructor(rows){
    this.rows = [];
    //deep copy of rows
    rows.forEach(function(row){
      this.rows.push(row.slice())
    }, this)

    this.openIdx = [];
    this.openNumbers = [];

    //initialize openIdx and openNumbers
    this.findOpenIdx();
  }

  findOpenIdx(){
    //finds all 0's in grid that represent unfilled indexes
    this.rows.forEach((row, idY) => {
      row.forEach((box, idX) => {
        if(box === 0){
          this.openIdx.push([idY, idX]);
        }
      });
    })
  }


  fillSpotOptions(){
    //fill grid with arr of 1-9 to represent possible choices for each spot
    let spotOptions = []
    for(let i = 0; i < 9; i++) {
      spotOptions.push([])
      for (let x = 0; x < 9; x++) {
        spotOptions[i].push([]);
        for (let r = 1; r < 10; r++){
          spotOptions[i][x].push(r);
        }
      }
    }
    return spotOptions;
  }

  fillInRandom(){
    let isPossibleSolution = true;
    let spotOptions = this.fillSpotOptions();


    for (let r = 0; r < this.openIdx.length; r++){
      let foundNumToFillBox = false;
      let idxY = this.openIdx[r][0];
      let idxX = this.openIdx[r][1];
      let currentValueAtIdx = this.rows[idxY][idxX];
      let currentSpotOpt = spotOptions[idxY][idxX];
      if(currentValueAtIdx !== 0){
        this.rows[idxY][idxX] = 0;
        //the number put in previously didn't work  - remove it from spotOptions
        spotOptions[idxY][idxX][currentValueAtIdx-1] = 0;
      }
      for (let i=0; i < currentSpotOpt.length; i++) {
        let theNumToTry = currentSpotOpt[i];
        if(theNumToTry === 0) continue //previously tried number

        if(
            !this.checkGridForNum([idxY, idxX], theNumToTry) //check Grid
            && !this.rows[idxY].includes(theNumToTry) //check row
            && !this.checkColForNum(idxX, theNumToTry) //check Column
          ){
          //the num works for now, add to grid
          this.rows[idxY][idxX] = theNumToTry;
          foundNumToFillBox = true;
          break;
        }
      }
      if (!foundNumToFillBox) {
        //backTracking
        spotOptions[idxY][idxX] = [1,2,3,4,5,6,7,8,9];
        r -= 2;
      }
    }

    return isPossibleSolution;
  }

  checkColForNum(colNum, theNum){
    let found = false
    this.rows.forEach(function(row){
      if(row[colNum] === (theNum)){
        found = true
        return
      }
    })
    return found
  }

  checkGridForNum(idxToCheck, theNum){
    const possibleStartingPoints = [0,3,6]
    let found = false;
    let startingY;
    let startingX;
    possibleStartingPoints.forEach(function(startingPoint){
      if(idxToCheck[0] >= startingPoint){
        startingY = startingPoint;
      }
      if(idxToCheck[1] >= startingPoint){
        startingX = startingPoint;
      }
    })

    for (let y = startingY; y < startingY+3; y++) {
      for (let x = startingX; x < startingX+3; x++) {
        // console.log("checking", x, y, theNum, this.rows[y][x]);
        if(theNum === this.rows[y][x]){
          return true;
        }
      }
    }
    // console.log("start y, x:", startingY, startingX);
    return found;

  }


  solve() {
    let count = 1;
    let gridToCheck;
    do{
      let solvingGrid = new UnsolvedGrid(this.rows);
      if (solvingGrid.fillInRandom()){
        gridToCheck = new Grid(solvingGrid.rows)
        // if(gridToCheck.checkGrids()){
        //   console.log("Found valid puzzle");
        //   break;
        // }
        break;
      }
    } while(++count <= 100000);

    return gridToCheck;
  }
};
