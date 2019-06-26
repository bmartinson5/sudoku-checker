import './styles.css';
import 'bootstrap';
import $ from 'jquery';
import { Grid } from './grid.js'
import UnsolvedGrid  from './UnsolvedGrid.js'

$(document).ready(function(){
  const startingGrid = [
    [4,8,3,9,2,0,0,5,0],
    [9,0,0,3,4,5,8,0,1],
    [2,5,1,0,7,6,4,9,3],
    [5,4,0,1,3,2,9,7,0],
    [7,0,9,5,6,0,0,3,8],
    [1,0,6,7,9,8,2,4,0],
    [0,7,0,6,8,0,5,1,4],
    [0,0,4,2,5,0,7,0,9],
    [6,9,0,4,1,7,3,8,2]
  ]

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
  let count = 1;
  let gridToCheck;
  do{
    console.log("try number", count++)
    let solvingGrid = new UnsolvedGrid(startingGrid);
    if (solvingGrid.fillInRandom()){
      // console.log("startingGrid", startingGrid);
      gridToCheck = new Grid(solvingGrid.rows)
      if(gridToCheck.gridChecker()){
        console.log("Found valid puzzle");
        break;
      }
    }
  }
  while(count <= 500000);
  console.log(gridToCheck);
})
