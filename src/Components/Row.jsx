
const Row = ({crop, storageType, isHealthy, amount, harvestDate, sellByDate, lastUpdateDate}) => {

    return (
        <div className="flex justify-between border-t-1 border-gray-300 py-2 mx-2">
            <p className="w-[200px] text-center"> 
                {crop} 
            </p>

            <div className="w-[200px] text-center"> 
                {storageType} 
            </div>

            {
                isHealthy ? <div className="w-[200px] text-center"> Healthy </div> : <div className="w-[200px] text-center"> Unhealthy </div>
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