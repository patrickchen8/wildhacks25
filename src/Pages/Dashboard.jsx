import { useState } from 'react'
import Navbar from "../Components/Navbar.jsx";
import Table from '../Components/Table'
import ControlPanel from "../Components/ControlPanel.jsx"
import CropModal from "../Components/CropModal.jsx";
import AddModal from "../Components/AddModal.jsx";


const Dashboard = () => {
    const [selected, setSelected] = useState('All');
    const [isOpen, setIsOpen] = useState(false); //crop modal
    const [isOpen2, setIsOpen2] = useState(false); //add modal 

    return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-b from-[#DCEFD8] to-[#F1F9EF]">
        <Navbar/>
        <ControlPanel selected={selected} setSelected={setSelected} setIsOpen={setIsOpen2} />
        <Table setIsOpen={setIsOpen}/>
        <CropModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        {isOpen2 && <AddModal setIsOpen={setIsOpen2}/> }
    </div>
    )
}

export default Dashboard

