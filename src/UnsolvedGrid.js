export default class UnsolvedGrid {
  constructor(rows){
    this.rows = rows;
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
    })
  }

  fillInRandom(){
    this.scrambleOpenNumbers();
    console.log(this.openNumbers);
    this.openIdx.forEach(function(idxPair, idx){
      this.rows[idxPair[0]][idxPair[1]] = this.openNumbers[idx];
    })
    console.log(this.rows);
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
