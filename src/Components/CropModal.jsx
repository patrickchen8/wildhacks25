import { IoCloseCircleOutline } from "react-icons/io5";
import ImageCarousel from './ImageCarousel';

const CropModal = ({ isOpen, setIsOpen }) => {

    const images = [
        "https://st5.depositphotos.com/13064652/75425/i/450/depositphotos_754251728-stock-photo-ripe-corncobs-maize-zea-mays.jpg",
        "https://images.pond5.com/corn-kernel-background-silos-tank-footage-074585767_iconl.jpeg"
      ];

    return (
        <div
            className={`fixed inset-0 flex justify-end items-center ${
            isOpen ? 'bg-black/20' : 'invisible'
            }`}
            onClick={() => {setIsOpen(false)}}
        >
            <div
            className="flex flex-col gap-y-4 items-center bg-dark-green rounded-md relative w-[35%] h-[100%]"
            onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => {setIsOpen(false)}}>
                    <IoCloseCircleOutline size={27}/>
                </div>
                
                <h1 className="text-4xl font-bold ml-8 mt-12 self-start"> Corn </h1>
          
                <div className="w-1/2">
                    <ImageCarousel images={images} autoSlideInterval={10000} />
                </div>


                <button className="border-2 border-black bg-black text-white p-2 rounded-lg w-[90%] mt-auto mb-2">
                    Update 
                </button>
                
                


            </div>
      </div>
    )
}

export default CropModal; 