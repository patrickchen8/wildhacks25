import { useContext, useState, useEffect } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDbData, fetchImage } from "../utilities/firebase";
import { userContext } from '../App';


const CropModal = ({ isOpen, setIsOpen, cropId }) => {
    const [img, setImg] = useState('')
    const user = useContext(userContext)
    const [data, error] = useDbData(`/${user.uid}/${cropId}`)
    
    useEffect(() => {
        const wrapper = async () => {
            const response = await fetchImage(request.image);
            setImg(response);
        }

        wrapper()
    }, 
    [request.image])

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

                {data === undefined ? 
                    <div>
                        Loading Data... 
                    </div>

                    :

                    <>
                         <h1 className="text-4xl font-bold ml-8 mt-12 self-start"> {data.crop} </h1>

                         <img src={img}/>

                         <h2 className="text-2xl"> Health </h2>
                        <p className="text-sm px-2"> {data.healthReason}</p>

                        <button className="border-2 border-black bg-black text-white p-2 rounded-lg w-[90%] mt-auto mb-2">
                            Update 
                        </button>
                    </>
                }
                
               
                
                


            </div>
      </div>
    )
}

export default CropModal; 