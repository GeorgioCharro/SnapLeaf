import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import {collection,getDocs,query,where} from 'firebase/firestore'
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import PlantItem from "../components/PlantItem"
import Spinner from "../components/Spinner"
function Category() {
  const params=useParams()
    const [plants,setPlants]=useState(null)
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchPlants = async()=>{
            try {
                const plantsRef=collection(db,'plants')
                const q=query(plantsRef,where('type','==',params.categoryName)
                )
            
                const querySnap = await getDocs(q) 
                
                let plants = []

                querySnap.forEach((doc)=>{
                    return plants.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })

                setPlants(plants)
                setLoading(false)
                console.log(plants)

            } catch (error) {
                toast.error('Could not fetch Listings')
            }

        }
        fetchPlants()
        console.log(params.categoryName)

    },[params.categoryName])

  return (
    <>
    {loading ? <Spinner/>:plants && plants.length > 0 ? 
        <>
            <main>
            <ul className='p-0'>
              {plants.map((plant) => {
                const nameWithoutSpaces = plant.data.name.replace(/\s/g, '');
                return (
              <PlantItem
               plant={plant.data}
              name={nameWithoutSpaces}
              key={plant.id}
      />
    );
  })}
            </ul>
          </main>
        </> 
        
        : <p>No listings for {params.categoryName}</p>}
    
    </>
    
    
  )
}

export default Category
