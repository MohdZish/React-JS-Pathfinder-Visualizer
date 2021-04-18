import logo from './logo.svg';
import './App.css';
import GridSquare from './Components/GridSquare'
import Dashboard from './Components/Dashboard';
import { useState , useMemo} from 'react';
import { DragDropContext , Droppable } from 'react-beautiful-dnd';
import { VscRunAll } from 'react-icons/vsc';

function App() {

  //Creating The Grid Matrix
  const rownumbers = 40;
  const colnumbers = 40;

  // Grid Nodes has Two Values : [0] is Value, [1] is CurrentWeight
  var startgrid = []; //Matrix to start
  for (var row = 0; row < rownumbers; row++) {
    startgrid[row] = [];
    for (var col = 0; col < colnumbers; col++) {
      startgrid[row][col] = [0,1];
    }
  }

  //The Grid State
  const [maingrid, updateGrid] = useState(useMemo(() => startgrid));

  // Default Start Position with State [startX, startY, endX, endY]
  const [startendpos, updateStartEndPos] = useState(useMemo(() => [5,10,7,12]));

  // Toggle Start/End/Bomb Buttons
  const [StartBtnclicked, updateStartBtn] = useState(false);
  const [EndBtnclicked, updateEndBtn] = useState(false);
 
  // Function to update Grid (called from GridSquare click)
  const updatethegrid = (row, col, value) =>  {
    maingrid[row][col][0] = value;
  }

  //Function to TEST
  const checkgrid = () => {
    console.log(maingrid)
  }

  //Function to CLEAR Grid : 
  const clearGrid = () => {
    const newArr = [];
    for (var row = 0; row < rownumbers; row++) {
      newArr[row] = [];
      for (var col = 0; col < colnumbers; col++) {
        newArr[row][col] = [0,0];
      }
    }
    updateGrid([...newArr])
  }

  const createWeight = () => {
      const newGrid = [...maingrid]; // clone maingrid

      const startposRow = startendpos[0];
      const startposCol = startendpos[1];

      for (var row = 0; row < rownumbers; row++) {
        for (var col = 0; col < colnumbers; col++) {
          newGrid[row][col][1] = Math.abs(startposRow - row) + Math.abs(startposCol - col);
        }
      }
 
      updateGrid([...newGrid])
  }

  const distanceUpgrade = (row, col, visited) => {
    if(!visited.includes([row-1,col])){
      maingrid[row-1][col][1] = 1;
    }

    var checkTest = [row-1,col];
    if(!visited.includes(checkTest)){
      maingrid[row-1][col][1] = 1;
    }
    checkTest = [row,col+1];
    if(!visited.includes(checkTest)){
      maingrid[row][col+1][1] = 1;
    }
    checkTest = [row,col-1];
    if(!visited.includes(checkTest)){
      maingrid[row][col-1][1] = 1;
    }
    checkTest = [row+1,col];
    
    alert(visited.includes(checkTest))

    if(!visited.includes(checkTest)){
      maingrid[row+1][col][1] = 1;
    }

    updateGrid([...maingrid])
  }

  const DijkstraShortest = () => {
    createWeight();

    const startRow = startendpos[0];
    const startCol = startendpos[1];
    const endRow = startendpos[2];
    const endCol = startendpos[3];

    var endReached = false;

    var visited = []

    var Q = [];

    visited.push(startRow + " " + startCol)
    //alert(visited.includes(startRow + " " + startCol))
    while (!endReached){

        endReached = true;
    }

  }  
  








  const initialDistance = () => {
    const newGrid = [...maingrid]; // clone maingrid

    const startposRow = startendpos[0];
    const startposCol = startendpos[1];

    for (var row = 0; row < rownumbers; row++) {
      for (var col = 0; col < colnumbers; col++) {
        newGrid[row][col][1] = Infinity;
      }
    }

    newGrid[startposRow][startposCol][1] = 0;
 

    updateGrid([...newGrid])
  }

  const updateDistance = (row, col, visitedNodes) => {
    if(visitedNodes[row-1][col] == false){
      maingrid[row-1][col][1] =  1;
    }

    if(visitedNodes[row][col-1] === false){
      maingrid[row][col-1][1] =  1;
    }
    
    if(visitedNodes[row][col+1] === false){
      maingrid[row][col+1][1] =  1;
    }

    if(visitedNodes[row+1][col] === false){
      maingrid[row+1][col][1] =  1;
    }

    updateGrid([...maingrid])

  }

  const Dijkstra = () => {
    initialDistance();

    const startRow = startendpos[0];
    const startCol = startendpos[1];
    const endRow = startendpos[2];
    const endCol = startendpos[3];

    const visitedNodes = [];
    for (var row = 0; row < rownumbers; row++) {
      visitedNodes[row] = [];
      for (var col = 0; col < colnumbers; col++) {
        visitedNodes[row][col] = false;
      }
    }

    updateDistance(startRow, startCol, visitedNodes)

    var endReached = false;

    var curRow = startRow;
    var curCol = startCol;

    var testcount = 0

    while (testcount < 6){
      updateDistance(curRow+testcount, curCol, visitedNodes);
      updateDistance(curRow-testcount, curCol, visitedNodes);
      updateDistance(curRow,curCol-testcount, visitedNodes);
      updateDistance(curRow,curCol+testcount, visitedNodes);

      testcount++;
      
   }

  }

  //Creates Simple MAZE !
  const createMaze = () => {
    maingrid[4][9][0] = 1 ; maingrid[4][10][0] = 1 ; maingrid[4][11][0] = 1 ; maingrid[4][12][0] = 1 ; maingrid[4][13][0] = 1
    maingrid[5][9][0] = 1 ; maingrid[6][10][0] = 1 ; maingrid[6][11][0] = 1 ; maingrid[7][11][0] = 1  
    maingrid[6][9][0] = 1 ; maingrid[8][11][0] = 1 ; maingrid[8][12][0] = 1 ; maingrid[8][13][0] = 1
    maingrid[5][13][0] = 1; maingrid[6][13][0] = 1 ; maingrid[7][13][0] = 1
    
  }


  //createMaze();

  //Function to REFRESH GRID WITH NEW START/END Locations...
  const updateStartEnd = (newrow, newcol, updatewhat) => {
    var newArray = [...maingrid]; //clone maingrid 

    //According to updatewhat: 2 is Start and 3 is End
    //
    if(updatewhat === 2){
      // Erase previous Start with 0
      for (var row = 0; row < rownumbers; row++) {
        for (var col = 0; col < colnumbers; col++) {
          //newArr[row][col] = '0';
          if(newArray[row][col][0] === updatewhat){ //if Start Node then empty it
            newArray[row][col][0] = 0
          }
        }
      }
      var newStartEnd = [...startendpos];
      newStartEnd[0] = newrow;
      newStartEnd[1] = newcol;
      updateStartEndPos([...newStartEnd])
      updateStartBtn(false)
    }
    
    if(updatewhat === 3){
      // Erase previous Start with 0
      for (var row = 0; row < rownumbers; row++) {
        for (var col = 0; col < colnumbers; col++) {
          //newArr[row][col] = '0';
          if(newArray[row][col][0] === updatewhat){
            newArray[row][col][0] = 0
          }
        }
      }
      var newStartEnd = [...startendpos];
      newStartEnd[2] = newrow;
      newStartEnd[3] = newcol;
      updateStartEndPos([...newStartEnd])
      updateEndBtn(false)
    }

    updateGrid([...newArray]);
    createWeight();
  }

 const DjikstraTry = () => {
    var pathArray = [];
    var pathWeights = [];
    var finished = false;
    const startNode = [startendpos[0]+'/'+ startendpos[1]];
    pathArray.push(startNode);

    var sum = 0;

    const startNodeRow = startendpos[0];
    const startNodeCol = startendpos[1];

    pathWeights.push(maingrid[startNodeRow+1][startNodeCol][1]);
    pathWeights.push(maingrid[startNodeRow-1][startNodeCol][1]);
    pathWeights.push(maingrid[startNodeRow][startNodeCol+1][1]);
    pathWeights.push(maingrid[startNodeRow][startNodeCol-1][1]);

    while(sum < 4){
        if(maingrid[startNodeRow+1][startNodeCol][1] <= Math.min(...pathWeights)){
          
        }
        sum++;
    }

    alert(pathWeights)
    alert(pathArray);
  }

/*
  const DjikstraTry2 = () => {
    //Grid
    //Source
    const startRow = startendpos[0];
    const startCol = startendpos[1];

    var visitedVertex = [];
    var distance = [];
    //Initial Fill
    for (var row = 0; row < rownumbers; row++) {
      visitedVertex[row] = [];
      distance[row] = [];
      for (var col = 0; col < colnumbers; col++) {
        visitedVertex[row][col] = false;
        distance[row][col] = Infinity;
      }
    }
    distance[startRow][startCol] = 0;

  

    for(var i = 0; i < rownumbers; i++){
      var u = findMinDistance(distance, visitedVertex);
      visitedVertex[u] = true;

    }


  }*/

  const Djikstra = () => {
   /* const startRow = startendpos[0];
    const startCol = startendpos[1];

    var cost = [];
    var distance = [];
    var pred = [];
    var visited = [];

    var mindistance;
    var nextnode;
    var mindistance;

    for (var row = 0; row < rownumbers; row++) {
      cost[row] = [];
      for (var col = 0; col < colnumbers; col++) {
        //newArr[row][col] = '0';
        if(maingrid[row][col][1] === 1){ //if Start Node then empty it
          cost[row][col] = maingrid[row][col];
        }
        else{
          cost[row][col] = Infinity;
        }
      }
    }


    for (var i = 0; i < rownumbers; i++) {
      distance[i] = cost[startRow][startCol];
      pred[i] = startRow;
      visited[i] = 0;
    }

    distance[startRow] = 0;
    visited[startRow] = 1;
    var count = 1;

    while (count < 10 - 1) {
      mindistance = Infinity;
  
      for (var i = 0; i < 10; i++)
        if (distance[i] < mindistance && !visited[i]) {
          mindistance = distance[i];
          nextnode = i;
        }
  
      visited[nextnode] = 1;
      for (var i = 0; i < 10; i++)
        if (!visited[i])
          if (mindistance + cost[nextnode][i] < distance[i]) {
            distance[i] = mindistance + cost[nextnode][i];
            pred[i] = nextnode;
          }
      count++;
    }
  
    for (var i = 0; i < 10; i++){
      if (i != startRow) {
        alert("\nDistance from source to %d: %d", i, distance[i]);
      }
    }
    
    */
  }

  // Create Grid Display with TABLE :
  var grid = [<></>];
  for (var row = 0; row < rownumbers; row++) {
        //grid[row] = [];
    grid.push(<tr></tr>)
    for (var col = 0; col < colnumbers; col++) {
          grid.push(<td>
            <GridSquare 
              row={row} 
              col={col} 
              maingrid={maingrid}
              updatethegrid={updatethegrid} 
              
              StartBtnclicked={StartBtnclicked} 
              updateStartEnd={updateStartEnd} 
              startendpos={startendpos}
              EndBtnclicked={EndBtnclicked}/>
            </td>)
      }
    }


  return (
    <div className="row" >
      <Dashboard Grid = {maingrid} clearGrid={clearGrid} updateStartBtn={updateStartBtn} updateEndBtn={updateEndBtn} Dijkstra={Dijkstra} updatethegrid={updatethegrid} checkgrid={checkgrid} />
      <DragDropContext>
        <table className='grid-board '>
            {grid}
        </table>
      </DragDropContext>
      
    </div>
  );
}

export default App;
