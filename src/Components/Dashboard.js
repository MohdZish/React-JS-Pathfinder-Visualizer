import { FaBomb } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { VscRunAll, VscDebugStart } from 'react-icons/vsc';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa';
import { GiPlayButton, GiMaze} from 'react-icons/gi';
import { BiNetworkChart, BiTargetLock } from 'react-icons/bi';
import { BsLightningFill} from 'react-icons/bs';
import { AiOutlineBlock} from 'react-icons/ai';

import { Dropdown} from 'react-bootstrap';
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Dashboard = (props) => {

   function changeAlgorithm(newAlgorithm) {
      props.updateAlgorithm(newAlgorithm)
   }

   function changeSpeed(newSpeed) {
      props.updateSpeed(newSpeed)
   }

   async function changeMaze(newMaze) {
      await props.updateMaze(newMaze)
      //alert(props.maze)
      //displayMaze();
   }

   function displayMaze(){
      props.GenerateMaze();
   }

    return (
      <div>
         <div className='topleftdashboard'>
            <Dropdown as={ButtonGroup}>
               <Dropdown.Toggle variant="light" className="speedDropDown"><BsLightningFill style={{fontSize: '20px'}}/> {props.speed}</Dropdown.Toggle>
               <Dropdown.Menu>
                  <Dropdown.Item onClick={(e) => changeSpeed(e.target.textContent)} eventKey="1">Instant</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => changeSpeed(e.target.textContent)} eventKey="2">Fast</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => changeSpeed(e.target.textContent)} eventKey="3">Medium</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => changeSpeed(e.target.textContent)} eventKey="4">Slow</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
            <div className="statText mt-2 font-italic">Distance: <div style={{display: "inline-block"}}>{props.finaldistance}</div></div>
            <div className="statText mt-1 font-italic">Visited: <div style={{display: "inline-block"}}>{props.nodesVisited}</div></div>

         </div>

          <div className='bottomdashboard row'>
            <div className="col-3 d-flex justify-content-center">
               <Dropdown as={ButtonGroup} >
                  <Dropdown.Toggle variant="primary" className="algoDropDown"><BiNetworkChart style={{fontSize: '25px'}}/> {props.algorithm}</Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item onClick={(e) => changeAlgorithm(e.target.textContent)} eventKey="1">Dijkstra's Algorithm</Dropdown.Item>
                     <Dropdown.Item onClick={(e) => changeAlgorithm(e.target.textContent)} eventKey="2">A* Algorithm</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </div>
               
            <div className="col-6 d-flex justify-content-center">
               <button className='dashboardbtn btn btn-warning' onClick={() => props.updateStartBtn(value => !value)}> 
                  <GiPlayButton style={{fontSize: '25px'}}/> Start
               </button>
               <button className='dashboardbtn btn btn-danger' onClick={() => props.updateEndBtn(value => !value)}> 
                  <BiTargetLock style={{fontSize: '25px'}}/> Target
               </button>
               <button className='dashboardbtn btn btn-info' onClick = {() => props.GenerateMaze()}> 
                  <AiOutlineBlock style={{fontSize: '25px'}}/> Maze
               </button>
               <button className='dashboardbtn btn btn-dark' onClick = {() => props.clearGrid()}> 
                  <HiOutlineRefresh style={{fontSize: '25px'}}/> Clear
               </button>
               <button className='dashboardbtn btn btn-success' onClick={() => props.VisualizeAlgorithm()}> 
                  <VscRunAll style={{fontSize: '25px'}}/> Simulate
               </button>
            </div>

            <div className="col-3 d-flex justify-content-center">
               <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="primary" className="algoDropDown"><AiOutlineBlock style={{fontSize: '25px'}}/> {props.maze}</Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item onClick={(e) => changeMaze(e.target.textContent)} eventKey="1">Recursive Division</Dropdown.Item>
                     <Dropdown.Item onClick={(e) => changeMaze(e.target.textContent)} eventKey="2">Random Maze</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </div>

         </div>
      </div>
     
    )
}

export default Dashboard
