import './styles.css';
import 'bootstrap';
import $ from 'jquery';
import { Grid } from './grid.js'
import UnsolvedGrid  from './UnsolvedGrid.js'

const userGrid = new Grid([
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]

]);

function findDuplicates(arr, id, isCol){
  for (var i = 0; i < arr.length; i++) {
    for (var x = i+1; x < arr.length; x++) {
      if(arr[x] === arr[i] && arr[i] !== 0){
        if (isCol){
          duplicateIdx.push([i,id]);
          duplicateIdx.push([x,id]);
        } else {
          duplicateIdx.push([id,i]);
          duplicateIdx.push([id,x]);
        }
      }
    }
  }
}

function checkErrors() {
  // remove error highlights
  $(".inside-box").removeClass("highlight-error-box");
  $(".row").removeClass("highlight-error");

  // find duplicate boxes and highlight them
  userGrid.gridChecker();
  console.log(userGrid.duplicateIdx);
  userGrid.duplicateIdx.forEach(idx => {
    $("#"+idx[0]+idx[1]).addClass("highlight-error-box");
  });
  return userGrid.duplicateIdx.length;
}

function printGrid(grid){
  grid.rows.forEach(function(row, rowId){
    row.forEach(function(box, colId){
      if(box !== 0)
      $("#"+rowId+colId).text(box)
    })
  })
}

$(document).ready(function(){
  printGrid(userGrid)


  $("td").click(function(){
    $("td").removeClass("highlight-cell-border")
    $("td").removeClass("selected-cell")
    $(this).addClass("highlight-cell-border")
    $(this).addClass("selected-cell")
  })

  $(document).keyup(function(e){
    //for delete and backspace only
    if(e.keyCode === 8 || e.keyCode === 46){
      $(".selected-cell").removeClass('highlight-valid-num')
      const id = $(".selected-cell")[0].id;
      $(".selected-cell").text("")
      userGrid.rows[id[0]][id[1]] = 0;
      checkErrors();
    }
  });

  $(document).keydown(function(e){
    //only prints 1-9 in squaresl
    if (!$(".selected-cell")[0]) {
      return;
    }
    const boxNumber = e.keyCode-48;
    if(1 <= boxNumber && boxNumber <= 9){
      $(".selected-cell").text(boxNumber);
      $(".selected-cell").addClass('highlight-valid-num')
      const id = $(".selected-cell")[0].id;

      userGrid.rows[id[0]][id[1]] = boxNumber;
      checkErrors();

    }
  });

  $(".solve").click(function(){
    $(".warn-errors").hide();
    let gridToSolve = new UnsolvedGrid(userGrid.rows)
    let solvedGrid;
    console.log(checkErrors());
    if(checkErrors() === 0)
      solvedGrid = gridToSolve.solve();
    else{
      $(".warn-errors").show();
    }

    if(solvedGrid){
      userGrid.rows = solvedGrid.rows;
      printGrid(solvedGrid);

    }
  })

})
// const startingGrid = [
//   [7,0,0,0,0,4,2,0,0],
//   [0,3,0,0,2,0,0,4,0],
//   [9,0,0,0,0,0,7,0,0],
//   [0,0,1,0,0,0,0,0,9],
//   [0,6,0,0,8,0,0,5,0],
//   [2,0,0,0,0,0,6,0,0],
//   [0,0,6,0,0,0,0,0,3],
//   [0,2,0,0,1,0,0,8,0],
//   [0,0,3,8,0,0,0,0,7]
// ]

// const startingGrid = [
//   [0,8,3,0,0,0,0,5,0],
//   [9,0,0,3,4,5,8,0,1],
//   [2,5,1,0,7,6,0,9,3],
//   [5,4,0,1,0,0,9,7,0],
//   [7,0,9,5,6,0,0,3,8],
//   [1,0,6,7,0,8,2,4,0],
//   [0,7,0,6,8,0,5,1,4],
//   [0,0,0,2,5,0,7,0,0],
//   [6,0,0,4,1,7,3,8,0]
// ]

// const startingGrid = [
//   [4,8,3,9,2,1,6,5,7],
//   [0,6,7,3,4,5,0,2,1],
//   [2,5,1,8,7,6,4,9,3],
//   [5,4,8,0,3,2,9,7,6],
//   [7,2,9,5,6,4,1,3,8],
//   [1,3,6,7,9,8,2,4,5],
//   [3,7,2,6,8,9,5,0,0],
//   [8,1,4,2,5,3,7,6,0],
//   [6,9,5,4,1,7,3,8,0]
// ]


// const startingGrid = [
//   [0,8,3,0,0,0,0,5,0],
//   [9,0,0,3,4,5,8,0,1],
//   [2,5,1,0,7,6,0,9,3],
//   [5,4,0,1,0,0,9,7,0],
//   [7,0,9,5,6,0,0,3,8],
//   [1,0,6,7,0,8,2,4,0],
//   [0,7,0,6,8,0,5,1,4],
//   [0,0,0,2,5,0,7,0,0],
//   [6,0,0,4,1,7,3,8,0]
// ]

// const userGrid = new Grid([
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0]
// ]);
