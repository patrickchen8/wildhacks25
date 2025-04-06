import { FaRegCheckCircle } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { ImSpinner6 } from "react-icons/im";

const Row = ({
  crop,
  storageType,
  isHealthy,
  amount,
  harvestDate,
  sellByDate,
  llmSellByDate,
  riskLevel,
  revenue,
  lastUpdateDate,
  setIsOpen,
}) => {
  let healthyCol;
  if (isHealthy === "processing") {
    healthyCol = (
      <div className="w-[150px] flex justify-center items-center">
        <ImSpinner6 />
        <p className="ml-2">processing</p>
      </div>
    );
  } else if (isHealthy) {
    healthyCol = (
      <div className="w-[150px] flex justify-center items-center">
        <FaRegCheckCircle color="green" />
        <p className="ml-2">Healthy</p>
      </div>
    );
  } else {
    healthyCol = (
      <div className="w-[150px] flex justify-center items-center">
        <GiHealthNormal color="red" />
        <p className="ml-2">Unhealthy</p>
      </div>
    );
  }

  return (
    <div
      className="flex justify-between border-t-1 border-gray-300 py-2 bg-white cursor-pointer hover:bg-tan"
      onClick={() => setIsOpen(true)}
    >
      <p className="w-[150px] text-center">{crop}</p>
      <div className="w-[150px] text-center">{storageType}</div>
      {healthyCol}
      <div className="w-[150px] text-center">{amount}</div>
      <div className="w-[150px] text-center">{harvestDate}</div>
      <div className="w-[150px] text-center">{sellByDate}</div>
      <div className="w-[150px] text-center">{riskLevel}</div>
      <div className="w-[150px] text-center">${Number(revenue).toFixed(2)}</div>
      <div className="w-[150px] text-center">{lastUpdateDate}</div>
    </div>
  );
};

export default Row;