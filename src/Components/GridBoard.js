import GridSquare from './GridSquare'



const GridBoard = ({maingrid, rownumbers, colnumbers, updatethegrid}) => {

    
    var grid = [<></>];

    for (var row = 0; row < rownumbers; row++) {
        //grid[row] = [];
        grid.push(<tr></tr>)
        for (var col = 0; col < colnumbers; col++) {
            grid.push(<td ><GridSquare row={row} col={col} maingrid={maingrid} updatethegrid={updatethegrid}/></td>)
          }
        }

    return (
        <table className='grid-board '>
            {grid}
        </table>
    )
    
}

export default GridBoard
