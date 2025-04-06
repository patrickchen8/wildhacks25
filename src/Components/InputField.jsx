
const InputField = ({name, data, handleChange, label}) => {

    return (
    <div className="flex flex-col relative items-center w-[90%] mb-4 shadow-md">
        <input id={name}
            type="text"
            name={name}
            value={data}
            onChange={(e) => {handleChange(e)}}
            className="w-full p-4 mt-4 outline-none border-2 border-black text-sm rounded-md peer valid:border-dark-green  focus:border-dark-green transition-all" 

            required/>
        <label htmlFor={name}
            className="absolute top-8 left-4 bg-white px-1 text-gray-500 transition-all transform 
                     peer-focus:top-1 peer-focus:left-4 peer-focus:text-dark-green peer-focus:font-bold peer-focus:scale-105 
                     peer-valid:top-1 peer-valid:left-4 peer-valid:text-dark-green peer-valid:font-bold peer-valid:scale-105 
                     z-10"> 
             {`Enter ${label}`}
        </label>
    </div>
    );

}

export default InputField; 