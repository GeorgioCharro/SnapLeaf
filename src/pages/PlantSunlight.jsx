
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
    <div className="bg-gray-50 mb-4">
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
        {plant.impactSunLightLeggyGrowth&&<div className="p-4 -mt-4">
          <details className="collapse collapse-arrow bg-base-200 rounded-lg">
          <summary className="collapse-title text-xl font-medium">Leggy or sparse growth</summary>
          <div className="collapse-content"> 
            <p>{plant.impactSunLightLeggyGrowthDescription}</p>
        </div>
        </details>
        </div>}
        {plant.impactSunLightSlowerGrowth&&<div className="p-4 -mt-4">
          <details className="collapse collapse-arrow bg-base-200 rounded-lg">
          <summary className="collapse-title text-xl font-medium">Slower or no new growth</summary>
          <div className="collapse-content"> 
            <p>{plant.impactSunLightSlowerGrowthDescription}</p>
        </div>
        </details>
        </div>}
        <div>
          <p className="ml-4 text-lg font-bold mt-4 tex-gray-700">Solutions</p>
        

        {plant.sunLightSolution1.length !==0 && <div className="mt-4 flex ml-4 mr-4 text-gray-500">
          <p>{plant.sunLightSolution1}</p>
           </div>} 

         {plant.sunLightSolution2.length !==0 && <div className="mt-4 flex ml-4 mr-4 text-gray-500">
          <p>{plant.sunLightSolution2}</p>
         </div>} 

         <hr className="mt-4 mb-4" />
        </div>

        


           

      </div>}
      
      {plant.excessSunLight && <div className="bg-white">
      
        <div className="flex items-center mt-4">
          <div className="p-4">
            <img src={bulletCircle} alt="bullpoint" className="h-2 w-2 mt-4" />
          </div>
          <div>
            <p className="text-gray-700 font-bold text-lg mt-4">Excess sunlight</p>
          </div>
        </div>

        <div className="flex ml-4 mt-4">
          <p className="text-gray-500">{plant.plantExcessSunlightDescription}</p>
        </div>
        {plant.excessSunLightChloris && <div className="p-4">
          <details className="collapse collapse-arrow bg-base-200 rounded-lg">
          <summary className="collapse-title text-xl font-medium">Chlorosis</summary>
          <div className="collapse-content"> 
            <p>{plant.excessSunLightChlorisDescription}</p>
        </div>
        </details>
        </div>}
        {plant.excessSunLightLeafCurling && <div className="p-4 -mt-4">
          <details className="collapse collapse-arrow bg-base-200 rounded-lg">
          <summary className="collapse-title text-xl font-medium">Leaf Curling</summary>
          <div className="collapse-content"> 
            <p>{plant.excessSunLightLeafCurlingDescription}</p>
        </div>
        </details>
        </div>}
        {plant.excessSunLightLeafScorching && <div className="p-4 -mt-4">
          <details className="collapse collapse-arrow bg-base-200 rounded-lg">
          <summary className="collapse-title text-xl font-medium">Leaf Scorching</summary>
          <div className="collapse-content"> 
            <p>{plant.excessSunLightLeafScorchingDescription}</p>
        </div>
        </details>
        </div>}

        {plant.excessSunLightSunscald && <div className="p-4 -mt-4">
          <details className="collapse collapse-arrow bg-base-200 rounded-lg">
          <summary className="collapse-title text-xl font-medium">Sunscald</summary>
          <div className="collapse-content"> 
            <p>{plant.excessSunLightSunscaldDescription}</p>
        </div>
        </details>
        </div>}

        {plant.excessSunLightWilting && <div className="p-4 -mt-4">
          <details className="collapse collapse-arrow bg-base-200 rounded-lg">
          <summary className="collapse-title text-xl font-medium">Wilting</summary>
          <div className="collapse-content"> 
            <p>{plant.excessSunLightWiltingDescription}</p>
        </div>
        </details>
        </div>}
        <p className="ml-4 text-lg font-bold mt-4 tex-gray-700">Solutions</p>
        <div></div>
        {plant.excessSunLightLeafScorching && <div className="mt-4 flex ml-4 mr-4 text-gray-500">
          <p>1. Ensure plants receive sufficient water to
            prevent dehydration. Watering should be done
            outside of the hottest time period to avoid
            scorching the plants. It is recommended to
            water in the morning and evening</p>
         </div> } 

         {plant.excessSunLightLeafCurling && <div className="mt-4 flex ml-4 mr-4 text-gray-500">
          <p>2. It is advisable to prune any completely
             dehydrated or withered parts</p>
         </div> } 

         {plant.excessSunLightChloris && <div className="mt-4 flex ml-4 mr-4 text-gray-500">
          <p>3. Provide some protection for plants during
            hot weather by using shade nets to filter out a
            portion of sunlight.</p>
         </div> } 

          {(plant.excessSunLightSunscald || plant.excessSunLightWilting) && <div className="mt-4 flex ml-4 mr-4 text-gray-500">
          <p>4. Ensure plants receive sufficient water to
            prevent dehydration. Watering should be done
            outside of the hottest time period to avoid
            scorching the plants. It is recommended to
            water in the morning and evening</p>
         </div> } 
      
      
      </div>}
    </div>
  )
}

export default PlantSunlight

