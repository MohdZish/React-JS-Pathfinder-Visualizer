
  // Understanding Dijkstra : 
  // https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
  // https://levelup.gitconnected.com/dijkstras-shortest-path-algorithm-in-a-grid-eb505eb3a290
  // https://stackoverflow.com/questions/56609206/how-do-i-keep-track-of-the-shortest-paths-in-the-dijkstra-algorithm-when-using-a
  // Dijkstra Algorithm - Super optimized

export async function Dijkstra(maingrid, updateGrid, isWall, startendpos, rownumbers, colnumbers) {
    const startRow = startendpos[0]; // row number of start
    const startCol = startendpos[1]; // col number of start
    const endRow = startendpos[2];
    const endCol = startendpos[3];

    var newArray = [...maingrid]; //clone maingrid 
    
    // Getting starting positions 
    var currentPosX = startRow;
    var currentPosY = startCol;
    
    // Gathers all visited Nodes so that we wont visit again
    var visitedNodes = [];
    // add start node as visited
    visitedNodes.push(startRow + ":" + startCol) // add startNode cuz no need to visit again

    var distance = []; // Distance of each nodes to start
    var previousNode = []; // Previous Nodes

    // Important
    // VertexSetQ contains distance of Node f/ start , Row number, Column number
    var vertexSetQ = []; 

    var targetreached = false; // check if target is reacher

    for (var row = 0; row < rownumbers; row++) {
      distance[row] = [];
      previousNode[row] = [];
      //vertexSetQ[row] = [];
      for (var col = 0; col < colnumbers; col++) {
        distance[row][col] = Infinity; // first is Type, second: X of previous node; third : Y of previous node
        previousNode[row][col] = [-1,-1]; // first is Type, second: X of previous node; third : Y of previous node
        if(row == startRow && col == startCol){distance[row][col] = 0;}
      }
    }
    vertexSetQ.push([0, startRow, startCol]);

    while(targetreached == false){
      
      vertexSetQ = vertexSetQ.sort(function(a,b) {return a[0]-b[0]});
      var u = vertexSetQ[0];
      vertexSetQ.shift(); // remove the smallest node from stack
      
      var currentPosX = u[1];
      var currentPosY = u[2];
      //alert(currentPosX);
      var weight = 1; // Change weight if necessary

      // if target is reached, stop everything
      if(currentPosX === endRow && currentPosY === endCol){
        targetreached = true;
        break;
      }
      
      // add this current node to visited
      visitedNodes.push(currentPosX + ":" + currentPosY)
      
      if(visitedNodes.includes((currentPosX-1) + ":" + currentPosY)  === false && currentPosX-1 >= 0 && isWall(currentPosX-1, currentPosY) == false ){
        var alt = distance[currentPosX][currentPosY] + weight;
        if(alt < distance[currentPosX-1][currentPosY]){
          distance[currentPosX-1][currentPosY] = alt;
          previousNode[currentPosX-1][currentPosY] = [currentPosX, currentPosY];
          vertexSetQ.unshift([distance[currentPosX-1][currentPosY],currentPosX-1,currentPosY])
          newArray[currentPosX-1][currentPosY][0] = 4;
        }
      }

      if(visitedNodes.includes(currentPosX + ":" + (currentPosY-1) ) === false && currentPosY-1 >= 0 && isWall(currentPosX, currentPosY-1) == false ){
        var alt = distance[currentPosX][currentPosY] + weight;
        if(alt < distance[currentPosX][currentPosY-1]){
          distance[currentPosX][currentPosY-1] = alt;
          previousNode[currentPosX][currentPosY-1] = [currentPosX, currentPosY];
          vertexSetQ.unshift([distance[currentPosX][currentPosY-1],currentPosX,currentPosY-1])
          newArray[currentPosX][currentPosY-1][0] = 4;
        }
      }
      if(visitedNodes.includes((currentPosX+1) + ":" + currentPosY)  === false && currentPosX+1 < rownumbers && isWall(currentPosX+1, currentPosY) == false ){
        var alt = distance[currentPosX][currentPosY] + weight;
        if(alt < distance[currentPosX+1][currentPosY]){
          distance[currentPosX+1][currentPosY] = alt;
          previousNode[currentPosX+1][currentPosY] = [currentPosX, currentPosY];
          vertexSetQ.unshift([distance[currentPosX+1][currentPosY],currentPosX+1,currentPosY])
          newArray[currentPosX+1][currentPosY][0] = 4;
        }
      }
      if(visitedNodes.includes(currentPosX + ":" + (currentPosY+1))  === false && currentPosY+1 < colnumbers && isWall(currentPosX, currentPosY+1) == false){
        var alt = distance[currentPosX][currentPosY] + weight;
        if(alt < distance[currentPosX][currentPosY+1]){
          distance[currentPosX][currentPosY+1] = alt;
          previousNode[currentPosX][currentPosY+1] = [currentPosX, currentPosY];
          vertexSetQ.unshift([distance[currentPosX][currentPosY+1],currentPosX,currentPosY+1])
          newArray[currentPosX][currentPosY+1][0] = 4;
        }
      }

      await sleep((1));
      updateGrid([...newArray]);

    }
    
    
    // Backtracking from End Node to Start Node
    var shortestPath = [];
    var btrow = endRow; // backtracking to start
    var btcol = endCol;

    if (typeof previousNode[endRow][endCol] !== 'undefined'){
      while(true){
        if(btrow == startRow && btcol == startCol){
          break;
        }
        shortestPath.unshift([btrow,btcol]);
        var temp = previousNode[btrow][btcol];
        btrow = temp[0];
        btcol = temp[1];
      }
    }
    
    
    for(var i = 0; i< shortestPath.length; i++){
      newArray[shortestPath[i][0]][shortestPath[i][1]][0] = 5;
    }


    updateGrid([...newArray]);
  }

  

  function sleep(time) {
    return new Promise(resolve => setTimeout(()=>resolve(), time));
  }
