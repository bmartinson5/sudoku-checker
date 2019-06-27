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

function checkErrors(){
  const duplicateIdx = new Set();
  const rowId = $(".selected-cell")[0].id[0];
  let row = userGrid.rows[rowId];

  if (!userGrid.checkRows()) {
    for (var i = 0; i < row.length; i++) {
      for (var x = i+1; x < row.length; x++) {
        if(row[x] === row[i] && row[i] !== 0){
          duplicateIdx.add(i);
          duplicateIdx.add(x);
        }
      }
    }
    $(".selected-cell").parent().addClass("highlight-error");
  } else {
    $(".selected-cell").parent().removeClass("highlight-error");
  }

  for (var i = 0; i < row.length; i++) {
    if (duplicateIdx.has(i)) {
      $("#"+rowId+i).addClass("highlight-error-box");
    } else {
      $("#"+rowId+i).removeClass("highlight-error-box");
    }
  }
}

$(document).ready(function(){
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
  //   [4,2,1],
  //   [2,1,2],
  //   [3,5,0]
  // ]

  $("td").click(function(){
    $("td").removeClass("highlight-cell-border")
    $("td").removeClass("selected-cell")
    $(this).addClass("highlight-cell-border")
    $(this).addClass("selected-cell")
    $(function() {
      $(this).focus();
    });
  })

  $(document).keyup(function(e){
    if(e.keyCode === 8 || e.keyCode === 46){
      const id = $(".selected-cell")[0].id;
      $(".selected-cell").text("")
      userGrid.rows[id[0]][id[1]] = 0;
      checkErrors();
    }
    console.log(e.keyCode);
  });

  $(document).keydown(function(e){
    if (!$(".selected-cell")[0]) {
      return;
    }
    const boxNumber = e.keyCode-48;
    if(1 <= boxNumber && boxNumber <= 9){
      $(".selected-cell").text(boxNumber);
      const id = $(".selected-cell")[0].id;

      userGrid.rows[id[0]][id[1]] = boxNumber;
      checkErrors();
      console.log(userGrid.gridChecker());
            console.log(userGrid.rows);
    }
  });


})
