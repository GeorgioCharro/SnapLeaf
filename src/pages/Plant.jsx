
import { useParams,useNavigate } from "react-router-dom"
import documentIcon from '../assets/svg/documentIcon.svg'
import bookIcon from '../assets/svg/bookIcon.svg'
import plantIconGuide from '../assets/svg/plantGuide.svg'
import plantCare from '../assets/svg/plantCare.svg'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import { useState, useEffect } from 'react'
import temperatureIcon from '../assets/svg/temperatureIcon.svg'
import rightIcon from '../assets/svg/rightIcon.svg'
import sunLightIcon from '../assets/svg/sunLightIcon.svg'
import soilIcon from '../assets/svg/soilIcon.svg'
import locationIcon from '../assets/svg/locationIcon.svg'
import hardinessIcon from  '../assets/svg/hardinessIcon.svg'
import Spinner from "../components/Spinner"
function Plant() {
    const [plant,setPlant]=useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const auth = getAuth()
    const params=useParams()
    const leafImage = require(`../assets/png/leaves/${params.plantId}Leaf.jpg`)
    const flowerImage = require(`../assets/png/flowers/${params.plantId}Flower.jpg`)
    const fruitImage = require(`../assets/png/fruit/${params.plantId}Fruit.jpg`)
    const stemImage = require(`../assets/png/stem/${params.plantId}Stem.jpg`)


    useEffect(() => {
      const fetchListing = async () => {
        const docRef = doc(db, 'plants', params.plantId)
        const docSnap = await getDoc(docRef)
  
        if (docSnap.exists()) {
          setPlant(docSnap.data())
          setLoading(false)
        }
      }
      
      fetchListing()
      
    }, [navigate, params.plantId])


    if (loading) {
      return <Spinner />
    }

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
        <p className='ml-6 rounded-lg bg-gray-50 p-2 mr-2 flex justify-between' >Toxicity </p>
        <p className='ml-6 rounded-lg  p-2 flex justify-between' >Plant Type 
        
        <span className="ml-auto">{plant.type}</span>
        </p>
        <p className="ml-6 rounded-lg bg-gray-50 p-2 mr-2 flex justify-between">
        Life Span 
        <span className="ml-auto">{plant.lifeSpan}</span>
        </p>
        <p className='ml-6 rounded-lg  p-2 flex justify-between'>Planting Time 
        <span className="ml-auto">{plant.plantingTime}</span> 
        </p>
        <p className='ml-6 rounded-lg  bg-gray-50  p-2 mr-2 flex justify-between'>Weed or not 
        <span className="ml-auto"></span>
        </p>
        <p className='ml-6 rounded-lg    p-2 flex justify-between'>Invasiveness
        
        <span className="ml-auto"></span>
        </p>
    </div>

    <div className="mt-4 bg-white">
        <div className="flex items-center pt-5 ml-6 mb-3">
            <img src={bookIcon} alt="Book" className=" h-6 w-6 " />
            <p className="ml-2 text-xl font-bold text-gray-600">Description</p>
          </div>
        </div>

        <div className="mt-4 bg-white">
        <div className="flex items-center pt-5 ml-6 mb-3">
            <img src={plantCare} alt="Care" className=" h-6 w-6 " />
            <p className="ml-2 text-xl font-bold text-gray-600">Conditions</p>
        </div>

        <div className="flex">
          <div className="bg-gray-50 flex-grow ml-2 rounded-xl">
            <div className="flex items-center pt-3 ml-6 mb-3">
              <img src={temperatureIcon} alt="Temperature" className="h-6 w-6" />
                <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">Temperature</p>
                <p className="text-sm font-bold">{plant.temperature}</p>
                </div>

            </div>
          </div>
          <div className="bg-gray-50 flex-grow ml-2 mr-2 rounded-xl">
            <div className="flex items-center pt-3 ml-6 mb-3">
              <img src={hardinessIcon} alt="Temperature" className="h-6 w-6" />
                <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">Hardiness Zones</p>
                <p className="text-sm font-bold">{plant.hardiness}</p>
                </div>
            </div>
          </div>
        
        </div>
        <div className="flex">
    <div className="bg-gray-50 flex-grow ml-2 mt-4 mr-2 rounded-xl relative">
        <div className="flex items-center pt-3 ml-6 mb-3">
            <img src={sunLightIcon} alt="Sunlight" className="h-6 w-6" />
            <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">Sunlight</p>
                <p className="text-sm font-bold">{plant.sunLight}</p>
            </div>
        </div>
        <img src={rightIcon} alt="Right Icon" className="absolute top-1/2 right-0 transform -translate-y-1/2 h-4 w-4 mr-2" />
    </div>
        </div>
        <div className="flex">
           <div className="bg-gray-50 flex-grow ml-2 mt-4 mr-2 rounded-xl relative">
              <div className="flex items-center pt-3 ml-6 mb-3">
                <img src={soilIcon} alt="Soil" className="h-6 w-6" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">Soil</p>
                <p className="text-sm font-bold">{plant.soil}</p>
              </div>
              </div>
                <img src={rightIcon} alt="Right Icon" className="absolute top-1/2 right-0 transform -translate-y-1/2 h-4 w-4 mr-2"  />
            </div>
        </div>
        <div className="flex">
           <div className="bg-gray-50 flex-grow ml-2 mt-4 mr-2 rounded-xl relative">
              <div className="flex items-center pt-3 ml-6 mb-3">
                <img src={locationIcon} alt="Location" className="h-6 w-6" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-sm font-bold">{plant.location}</p>
              </div>
              </div>
                
            </div>
        </div>


        </div>

 </div>       
</>   
    
    
  
  )  
}

export default Plant
