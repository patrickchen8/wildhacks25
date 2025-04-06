import Row from './Row'
import { useDbData } from '../utilities/firebase';
import { userContext } from '../App'
import { useContext } from 'react'

const Table = ({ setIsOpen, recommendations = [] }) => {
  const user = useContext(userContext)
  const [data, error] = useDbData(`/${user.uid}`)

  if (data === undefined) {
    return <div> Loading </div>
  }

  const getLLMData = (cropName) => {
    return recommendations.find((rec) => rec.crop.toLowerCase() === cropName.toLowerCase()) || {};
  }

  return (
    <div className="flex flex-col mx-4 border-1 border-gray-300 rounded-lg">
      {/* Header */}
      <div className="flex justify-between py-2 bg-dark-green">
        <p className="w-[150px] text-center font-semibold"> Crop </p>
        <p className="w-[150px] text-center font-semibold"> Storage Type </p>
        <p className="w-[150px] text-center font-semibold"> Health Status </p>
        <p className="w-[150px] text-center font-semibold"> Amount </p>
        <p className="w-[150px] text-center font-semibold"> Harvest Date</p>
        <p className="w-[150px] text-center font-semibold"> Sell By Date</p>
        <p className="w-[150px] text-center font-semibold"> Risk Level </p>
        <p className="w-[150px] text-center font-semibold"> Revenue ($)</p>
        <p className="w-[150px] text-center font-semibold"> Last Update </p>
      </div>

      {/* Rows */}
      {data ? Object.entries(data).map(([cropId, cropData]) => {
        const llmData = getLLMData(cropData.crop);

        return (
          <Row
            key={cropId}
            crop={cropData.crop}
            storageType={cropData.storageType}
            isHealthy={cropData.isHealthy}
            amount={cropData.amount}
            harvestDate={cropData.harvestDate}
            sellByDate={llmData.sellByDate || "-"}
            riskLevel={llmData.riskLevel || "-"}
            revenue={llmData.totalPotentialRevenue || 0}
            lastUpdateDate={cropData.lastUpdate}
            setIsOpen={setIsOpen}
          />
        )
      }) : (
        <div className="flex justify-center align-center text-4xl mt-2">
          No Inventory
        </div>
      )}
    </div>
  )
}

export default Table;