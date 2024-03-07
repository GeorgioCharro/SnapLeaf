
import { useParams,useNavigate,Link } from "react-router-dom"
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
import propagationIcon from  '../assets/svg/propagationIcon.svg'
import pruningIcon from  '../assets/svg/pruningIcon.svg'
import wateringCanIcon from  '../assets/svg/wateringCanIcon.svg'
import fertilizerIcon from  '../assets/svg/fertilizerIcon.svg'
import repottingIcon from  '../assets/svg/repottingIcon.svg'
import profileCircleIcon from  '../assets/svg/profileCircleIcon.svg'
import chatbotImage from '../assets/png/chatbot.png'
import fruitIcon from  '../assets/svg/fruitIcon.svg'
import maturePlantIcon from  '../assets/svg/maturePlantIcon.svg'
import plantCharact from  '../assets/svg/plantCharact.svg'
import flowerIcon from  '../assets/svg/flowerIcon.svg'
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";



import Spinner from "../components/Spinner"
function Plant() {
    const [fillActive, setFillActive] = useState("tab1")
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

    const handleFillClick = (value) => {
      if (value === fillActive) {
        return;
      }
      setFillActive(value);
    };
  


    if (loading) {
      return <Spinner />
    }

  return (
    <>
    <div className="bg-gray-50">
    <div className="bg-white">
    <div className="flex items-center pt-5 ml-6">
    <img src={plantIconGuide} alt="PlantGuide" className=" h-6 w-6 " />
    <p className="ml-2 text-xl font-bold text-gray-700">Field Guide</p>
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
            <p className="ml-2 text-xl font-bold text-gray-700">Key Facts</p>
        </div>
        <p className='ml-6 rounded-lg bg-gray-50 p-2 mr-2 flex justify-between' >Toxicity 
        
        <span className="ml-auto">{plant.toxicity}</span>
        </p>
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
        <span className="ml-auto">{plant.weed}</span>
        </p>
        <p className='ml-6 rounded-lg    p-2 flex justify-between'>Invasiveness
        
        <span className="ml-auto">{plant.invasiveness}</span>
        </p>
    </div>

    <div className="mt-4  bg-white">
    <div className="flex items-center pt-5 ml-6 mb-3">
            <img src={plantCharact} alt="Charact" className=" h-6 w-6 " />
            <p className="ml-2 text-xl font-bold text-gray-700">Characteristics</p>
          </div>
          
          <div className=" card card-bordered m-4">
      <TETabs fill>
        <TETabsItem color="success"
          onClick={() => handleFillClick("tab1")}
          active={fillActive === "tab1"}
        >
          <div className="flex flex-col items-center justify-center">
          <img src={maturePlantIcon} className="h-8 w-8 mb-2" /> 
          <p className="text-center">Mature Plant</p> 
          </div>
        </TETabsItem>
        <TETabsItem color="success"
          onClick={() => handleFillClick("tab2")}
          active={fillActive === "tab2"}
        >
          <div className="flex flex-col items-center justify-center">
          <img src={flowerIcon} className="h-8 w-8 mb-2" /> 
          <p className="text-center">Flower</p> 
          </div>
          
        </TETabsItem>
        <TETabsItem color="success"
          onClick={() => handleFillClick("tab3")}
          active={fillActive === "tab3"}
        >
          <div className="flex flex-col items-center justify-center">
          <img src={fruitIcon} className="h-8 w-8 mb-2" /> 
          <p className="text-center">Fruit</p> 
          </div>
        </TETabsItem>
        
      </TETabs>

      <TETabsContent>
        <TETabsPane show={fillActive === "tab1"}>
        <p className='ml-6 rounded-lg  p-2 flex justify-between text-gray-500'>Plant Height 
        <span className="ml-auto text-gray-700">{plant.plantHeight}</span> 
        </p>
        <hr className="mt-2 mb-2 ml-6 mr-2"></hr>
        <p className='ml-6 rounded-lg  p-2 flex justify-between text-gray-500'>Spread
        <span className="ml-auto text-gray-700">{plant.spread}</span> 
        </p>
        <hr className="mt-2 mb-2 ml-6 mr-2"></hr>
        <p className='ml-6 rounded-lg  p-2 flex justify-between text-gray-500'>Leaf Color
        <span className="ml-auto text-gray-700">{plant.leafColor}</span> 
        </p>
        <hr className="mt-2 mb-2 ml-6 mr-2"></hr>

        </TETabsPane>
        <TETabsPane show={fillActive === "tab2"}><p className='ml-6 rounded-lg  p-2 flex justify-between text-gray-500'>Bloom Time
        <span className="ml-auto text-gray-700">{plant.bloomTime}</span> 
        </p>
        <hr className="mt-2 mb-2 ml-6 mr-2"></hr>
        <p className='ml-6 rounded-lg  p-2 flex justify-between text-gray-500'>Flower Size
        <span className="ml-auto text-gray-700">{plant.flowerSize}</span> 
        </p>
        <hr className="mt-2 mb-2 ml-6 mr-2"></hr>
        <p className='ml-6 rounded-lg  p-2 flex justify-between text-gray-500'>Flower Color
        <span className="ml-auto text-gray-700">{plant.flowerColor}</span> 
        </p>
        <hr className="mt-2 mb-2 ml-6 mr-2"></hr></TETabsPane>
        <TETabsPane show={fillActive === "tab3"}><p className='ml-6 rounded-lg  p-2 flex justify-between text-gray-500'>Harvest Time
        <span className="ml-auto text-gray-700">{plant.harvestTime}</span> 
        </p>
        <hr className="mt-2 mb-2 ml-6 mr-2"></hr>
        <p className='ml-6 rounded-lg  p-2 flex justify-between text-gray-500'>Fruit Color
        <span className="ml-auto text-gray-700">{plant.fruitColor}</span> 
        </p>
        <hr className="mt-2 mb-2 ml-6 mr-2"></hr>
        </TETabsPane>
        
      </TETabsContent>
    </div>

    </div>

    <div className="mt-4 bg-white">
        <div className="flex items-center pt-5 ml-6 mb-3">
            <img src={bookIcon} alt="Book" className=" h-6 w-6 " />
            <p className="ml-2 text-xl font-bold text-gray-700">Description</p>
          </div>
          <div className="p-4 -mt-3 text-gray-500 flex flex-auto items-center" >
            <p>Cucumber (Cucumis sativus) is a creeping vine
               native to South Asia. It has a long history of
               cultivation mentions of its use are found in
               various ancient scripts, including the Bible, Epic
               of Gilgamesh and Pliny the Elder's "Natura/
               History". Today, cucumber is one of the most
               videly cultivated vegetable species in the world</p>
          </div>
        </div>

        <div className="mt-4 bg-white">
        <div className="flex items-center pt-5 ml-6 mb-3">
            <img src={plantCare} alt="Care" className=" h-6 w-6 " />
            <p className="ml-2 text-xl font-bold text-gray-700">Conditions</p>
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
        <Link to={`PlantSunLight`} ><div className="flex">
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
        </div></Link>
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
           <div className="bg-gray-50 flex-grow ml-2 mt-4 mr-2 mb-4 rounded-xl relative">
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

        <div className="mt-4 bg-white">
        <div className="flex items-center pt-5 ml-6 mb-3">
            <img src={bookIcon} alt="Care" className=" h-6 w-6 " />
            <p className="ml-2 text-xl font-bold text-gray-700">How-tos</p>
        </div>

        <div className="flex justify-center">
  <div className="bg-gray-50 flex-grow ml-2 rounded-xl">
    <div className="flex flex-col items-center pt-3  mb-3">
      <img src={wateringCanIcon} alt="Temperature" className="h-10 w-10" />
      <div className="">
        <p className="text-sm font-medium text-gray-500">Water</p>
      </div>
      <div className="mt-2">
        <button className="btn hover:bg-green-700 bg-green-600 border-green-600 px-5 rounded-3xl text-white py-2">View Frequency</button>
      </div>
    </div>
  </div>
  <div className="bg-gray-50 flex-grow ml-2 mr-2 rounded-xl">
    <div className="flex flex-col items-center pt-3  mb-3">
      <img src={fertilizerIcon} alt="Fertilize" className="h-10 w-10" />
      <div className="">
        <p className="text-sm font-medium text-gray-500">Fertilizer</p>
      </div>
      <div className="mt-2">
        <button className="btn hover:bg-green-700 bg-green-600 border-green-600 px-5 rounded-3xl text-white py-2">View Frequency</button>
      </div>
    </div>
  </div>
</div>
        <div className="flex">
    <div className="bg-gray-50 flex-grow ml-2 mt-4 mr-2 rounded-xl relative">
        <div className="flex items-center pt-3 ml-6 mb-3">
            <img src={pruningIcon} alt="Pruning" className="h-6 w-6" />
            <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">Pruning</p>
                <p className="text-sm font-bold">{plant.sunLight}</p>
            </div>
        </div>
        <img src={rightIcon} alt="Right Icon" className="absolute top-1/2 right-0 transform -translate-y-1/2 h-4 w-4 mr-2" />
    </div>
        </div>
        <div className="flex">
           <div className="bg-gray-50 flex-grow ml-2 mt-4 mr-2 rounded-xl relative">
              <div className="flex items-center pt-3 ml-6 mb-3">
                <img src={propagationIcon} alt="propagation" className="h-6 w-6" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">Propagation</p>
                <p className="text-sm font-bold">{plant.soil}</p>
              </div>
              </div>
                <img src={rightIcon} alt="Right Icon" className="absolute top-1/2 right-0 transform -translate-y-1/2 h-4 w-4 mr-2"  />
            </div>
        </div>
        <div className="flex ">
           <div className="bg-gray-50 flex-grow ml-2 mt-4 mr-2 rounded-xl relative mb-4">
              <div className="flex items-center pt-3 ml-6 mb-3">
                <img src={repottingIcon} alt="repot" className="h-6 w-6" />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-500">Repotting</p>
                <p className="text-sm font-bold">{plant.soil}</p>
              </div>
              </div>
                <img src={rightIcon} alt="Right Icon" className="absolute top-1/2 right-0 transform -translate-y-1/2 h-4 w-4 mr-2"  />
            </div>
        </div>


        </div>

        <div className="mt-4 bg-white">
  <div className="flex items-center pt-5 ml-6 mb-3">
    <img src={profileCircleIcon} alt="profileCircle" className="h-6 w-6" />
    <p className="ml-2 text-xl font-bold text-gray-700">ChatBot Support</p>
  </div>
  <div className="mt-4 ml-6">
    <div className="flex flex-col">
      <div className="flex items-center">
        <img src={chatbotImage} alt="chatbot" className="h-20 w-20 rounded-xl" />
        <div className="ml-4">
          <p className="text-md font-medium text-gray-700">1-on-1 Direct Chat with our ChatBot</p>
          <p className="text-sm text-gray-500 mr-4">Get expert care tips for your plant's specific needs</p>
        </div>
        
      </div>
      
    </div>
    
  </div>
  <div className="pl-4 pr-4">
    <button className="btn btn-white mt-4 font-bold   rounded-xl border-green-600 bg-white text-green-600 w-full ">Ask Chatbot</button>
  </div>
  
</div>

 </div>       
</>   
    
    
  
  )  
}

export default Plant
