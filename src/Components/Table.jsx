import Row from './Row'
import { useDbData } from '../utilities/firebase';
import { userContext } from '../App'
import { useContext } from 'react'

const Table = ({setIsOpen}) => {
    const user = useContext(userContext)
    const [data, error] = useDbData(`/${user.uid}`)

    if(data === undefined) {
        return <div> Loading </div>
    }
    console.log(data)
    

    return (
    <div className="flex flex-col mx-4 mt-8 border-1 border-gray-300 rounded-lg">
        {/* Header */}
        <div className="flex justify-between py-2 bg-dark-green">
            <p className="w-[200px] text-center font-semibold"> Crop </p>
            <p className="w-[200px] text-center font-semibold"> Storage Type </p>
            <p className="w-[200px] text-center font-semibold"> Health Status </p>
            <p className="w-[200px] text-center font-semibold"> Amount </p>
            <p className="w-[200px] text-center font-semibold"> Harvest Date</p>
            <p className="w-[200px] text-center font-semibold"> Sell By Date</p>
            <p className="w-[200px] text-center font-semibold"> Last Update </p>
        </div>


        {/* Rows */}

        {data ? Object.entries(data).map(([cropId, cropData]) => {
            console.log(cropData)
             return (<Row   key={cropId}
                    crop={cropData.crop}
                    storageType={cropData.storageType}
                    isHealthy={cropData.isHealthy}
                    amount={cropData.amount}
                    harvestDate={cropData.harvestDate}
                    sellByDate={cropData.sellByDate}
                    lastUpdateDate={cropData.lastUpdate}
                    setIsOpen={setIsOpen}/>)
        })
        :
        <div className="flex justify-center align-center text-4xl mt-2"> 
            No Inventory
        </div>
        }

    </div>)
}

export default Table; 