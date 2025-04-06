import { useState } from 'react'
import Navbar from "../Components/Navbar.jsx";
import Table from '../Components/Table'
import ControlPanel from "../Components/ControlPanel.jsx"
import CropModal from "../Components/CropModal.jsx";


const Dashboard = () => {
    const [selected, setSelected] = useState('All');
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-b from-[#DCEFD8] to-[#F1F9EF]">
        <Navbar/>
        <ControlPanel selected={selected} setSelected={setSelected} />
        <Table setIsOpen={setIsOpen}/>
        <CropModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
    )
}

export default Dashboard

