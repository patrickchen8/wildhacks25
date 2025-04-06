import { useState, useContext } from 'react';
import { useDbUpdate, uploadImage } from '../utilities/firebase';
import { sendMsg } from "../gemini/GeminiFunctions";
import { userContext } from '../App';
import { v4 as uuidv4 } from 'uuid';
import InputField from './InputField';


const AddModal = ({setIsOpen}) => {
    const user = useContext(userContext); 
    const [cropId, setCropId] = useState(uuidv4());
    const [update, result] = useDbUpdate(`/${user.uid}/${cropId}`);

    const [data, setData] = useState({
        'crop': '',
        'storageType': '',
        'amount': '',
        'harvestDate': '',
        'image': null
    })

    console.log(data)

    const handleChange = (e) => {
        const {value, name} = e.target;
        setData((oldData) => ({...oldData, [name]: value}));
    }

    const handleUpload = (e) => {
        const img = e.target.files[0]
        setData((oldData) => ({...oldData, ['image']: img}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const currentDate = new Date();
        const year = currentDate.getFullYear(); 
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate(); 
        const date = `${year}/${month}/${day}`;

        data['lastUpdate'] = date
        data['isHealthy'] = 'processing'
        data['sellByDate'] = 'processing'

        const image = data.image

        if(data.image) {
            console.log('wtf')
            try{
                const fileName = `${user.uid}-${data.image.name}`
                const path = `uploads/${fileName}`;
                const url = await uploadImage(data.image, path);
                console.log(url)
                data.image = url
            }
            catch (error) {
                console.error('Upload failed:', error);
            }
            
        }
        
        update(data)
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

        data['isHealthy'] = jsonResult['isHealthy']
        data['healthReason'] = jsonResult['reason']

        update(data)
    }

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center bg-black/20`}
            onClick={() => {setIsOpen(false)}}
        >
            <div
            className="flex flex-col gap-y-4 items-center bg-white rounded-md relative w-[35%] h-[75%]"
            onClick={(e) => e.stopPropagation()}
            >
                <form className="flex flex-col w-full items-center"
                      onSubmit={(e) => handleSubmit(e)}> 

                <h1 className="self-start ml-4 text-4xl font-bold my-4">
                    Add To Inventory
                </h1>

                <InputField 
                   name="crop" 
                   data={data.crop} 
                   handleChange={handleChange}
                   label="Crop" 
               />


                <InputField 
                   name="storageType" 
                   data={data.storageType} 
                   handleChange={handleChange}
                   label="Storage Type" 
               />

                <InputField 
                   name="amount" 
                   data={data.amount} 
                   handleChange={handleChange}
                   label="Amount" 
               />

                <div className="flex flex-col gap-y-1 border-2 border-black rounded-md w-[90%] p-2 mt-4">
                    <label htmlFor="date" className="text-gray-500">Harvest date:</label>
                    <input
                        type="date"
                        id="date"
                        value={data.harvestDate}
                        onChange={(e) => {
                            setData((oldData) => ({...oldData, ['harvestDate']: e.target.value}));
                        }}
                    />
                </div>

                <input type="file" 
                        accept="image/*"
                        className="border-2 rounded-lg p-4 mt-6 w-[90%]"
                        onChange={(e) => {handleUpload(e)}}/>


                <button className="self-end mr-4 mb-2 border-1 rounded-md p-2 mt-12 cursor-pointer"
                        type="submit">
                    Submit
                </button>

                </form>
            
            </div>
      </div>
    )



}

export default AddModal; 