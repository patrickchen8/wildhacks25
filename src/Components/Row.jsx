import { FaRegCheckCircle } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";


const Row = ({crop, storageType, isHealthy, amount, harvestDate, sellByDate, lastUpdateDate}) => {

    return (
        <div className="flex justify-between border-t-1 border-gray-300 py-2">
            <p className="w-[200px] text-center"> 
                {crop} 
            </p>

            <div className="w-[200px] text-center"> 
                {storageType} 
            </div>

            {
                isHealthy ? <div className="w-[200px] flex justify-center items-center"> 
                                <FaRegCheckCircle color="green"/> 
                                 <p className="ml-2">Healthy</p> 
                            </div> 
                            : 
                            <div className="w-[200px] flex justify-center items-center"> 
                                <GiHealthNormal color="red"/> 
                                 <p className="ml-2">Unhealthy</p> 
                            </div> 
            }

            <div className="w-[200px] text-center"> 
                {amount} 
            </div>

            <div className="w-[200px] text-center"> 
                {harvestDate} 
            </div>

            <div className="w-[200px] text-center"> 
                {sellByDate} 
            </div>

            <div className="w-[200px] text-center">
                {lastUpdateDate}
            </div>
        </div>
    )
}

export default Row; 