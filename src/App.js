import logo from './logo.svg';
import './App.css';
import GridSquare from './Components/GridSquare'
import Dashboard from './Components/Dashboard';
import { useState , useMemo} from 'react';
import { DragDropContext , Droppable } from 'react-beautiful-dnd';
import { VscRunAll } from 'react-icons/vsc';

import {Dijkstra} from './Algorithms/Dijkstra'

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
  }


  // Understanding Dijkstra : 
  // https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
  // https://levelup.gitconnected.com/dijkstras-shortest-path-algorithm-in-a-grid-eb505eb3a290
  // https://stackoverflow.com/questions/56609206/how-do-i-keep-track-of-the-shortest-paths-in-the-dijkstra-algorithm-when-using-a
  // Dijkstra Algorithm - Super optimized
  function DijkstraAlgorithm(){
      Dijkstra(maingrid, updateGrid, isWall, startendpos, rownumbers, colnumbers);
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
