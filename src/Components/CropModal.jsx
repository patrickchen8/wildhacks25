import { useState, useEffect, useContext } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { fetchImage, useDbUpdate, uploadImage} from "../utilities/firebase";
import { userContext } from '../App';
import { sendMsg } from '../gemini/GeminiFunctions';


const CropModal = ({ data, setIsOpen, cropId }) => {
    const user = useContext(userContext)
    const [img, setImg] = useState('')
    const [update, setUpdate] = useState(false)
    const [updateDb, result] = useDbUpdate(`/${user.uid}/${cropId}`)
    const [newData, setNewData] = useState({
        'image': null,
        'imagePreview': null,
        'amount': '',
        'storageType': ''
    })
    
    useEffect(() => {
        const wrapper = async () => {
            console.log(data[cropId])
            const response = await fetchImage(data[cropId].image);
            setImg(response);
        }

        wrapper()
    }, 
    [data[cropId].image])


    const handleChange = (e) => {
        const {value, name} = e.target;
        setNewData((oldData) => ({...oldData, [name]: value}));
    }

    const handleUpload = (e) => {
        const img = e.target.files[0]
        setNewData((oldData) => ({
            ...oldData, 
            'image': img, 
            'imagePreview': URL.createObjectURL(img),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentDate = new Date();
        const year = currentDate.getFullYear(); 
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate(); 
        const date = `${year}/${month}/${day}`;

        newData['lastUpdate'] = date
        newData['isHealthy'] = 'processing'
        newData['sellByDate'] = 'processing'

        const image = newData.image

        if(newData.image) {
            console.log('wtf')
            try{
                const fileName = `${user.uid}-${newData.image.name}`
                const path = `uploads/${fileName}`;
                const url = await uploadImage(newData.image, path);
                console.log(url)
                newData.image = url
            }
            catch (error) {
                console.error('Upload failed:', error);
            }
            
        }
        
        updateDb(newData)
        setIsOpen(false)

        //LLM Logic 
        prompt = `Analyze this image of corn and determine if it appears healthy or not.
                Return ONLY a JSON object with the following structure:
                {
                    "isHealthy": boolean,
                    "reason": "detailed explanation of why the corn is healthy or unhealthy"
                }
                
                If you see signs of disease, pest damage, nutrient deficiency, or other issues,
                set isHealthy to false and explain the issues in the reason field.
                If the corn appears healthy, set isHealthy to true and explain the visual indicators of health.
                
                Important: Return ONLY valid JSON that can be parsed by JSON.parse() without any additional text.`
        
        const jsonResult = await sendMsg(prompt, image)

        console.log(jsonResult)

        newData['isHealthy'] = jsonResult['isHealthy']
        newData['healthReason'] = jsonResult['reason']

        updateDb(newData)
    }

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


                {update ? 
                <form className="flex flex-col w-full mt-8 gap-4 justify-center"
                      onSubmit={(e) => handleSubmit(e)}>
                    {/* Storage Type */}
                    <div className="flex flex-col">
                        <label htmlFor="storageType" className="text-sm text-gray-600 mb-2">Storage Type</label>
                        <input
                            type="text"
                            id="storageType"
                            name="storageType"
                            value={newData.storageType}
                            onChange={(e) => {handleChange(e)}}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter storage type"
                        />
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col">
                        <label htmlFor="amount" className="text-sm text-gray-600 mb-2">Amount (kg)</label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={newData.amount}
                            onChange={(e) => {handleChange(e)}}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col">
                        <label htmlFor="image" className="text-sm text-gray-600 mb-2">Crop Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            className="p-3 border border-gray-300 rounded-md cursor-pointer"
                            onChange={(e) => {handleUpload(e)}}
                        />
                    </div>


                    {/* Image Preview */}
                    {newData.imagePreview && (
                        <div className="mt-4">
                            <img 
                                src={newData.imagePreview} 
                                alt="Crop Preview" 
                                className="max-w-[300px] h-[200px] object-cover rounded-md shadow-md mx-auto" 
                            />
                        </div>
                    )}

                    <button className="border-2 border-black bg-black text-white p-2 rounded-lg w-[90%] mt-auto mb-2"
                        type="submit">
                        Submit 
                    </button>
                </form>
                : 
                <div className="flex flex-col gap-y-4 items-center">
                    <h1 className="text-4xl font-bold ml-8 mt-8 self-start"> {data[cropId].crop} </h1>

                    <img src={img}
                        className="w-[80%]"/>

                    <h2 className="text-2xl"> Health </h2>
                    <p className="text-sm px-2"> {data[cropId].healthReason}</p>


                    <h2 className="text-2xl"> Recommendations </h2>
                    <p className="text-sm px-2"> {data[cropId].healthReason}</p>

                    <button className="border-2 border-black bg-black text-white p-2 rounded-lg w-[90%] m-32 mb-2"
                        onClick={()=>setUpdate(true)}>
                        Update 
                    </button>
                </div>
                }
              
               

               


            </div>
      </div>
    )
}

export default CropModal; 