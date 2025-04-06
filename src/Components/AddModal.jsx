import { useState, useContext } from 'react';
import { useDbUpdate, uploadImage } from '../utilities/firebase';
import { sendHarvestChat } from "../gemini/GeminiFunctions";
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
        'images': []
    })

    console.log(data)

    const handleChange = (e) => {
        const {value, name} = e.target;
        setData((oldData) => ({...oldData, [name]: value}));
    }

    const handleUpload = (e) => {
        const images = e.target.files 
        setData((oldData) => ({...oldData, ['images']: Array.from(images)}));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const currentDate = new Date();
        const year = currentDate.getFullYear(); 
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate(); 
        const date = `${year}/${month}/${day}`;

        data['lastUpdate'] = date
        data['isHealthy'] = 'processing'
        data['sellByDate'] = 'processing'

        const downloadUrl = []

        data.images.forEach(async (file) => {
            if(file) {
                console.log('wtf')
                try{
                    const fileName = `${user.uid}-${file.name}`
                    const path = `uploads/${fileName}`;
                    const url = await uploadImage(file, path);
                    console.log(url)
                    downloadUrl.push(url)
                }
                catch (error) {
                    console.error('Upload failed:', error);
                }
                
            }
        })
        data.images = downloadUrl 
        
        update(data)
        setIsOpen(false)

        //LLM Logic 

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
                        multiple
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