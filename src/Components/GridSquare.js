import { useState} from 'react';

const GridSquare = ({row, col, maingrid, updatethegrid, StartBtnclicked, EndBtnclicked, startendpos, updateStartEnd }) => {
    
    //Weight of Current Node
    var weight = maingrid[row][col][1]

    
    //Values : 0:Empty; 1:Wall; 2:Start; 3:Target;  4:SearchPath; 5:FinalPath;
    if(row == startendpos[0] && col == startendpos[1]){ //Check if current cell is the startnode
        updatethegrid(row, col, 2)
        var value = 2
    } 
    else if(row == startendpos[2] && col == startendpos[3]) {
        updatethegrid(row, col, 3)
        var value = 3
    }
    else{
        var value = maingrid[row][col][0]
    }
    
    const [item, setItem] = useState(value);
    //nodevalue = '1' ? maingrid[row][col] = '1' : maingrid[row][col] = '0';


    //MOST AWESOME METHOD EVER
    //Change Parent State array element without rerendering whole array again
    // so no more slow anymore !
    function onchange() {
        let newValue = 0;
        if(value === 1){
            newValue = 0
        }
        if(value === 0){
            newValue = 1
        }
        if(StartBtnclicked === true){ // If start button was toggled on !
            updateStartEnd(row, col, 2)
            newValue = 2
        }
        
        if(EndBtnclicked === true){ // If start button was toggled on !
            updateStartEnd(row, col, 3)
            newValue = 3
        }



        setItem(prevState => {
            
          let newItem = newValue;
            
          // sync with [arent array]
          updatethegrid(row, col, newItem);
          return newItem;
          
        });
    }

    

    const startblock = <div className='btn btn-primary'></div>;

    return (
        <div className='gridsquare'   onClick={onchange} style={{ backgroundColor : value === 1 ? '#007BFF' : value === 2 ?  '#34eb6b' : value === 3 ?  '#f74848' : value === 4 ?  'yellow' : '' }}>
         
        </div>
    )
}

export default GridSquare
