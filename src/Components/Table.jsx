import Row from './Row'

const Table = () => {

    return (
    <div className="flex flex-col mx-4 mt-2 border-1 border-gray-300 rounded-md">
        {/* Header */}
        <div className="flex justify-between py-2 bg-gray-300">
            <p className="w-[200px] text-center font-semibold"> Crop </p>
            <p className="w-[200px] text-center font-semibold"> Storage Type </p>
            <p className="w-[200px] text-center font-semibold"> Health Status </p>
            <p className="w-[200px] text-center font-semibold"> Amount </p>
            <p className="w-[200px] text-center font-semibold"> Harvest Date</p>
            <p className="w-[200px] text-center font-semibold"> Sell By Date</p>
            <p className="w-[200px] text-center font-semibold"> Last Update </p>
        </div>


        {/* Rows */}
        <Row crop="Corn"
             storageType="Bin" 
             isHealthy={true}
             amount={1000}
             harvestDate="1/2/2025"
             sellByDate="6/5/2025"
             lastUpdateDate="1/4/2025"/>
        
        <Row crop="Grapes"
             storageType="Bin" 
             isHealthy={false}
             amount={504}
             harvestDate="1/12/2025"
             sellByDate="6/1/2025"
             lastUpdateDate="3/4/2025"/>

    </div>)
}

export default Table; 