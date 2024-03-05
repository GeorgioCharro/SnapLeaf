
import { useParams,Navigate, useNavigate } from "react-router-dom"
import sunIconInfo from '../assets/svg/sunIconInfo.svg'
import cloudyIconInfo from '../assets/svg/cloudyIconInfo.svg'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import { useState, useEffect } from 'react'
import flowerNote from '../assets/svg/flowerNote.svg'
import Spinner from "../components/Spinner"
import bulletCircle from '../assets/svg/bulletCircle.svg'

import sunLightPng from '../assets/png/sunLight.png'

import {ReactComponent as LightBulbIcon} from '../assets/svg/lightBulbicon.svg'
function PlantSunlight() {

  const [plant,setPlant]=useState(null)
  const [loading, setLoading] = useState(true)

  const navigate=useNavigate()
  const params = useParams()
  const auth = getAuth()
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
    <div className="bg-gray-50">
      <div className="bg-white">
      <p className="ml-4 text-xl mt-4 font-bold text-gray-700">Sunlight needs</p>
      
      {plant.fullSunCondition &&<div className="mt-4 ml-6">
    <div className="flex flex-col">
      <div className="flex items-center">
        <img src={sunIconInfo} alt="chatbot" className="h-10 w-10 rounded-xl" />
        <div className="ml-4">
          <p className="text-md font-medium text-gray-700">Full Sun</p>
          <p className="text-sm text-gray-500 mr-4">Above 6 hours sunlight</p>
        </div>
        
      </div>
      
    </div>
    
  </div>}
    <div className="mt-4 ml-6 ">
    <div className="flex flex-col">
      <div className="flex items-center">
        <img src={cloudyIconInfo} alt="chatbot" className="h-10 w-10 rounded-xl" />
        <div className="ml-4">
          <p className="text-md font-medium text-gray-700">Partial Sun</p>
          <p className="text-sm text-gray-500 mr-4">About 3-6 hours sunlight</p>
        </div>
        
      </div>
      
    </div>
    
  </div>
  {plant.fullSunCondition &&<div className="mt-4 ml-6 flex items-start">
  <LightBulbIcon className="h-6 w-6 mr-2 inline" fill="yellow" />
  <div>
    <p className="text-xs font-medium text-gray-700 mb-4">
      Watch how sunlight gracefully moves through your garden, and choose spots that provide the perfect balance of light and shade for your plants, ensuring their happiness.
    </p>
  </div>
</div> }


      </div>

      {plant.fullSunCondition &&<div className="mt-4  bg-white">
        <p className="ml-4    text-xl font-bold text-gray-700">Key tips for sunlight</p>
        
        

      <p className="text-gray-600 flex ml-4 mt-4 font-semibold">{plant.keyTipsForSunLight}</p>
      
        <div className="ml-2 mr-2 flex justify-center"> 
        <img src={sunLightPng} alt="Sunlight" className="w-3/4 h-auto object-cover mt-4 ml-2 mr-2 rounded-lg" />
        </div>
        <div className="flex justify-evenly mt-4">
  <div className="flex items-center">
    <div className="w-4 h-4 border border-green-600 rounded-sm bg-green-100 mr-2"></div>
    <p className="text-gray-600 font-semibold">Preferred</p>
  </div>
  <div className="flex items-center">
    <div className="w-4 h-4 border border-yellow-600 bg-yellow-100 rounded-sm mr-2"></div>
    <p className="text-gray-600 font-semibold">Tolerable</p>
  </div>
  <div className="flex items-center">
    <div className="w-4 h-4 border border-pink-600 rounded-sm bg-pink-100 mr-2"></div>
    <p className="text-gray-600 font-semibold">Unsuitable</p>
  </div>
</div>
  <div className="pl-4 pr-4">
  <div className="mt-4 bg-green-50 rounded-lg">
    <div className="flex items-center">
      <div className="p-4">
        <img src={flowerNote} alt="Flower" className="h-8 w-8" />
      </div>
      <div>
        <p className="text-gray-700 font-bold text-lg">Notes</p>
      </div>
    </div>
    <div>
      <p className="text-gray-500 pl-4 pb-4 ">The more sunlight the fruit receives, the more pronounced its flavor becomes</p>
    </div>
  </div>
</div>


      </div>} 

      {plant.fullSunCondition &&
      
      <div className="mt-4 bg-white">
      <p className="ml-4  text-xl font-bold text-gray-700">Signs of sunlight issues</p>
        <div className="flex items-center mt-4">
      <div className="p-4">
        <img src={bulletCircle} alt="bullpoint" className="h-2 w-2" />
      </div>
      <div>
        <p className="text-gray-700 font-bold text-lg">Lack of sunlight</p>
      </div>
    </div>
        <div className="flex ml-4 mt-4">
          <p className="text-gray-500">{plant.lackOfSunlight}</p>
        </div>
        {plant.impactSunLightFlowering&&<div className="p-4">
          <details className="collapse collapse-arrow bg-base-200 rounded-lg">
          <summary className="collapse-title text-xl font-medium">Impact on flowering and fruiting</summary>
          <div className="collapse-content"> 
            <p>{plant.impactSunLightFloweringDescription}</p>
        </div>
        </details>
        </div>}
        


      </div>}
      
      
    </div>
  )
}

export default PlantSunlight

