import  { Grid } from './grid.js'
export default class UnsolvedGrid {
  constructor(rows){
    this.rows = [];
    rows.forEach(function(row){
      this.rows.push(row.slice())
    }, this)
    this.openIdx = [];
    this.openNumbers = [];
    this.findOpenIdx();
    this.findOpenNumbers();
  }

  findOpenIdx(){
    this.rows.forEach((row, idY) => {
      row.forEach((box, idX) => {
        if(box === 0){
          this.openIdx.push([idY, idX]);
        }
      });
    })
  }

  findOpenNumbers(){
    const numberCounts = new Map([[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]]);
    this.rows.forEach((row, idY) => {
      row.forEach((box, idX) => {
        numberCounts.set(box, numberCounts.get(box) + 1);
      });
    });
    numberCounts.forEach((count, number) => {
      for (let i = 0; i < 9 - count; i++) {
        if(number > 0)
          this.openNumbers.push(number);
      }
    })
  }

  scrambleOpenNumbers() {
    const openNumbersCount = this.openNumbers.length;
    this.openNumbers.forEach(function(openNumber, idx){
      const randIdx = Math.floor(Math.random() * openNumbersCount);
      this.openNumbers[idx] = this.openNumbers[randIdx];
      this.openNumbers[randIdx] = openNumber;
    }, this)
    return this.openNumbers;
  }

  fillInRandom(){
    const scrambledNums = this.scrambleOpenNumbers().slice()

    let isPossibleSolution = true;
    this.openIdx.forEach(function(idxPair, idx){
      let foundNumToFillBox = false;
      for (let i=0; i<scrambledNums.length; i++) {
        if(!this.rows[idxPair[0]].includes(scrambledNums[i]) && !this.checkColForNum(idxPair[1], scrambledNums[i])){
          this.rows[idxPair[0]][idxPair[1]] = scrambledNums.splice(i, 1)[0];
          foundNumToFillBox = true;
          break;
        }
      }
      if (!foundNumToFillBox) {
        isPossibleSolution = false;
        return
      }
    }, this)
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

  solve() {
    let count = 1;
    let gridToCheck;
    do{
      let solvingGrid = new UnsolvedGrid(this.rows);
      if (solvingGrid.fillInRandom()){
        // console.log("startingGrid", startingGrid);
        gridToCheck = new Grid(solvingGrid.rows)
        if(gridToCheck.checkGrids()){
          console.log("Found valid puzzle");
          break;
        }
      }
      // if (++count % 1000 === 0) {
      //   console.log("try" + count);
      // }
    } while(count <= 500000);
    console.log(gridToCheck);

    return gridToCheck;
  }
};

// export function UnsolvedGrid(rows){
//     this.rows = rows;
//     this.openIdx = [];
//     this.openNumbers = [];
//     this.findOpenIdx();
//     this.findOpenNumbers();
// }
//
//   UnsolvedGrid.prototype.findOpenIdx = function(){
//     this.rows.forEach((row, idY) => {
//       row.forEach((box, idX) => {
//         if(box === 0){
//           this.openIdx.push([idY, idX]);
//         }
//       })
//     });
//   };
//
//   UnsolvedGrid.prototype.findOpenNumbers = function(){
//     const numberCounts = new Map([[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]]);
//     this.rows.forEach((row, idY) => {
//       row.forEach((box, idX) => {
//         numberCounts.set(box, numberCounts.get(box) + 1);
//       });
//     });
//     console.log(numberCounts);
//     numberCounts.forEach((count, number) => {
//       if (number > 0) {
//         for (let i = 0; i < 9 - count; i++) {
//           this.openNumbers.push(number);
//         }
//       }
//     })
//   };
