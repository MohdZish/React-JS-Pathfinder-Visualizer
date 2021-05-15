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
      startgrid[row][col] = [0,0,0]; // first is Type, second: X of previous node; third : Y of previous node
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
        newArr[row][col] = [0,0,0];
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


  // Understanding Dijkstra : 
  // https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
  // https://levelup.gitconnected.com/dijkstras-shortest-path-algorithm-in-a-grid-eb505eb3a290
  // https://stackoverflow.com/questions/56609206/how-do-i-keep-track-of-the-shortest-paths-in-the-dijkstra-algorithm-when-using-a
  async function DijkstraAlgorithm() {
    const startRow = startendpos[0]; // row number of start
    const startCol = startendpos[1]; // col number of start
    const endRow = startendpos[2];
    const endCol = startendpos[3];

    var newArray = [...maingrid]; //clone maingrid 
    
    // Giving value of 1 for all the nodes except start which gets 0
    for (var row = 0; row < rownumbers; row++) {
      for (var col = 0; col < colnumbers; col++) {
        newArray[row][col][1] = 1;
      }
    }
    newArray[startRow][startCol][1] = 0;

    // IMPORTANT :
    // dataStack contains : 
    // minimum distance with each node, 
    // Position X of this node, 
    // Position Y of this node, 
    // Position X of previous node (current node),
    // Position Y of previous node (current node),
    var dataStack = [];

    var currentPosX = startRow;
    var currentPosY = startCol;

    // Minimum distance currently to Start
    var currentMinimum = 0;
    var visitedNodes = [];
    // add start node as visited
    visitedNodes.push(startRow + ":" + startCol)

    // 3,15,15,19               -              1,1,1,1
    // min 3 so pos 3           -              min 1 so pos of 1
    // surrounding : 10 ,13, 18 -              surround : 1, 1, 1, 1
    // Add + 3 (prev Value)     -              
    // new vals : 13, 16, 21    -              new vals : 2,2,2
    // Replace 3 by new vals    -              2,2,2, 1, 1, 1             
    // Table Ascending order    -
    // 13,15,15,16,19,21        -              1, 1, 1, 2, 2, 2 

    var goalreached = false;
    
    var testVal = 0;

    var dur = 0;
    
    while(goalreached === false){
      
      testVal++;
      dataStack.shift(); // remove first value cuz we need to replace it by these following three !
      
      
      if(visitedNodes.includes((currentPosX-1) + ":" + currentPosY)  === false && currentPosX-1 >= 0 && isWall(currentPosX-1, currentPosY) == false ){
        dataStack.unshift([1 + currentMinimum, currentPosX-1, currentPosY, currentPosX, currentPosY]); // 1 IS NODE WEIGHTTTTT
        newArray[currentPosX-1][currentPosY][0] = 4;
        newArray[currentPosX-1][currentPosY][1] = currentPosX;
        newArray[currentPosX-1][currentPosY][2] = currentPosY;
      }
      if(visitedNodes.includes(currentPosX + ":" + (currentPosY-1) ) === false && currentPosY-1 >= 0 && isWall(currentPosX, currentPosY-1) == false ){
        dataStack.unshift([1 + currentMinimum, currentPosX, currentPosY-1, currentPosX, currentPosY]);
        newArray[currentPosX][currentPosY-1][0] = 4;
        newArray[currentPosX][currentPosY-1][1] = currentPosX;
        newArray[currentPosX][currentPosY-1][2] = currentPosY;
      }
      if(visitedNodes.includes((currentPosX+1) + ":" + currentPosY)  === false && currentPosX+1 < rownumbers && isWall(currentPosX+1, currentPosY) == false ){
        dataStack.unshift([1 + currentMinimum, currentPosX+1, currentPosY, currentPosX, currentPosY]);
        newArray[currentPosX+1][currentPosY][0] = 4;
        newArray[currentPosX+1][currentPosY][1] = currentPosX;
        newArray[currentPosX+1][currentPosY][2] = currentPosY;
      }
      if(visitedNodes.includes(currentPosX + ":" + (currentPosY+1))  === false && currentPosY+1 < colnumbers && isWall(currentPosX, currentPosY+1) == false){
         dataStack.unshift([1 + currentMinimum, currentPosX, currentPosY+1, currentPosX, currentPosY]);
         newArray[currentPosX][currentPosY+1][0] = 4;
         newArray[currentPosX][currentPosY+1][1] = currentPosX;
         newArray[currentPosX][currentPosY+1][2] = currentPosY;
      }
      
      //if(testVal > 500){
        
        

        //}
      
     
      // sort dataStack by ascendig order
      var a = performance.now();
      dataStack = dataStack.sort(function(a,b) {return a[0]-b[0]});
      var b = performance.now();
      // 0 cuz ascending order so minimum is always in 0
      var minimumPosX = dataStack[0][1];
      var minimumPosY = dataStack[0][2];
      currentPosX = minimumPosX;
      currentPosY = minimumPosY;

      // update minimum
      currentMinimum = dataStack[0][0];

      visitedNodes.push(currentPosX + ":" + currentPosY)

      if(currentPosX == endRow && currentPosY == endCol){
        goalreached = true;
      }

      var wait = 0;
      await sleep((0.5));
      //updateGrid([...newArray]);
      
      
      
    }
    
    dur = (b - a);
    alert('It took ' + dur + ' ms.');

    alert(currentMinimum)
    alert(dataStack.length)

    // Tracing back from target to start the SHORTEST PATH
    var ShortestPath = [];
    var prevToTargetX = maingrid[endRow][endCol][1];
    var prevToTargetY = maingrid[endRow][endCol][2];
    ShortestPath.push([prevToTargetX , prevToTargetY])
   // alert(prevToTargetX + ":" + prevToTargetY)
    var startreached = false;

   // alert(maingrid[prevToTargetX][prevToTargetY][2]) 

   // IMPORTANT : you can remove this method if FASTER solution needed - directly apply color in this method
    while(startreached === false){
      if(prevToTargetX == 0 && prevToTargetY == 0){
        startreached = true;
        break;
      }
      var cur = newArray[prevToTargetX][prevToTargetY];
      prevToTargetX = cur[1];
      prevToTargetY = cur[2];

      ShortestPath.push([prevToTargetX , prevToTargetY]);
    }

    ShortestPath.pop(); // remove last value 0,0 .

    // Apply Final Path color !!!
    for(var i = 0; i< ShortestPath.length; i++){
      newArray[ShortestPath[i][0]][ShortestPath[i][1]][0] = 5;
    }
    
    // Get the Final distance between Start to Target Node
    var finalDistance = ShortestPath.length;

    
    updateGrid([...newArray]);
    
  }

  // TRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY 2
  async function DijkstraAlgorithm2() {
    const startRow = startendpos[0]; // row number of start
    const startCol = startendpos[1]; // col number of start
    const endRow = startendpos[2];
    const endCol = startendpos[3];

    var newArray = [...maingrid]; //clone maingrid 
    
    // Giving value of 1 for all the nodes except start which gets 0
    for (var row = 0; row < rownumbers; row++) {
      for (var col = 0; col < colnumbers; col++) {
        newArray[row][col][1] = 1;
      }
    }
    newArray[startRow][startCol][1] = 0;

    // IMPORTANT :
    // dataStack contains : 
    // minimum distance with each node, 
    // Position X of this node, 
    // Position Y of this node, 
    // Position X of previous node (current node),
    // Position Y of previous node (current node),
    var dataStack = [];

    var currentPosX = startRow;
    var currentPosY = startCol;

    // Minimum distance currently to Start
    var currentMinimum = 0;
    var visitedNodes = [];
    // add start node as visited
    visitedNodes.push(startRow + ":" + startCol)

    // 3,15,15,19               -              1,1,1,1
    // min 3 so pos 3           -              min 1 so pos of 1
    // surrounding : 10 ,13, 18 -              surround : 1, 1, 1, 1
    // Add + 3 (prev Value)     -              
    // new vals : 13, 16, 21    -              new vals : 2,2,2
    // Replace 3 by new vals    -              2,2,2, 1, 1, 1             
    // Table Ascending order    -
    // 13,15,15,16,19,21        -              1, 1, 1, 2, 2, 2 

    var goalreached = false;
    
    var testVal = 0;

    while(goalreached === false){
      testVal++;
      dataStack.shift(); // remove first value cuz we need to replace it by these following three !
      var a = performance.now();


      var tempArray = [];

      if(visitedNodes.includes((currentPosX-1) + ":" + currentPosY)  === false && currentPosX-1 >= 0 && isWall(currentPosX-1, currentPosY) == false ){
        tempArray.unshift([15 + currentMinimum, currentPosX-1, currentPosY, currentPosX, currentPosY]);
      }
      if(visitedNodes.includes(currentPosX + ":" + (currentPosY-1) ) === false && currentPosY-1 >= 0 && isWall(currentPosX, currentPosY-1) == false ){
        tempArray.unshift([17 + currentMinimum, currentPosX, currentPosY-1, currentPosX, currentPosY]);

      }
      if(visitedNodes.includes((currentPosX+1) + ":" + currentPosY)  === false && currentPosX+1 < rownumbers && isWall(currentPosX+1, currentPosY) == false ){
        tempArray.unshift([22 + currentMinimum, currentPosX+1, currentPosY, currentPosX, currentPosY]);

      }
      if(visitedNodes.includes(currentPosX + ":" + (currentPosY+1))  === false && currentPosY+1 < colnumbers && isWall(currentPosX, currentPosY+1) == false){
        tempArray.unshift([10 + currentMinimum, currentPosX, currentPosY+1, currentPosX, currentPosY]);
      }
      

      tempArray = tempArray.sort(function(a,b) {return a[0]-b[0]});

      dataStack.unshift(tempArray[0]);
      alert(dataStack);
      newArray[dataStack[0][1]][dataStack[0][2]][0] = 4;
      newArray[dataStack[0][1]][dataStack[0][2]][1] = currentPosX;
      newArray[dataStack[0][1]][dataStack[0][2]][2] = currentPosY;

      
      var b = performance.now();
      if(testVal > 500){
      //alert('It took ' + (b - a) + ' ms.');

      }
      
      // sort dataStack by ascendig order
      dataStack = dataStack.sort(function(c,d) {return c[0]-d[0]});
      
      // 0 cuz ascending order so minimum is always in 0
      var minimumPosX = dataStack[0][1];
      var minimumPosY = dataStack[0][2];
      currentPosX = minimumPosX;
      currentPosY = minimumPosY;

      

      // update minimum
      currentMinimum += dataStack[0][0];
     
      visitedNodes.push(currentPosX + ":" + currentPosY)

      if(currentPosX == endRow && currentPosY == endCol){
        goalreached = true;
      }

      var wait = 0;
      await sleep((1));
      updateGrid([...newArray]);
      
    }

    alert(testVal)

    // Tracing back from target to start the SHORTEST PATH
    var ShortestPath = [];
    var prevToTargetX = maingrid[endRow][endCol][1];
    var prevToTargetY = maingrid[endRow][endCol][2];
    ShortestPath.push([prevToTargetX , prevToTargetY])
   // alert(prevToTargetX + ":" + prevToTargetY)
    var startreached = false;

   // alert(maingrid[prevToTargetX][prevToTargetY][2]) 

   // IMPORTANT : you can remove this method if FASTER solution needed - directly apply color in this method
    while(startreached === false){
      if(prevToTargetX == 0 && prevToTargetY == 0){
        startreached = true;
        break;
      }
      var cur = newArray[prevToTargetX][prevToTargetY];
      prevToTargetX = cur[1];
      prevToTargetY = cur[2];

      ShortestPath.push([prevToTargetX , prevToTargetY]);
    }

    ShortestPath.pop(); // remove last value 0,0 .

    // Apply Final Path color !!!
    for(var i = 0; i< ShortestPath.length; i++){
      newArray[ShortestPath[i][0]][ShortestPath[i][1]][0] = 5;
    }
    
    // Get the Final distance between Start to Target Node
    var finalDistance = ShortestPath.length;

    
    updateGrid([...newArray]);
    
  }

  function sleep(time) {
    return new Promise(resolve => setTimeout(()=>resolve(), time));
  }
  
  function isWall(row,col) {
    if(maingrid[row][col][0] == 1){
        return true;
    }
    else{
      return false;
    }
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
      <Dashboard Grid = {maingrid} clearGrid={clearGrid} updateStartBtn={updateStartBtn} updateEndBtn={updateEndBtn} DijkstraAlgorithm={DijkstraAlgorithm} updatethegrid={updatethegrid} checkgrid={checkgrid} />
      <DragDropContext>
        <table className='grid-board '>
            {grid}
        </table>
      </DragDropContext>
      
    </div>
  );
}

export default App;
