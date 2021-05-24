
// Some explanations of this Maze Generation algorithm
//http://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm
// https://stackoverflow.com/questions/23530756/maze-recursive-division-algorithm-design

var outborder = false;

export async function recursivedivision(updateGrid, maingrid, width, height) {
    var newArray = [...maingrid]; //clone maingrid 
    if(outborder == false){ // create out border only when not exist
        CreateExtBorder(newArray,width,height);
        outborder = true;
        updateGrid([...newArray]);
    }
    updateGrid([...newArray]);

    addInnerWalls(false, updateGrid, newArray, 1, width - 2, 1, height - 2);
}

function addInnerWalls(horizontal, updateGrid, newArray, minX, maxX, minY, maxY){
    setTimeout( function () { if(horizontal){
        if (maxX - minX < 2) {
            return;
        }

        var y = Math.floor(randomNumber(minY, maxY)/2)*2;
        addHWall(updateGrid, newArray, minX, maxX, y);

        addInnerWalls(!horizontal, updateGrid, newArray, minX, maxX, minY, y-1);
        addInnerWalls(!horizontal, updateGrid, newArray, minX, maxX, y + 1, maxY);
    }
    else{
        if (maxY - minY < 2) {
            return;
        }
        
        var x = Math.floor(randomNumber(minX, maxX)/2)*2;
        addVWall(updateGrid, newArray, minY, maxY, x);

        addInnerWalls(!horizontal, updateGrid, newArray, minX, x-1, minY, maxY);
        addInnerWalls(!horizontal, updateGrid, newArray, x + 1, maxX, minY, maxY);
    }
    }, 5);
}

function addHWall(updateGrid, newArray, minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX)/2)*2+1;

    for (var i = minX; i <= maxX; i++) {
        if (i == hole) newArray[y][i][0] = 0;
        else newArray[y][i][0] = 1;
    }
    
    updateGrid([...newArray]);
}

function addVWall(updateGrid, newArray, minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY)/2)*2+1;

    for (var i = minY; i <= maxY; i++) {
        if (i == hole) newArray[i][x][0] = 0;
        else newArray[i][x][0] = 1;
    }
    
    updateGrid([...newArray]);
}

function CreateExtBorder(grid, width, height){
    for(var i = 0; i < width; i++){
        grid[0][i][0] = 1;
    }
    for(var i = 0; i < height; i++){
        grid[i][width-1][0] = 1;
    }
    for(var i = width-1; i > 0; i--){
        grid[height-1][i][0] = 1;
    }
    for(var i = height-1; i > 0; i--){
        grid[i][0][0] = 1;
    }
    return grid;
}

// Generate a random number between lowNum and highNum
function randomNumber(lowNum, highNum) {
    return Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
}
