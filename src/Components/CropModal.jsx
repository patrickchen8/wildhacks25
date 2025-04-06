import { useState, useEffect } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { fetchImage } from "../utilities/firebase";


const CropModal = ({ data, setIsOpen, cropId }) => {
    const [img, setImg] = useState('')
    
    useEffect(() => {
        const wrapper = async () => {
            console.log(data[cropId])
            const response = await fetchImage(data[cropId].image);
            setImg(response);
        }

        wrapper()
    }, 
    [data[cropId].image])

    return (
        <div
            className={`fixed inset-0 flex justify-end items-center bg-black/20`}
            onClick={() => {setIsOpen(false)}}
        >
            <div
            className="flex flex-col gap-y-4 items-center bg-gradient-to-b from-[#DCEFD8] to-[#F1F9EF] rounded-md relative w-[35%] h-[100%]"
            onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => {setIsOpen(false)}}>
                    <IoCloseCircleOutline size={27}/>
                </div>


                <h1 className="text-4xl font-bold ml-8 mt-8 self-start"> {data[cropId].crop} </h1>

                <img src={img}
                    className="w-[80%]"/>

                <h2 className="text-2xl"> Health </h2>
                <p className="text-sm px-2"> {data[cropId].healthReason}</p>


                <h2 className="text-2xl"> Recommendations </h2>
                <p className="text-sm px-2"> {data[cropId].healthReason}</p>

                <button className="border-2 border-black bg-black text-white p-2 rounded-lg w-[90%] mt-auto mb-2">
                    Update 
                </button>


            </div>
      </div>
    )
}

export default CropModal; 