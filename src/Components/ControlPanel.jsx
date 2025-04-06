import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";

const ControlPanel = ({ selected, setSelected, setIsOpen, data, setFilterUnhealthy }) => {
  
  const filteredData = data.filter((item) => {
    if (selected === 'Unhealthy') {
      setFilterUnhealthy(true);
      return item.healthStatus === 'Unhealthy';
    }
    setFilterUnhealthy(false);
    return true; 
  });

  const options = [
    { id: 'All', label: 'All'},
    { id: 'Unhealthy', label: 'Unhealthy'}
  ];

  const handleOptionChange = (optionId) => {
    setSelected(optionId);
  };

  return (
    <div className="flex mt-4 mx-4 justify-between align-center items-center">
      <div className="flex items-center p-1 bg-gray-100 rounded-full shadow-sm">
        {options.map((option) => (
          <button
            key={option.id}
            className={`px-4 py-2 rounded-full flex items-center transition-colors ${
              selected === option.label ? 'bg-white shadow-md' : 'text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => handleOptionChange(option.label)}
          >
            <span className="text-sm">{option.label}</span>
          </button>
        ))}
      </div>

      <button
        className="flex rounded-lg px-3 items-center gap-x-2 py-2 shadow-lg bg-gray-100 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <IoIosAddCircleOutline />
        <p>Add Crop</p>
      </button>
    </div>
  );
};

export default ControlPanel;