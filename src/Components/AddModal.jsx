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
        'image': null,
        'imagePreview': null,
    })

    console.log(data)

    const handleChange = (e) => {
        const {value, name} = e.target;
        setData((oldData) => ({...oldData, [name]: value}));
    }

    const handleUpload = (e) => {
        const img = e.target.files[0]
        setData((oldData) => ({
            ...oldData, 
            'image': img, 
            'imagePreview': URL.createObjectURL(img),
        }));
    };

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
        <div className="fixed inset-0 flex justify-center items-center bg-black/50" onClick={() => setIsOpen(false)}>
            <div className="flex flex-col gap-4 items-center bg-white rounded-xl p-8 w-11/12 max-w-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-2xl font-semibold text-center mb-6">Add New Crop</h1>

                <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
                    {/* Crop Name */}
                    <div className="flex flex-col">
                        <label htmlFor="crop" className="text-sm text-gray-600 mb-2">Crop Name</label>
                        <input
                            type="text"
                            id="crop"
                            name="crop"
                            value={data.crop}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter crop name"
                        />
                    </div>

                    {/* Storage Type */}
                    <div className="flex flex-col">
                        <label htmlFor="storageType" className="text-sm text-gray-600 mb-2">Storage Type</label>
                        <input
                            type="text"
                            id="storageType"
                            name="storageType"
                            value={data.storageType}
                            onChange={handleChange}
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
                            value={data.amount}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Harvest Date */}
                    <div className="flex flex-col">
                        <label htmlFor="harvestDate" className="text-sm text-gray-600 mb-2">Harvest Date</label>
                        <input
                            type="date"
                            id="harvestDate"
                            name="harvestDate"
                            value={data.harvestDate}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
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
                            onChange={handleUpload}
                        />
                    </div>

                    {/* Image Preview */}
                    {data.imagePreview && (
                        <div className="mt-4">
                            <img 
                                src={data.imagePreview} 
                                alt="Crop Preview" 
                                className="max-w-[300px] h-[200px] object-cover rounded-md shadow-md mx-auto" 
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-green-800 text-white p-3 rounded-md mt-6 hover:bg-green-900 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddModal; 