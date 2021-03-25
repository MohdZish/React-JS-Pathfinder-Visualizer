import { FaBomb } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { VscRunAll } from 'react-icons/vsc';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa';

const Dashboard = (props) => {


    return (
        <div className='dashboardcontainer'>
            <div className='dashboard'>
                <button className='dashboardbtn btn btn-primary'> 
                   <FaBomb style={{fontSize: '25px'}}/> Bomb
                </button>
                <button className='dashboardbtn btn btn-primary'> 
                   <FaWeightHanging style={{fontSize: '25px'}}/> Weight
                </button>
                <button className='dashboardbtn btn btn-primary'> 
                   <FaDoorOpen style={{fontSize: '25px'}}/> Door
                </button>
                <button className='dashboardbtn btn btn-primary' onClick = {() => props.clearGrid()}> 
                   <HiOutlineRefresh style={{fontSize: '25px'}}/> Clear
                </button>
                <button className='dashboardbtn btn btn-success'> 
                   <VscRunAll  style={{fontSize: '26px'}}/> Simulate
                </button>
            </div>
        </div>
    )
}

export default Dashboard
