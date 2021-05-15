import { FaBomb } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { VscRunAll } from 'react-icons/vsc';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa';

const Dashboard = (props) => {


    return (
        <div className='dashboardcontainer'>
            <div className='dashboard'>
                <button className='dashboardbtn btn btn-warning' onClick={() => props.updateStartBtn(value => !value)}> 
                   <FaBomb style={{fontSize: '25px'}}/> Start
                </button>
                <button className='dashboardbtn btn btn-danger' onClick={() => props.updateEndBtn(value => !value)}> 
                   <FaBomb style={{fontSize: '25px'}}/> Target
                </button>
                <button className='dashboardbtn btn btn-dark'> 
                   <FaBomb style={{fontSize: '25px'}}/> Bomb
                </button>
                <button className='dashboardbtn btn btn-primary' onClick = {() => props.clearGrid()}> 
                   <HiOutlineRefresh style={{fontSize: '25px'}}/> Clear
                </button>
                <button className='dashboardbtn btn btn-success' onClick={() => props.DijkstraAlgorithm()}> 
                   <VscRunAll style={{fontSize: '25px'}}/> Simulate
                </button>
            </div>
        </div>
    )
}

export default Dashboard
