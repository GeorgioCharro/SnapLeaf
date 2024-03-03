
import { useParams } from "react-router-dom"
import documentIcon from '../assets/svg/documentIcon.svg'
import bookIcon from '../assets/svg/bookIcon.svg'
import plantIconGuide from '../assets/svg/plantGuide.svg'
function Plant() {

    const params=useParams()
    const leafImage = require(`../assets/png/leaves/${params.plantName}Leaf.jpg`)
    const flowerImage = require(`../assets/png/flowers/${params.plantName}Flower.jpg`)
    const fruitImage = require(`../assets/png/fruit/${params.plantName}Fruit.jpg`)
    const stemImage = require(`../assets/png/stem/${params.plantName}Stem.jpg`)
  return (
    <>
    <div className="bg-gray-50">
    <div className="bg-white">
    <div className="flex items-center pt-5 ml-6">
    <img src={plantIconGuide} alt="PlantGuide" className=" h-6 w-6 " />
    <p className="ml-2 text-xl font-bold text-gray-600">Field Guide</p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 p-10 rounded-xl">
  <div className="relative">
    <img src={leafImage} className="w-auto h-auto object-cover rounded-lg" alt="Leaf" />
    <div className="absolute top-0 left-0 bg-black bg-opacity-50 pl-3 pr-3 rounded-lg text-white   text-lg">Leaf</div>
  </div>
  <div className="relative">
    <img src={flowerImage} className="w-auto h-auto object-cover rounded-lg" alt="Vegetable" />
    <div className="absolute top-0 left-0 bg-black bg-opacity-50 pl-3 pr-3 rounded-lg text-white  text-lg">Flower</div>
  </div>
  <div className="relative">
    <img src={fruitImage} className="w-auto h-auto object-cover rounded-lg" alt="Fruit" />
    <div className="absolute top-0 left-0 bg-black  pl-3 pr-3 bg-opacity-50 rounded-lg text-white  text-lg">Fruit</div>
  </div>
  <div className="relative">
    <img src={stemImage} className="w-auto h-auto object-cover rounded-lg" alt="Stem" />
    <div className="absolute top-0 left-0 bg-black bg-opacity-50 pl-3 pr-3 rounded-lg text-white  text-lg">Stem</div>
  </div>
    </div>
    </div>
    <div className="mt-4  bg-white">
        <div className="flex items-center pt-5 ml-6 mb-3">
            <img src={documentIcon} alt="Document" className=" h-6 w-6 " />
            <p className="ml-2 text-xl font-bold text-gray-600">Key Facts</p>
        </div>
        <p className='ml-6 rounded-lg bg-gray-50 p-2 mr-2' >Toxicity</p>
        <p className='ml-6 rounded-lg  p-2' >Plant Type</p>
        <p className='ml-6 rounded-lg bg-gray-50 p-2 mr-2' >Life Span</p>
        <p className='ml-6 rounded-lg  p-2'>Planting Time</p>
        <p className='ml-6 rounded-lg  bg-gray-50  p-2 mr-2'>Weed or not</p>
        <p className='ml-6 rounded-lg    p-2'>Invasiveness</p>
    </div>

    <div className="mt-4 bg-white">
        <div className="flex items-center pt-5 ml-6 mb-3">
            <img src={bookIcon} alt="Book" className=" h-6 w-6 " />
            <p className="ml-2 text-xl font-bold text-gray-600">Description</p>
        </div>
        </div>

 </div>       
</>   
    
    
  
  )  
}

export default Plant
