import { getAuth,updateProfile } from "firebase/auth"
import {updateDoc,doc} from 'firebase/firestore'
import { db } from "../firebase.config"
import { useState} from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function Profile() {

  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails,setChangeDetails]=useState(false)
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
  const {name,email}=formData

  const onLogout =()=>{
    auth.signOut()
    navigate('/')
  }
  const onSubmit = async ()=>{
    try {
      if(auth.currentUser.displayName !== name){
      await updateProfile(auth.currentUser,{
        displayName:name,
      })

      const userRef= doc(db,'users',auth.currentUser.uid)
      await updateDoc(userRef,{
        name
      })
      toast.success('Successfully updated profile details')
    }
    
    
    } catch (error) {
      toast.error('Could not update profile details')
      console.log(error)
    }
    
  }
  const onChange = (e)=>{

    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value

    }))

  }


  




  return (
    <div className="m-8">
      
        
        <div className="flex justify-between">
        <p className="text-3xl text-gray-700 font-bold ">My Profile</p>
        <button className="btn btn-sm btn-success btn-outline" onClick={onLogout}>Logout</button>
        
        </div>
        
      <div className="mt-8">
        
        <div className="flex justify-between">
          <p className="text-gray-700 font-semibold text-lg">Personal Details</p>
          <button className="text-green-500 font-bold" onClick={()=>{
            changeDetails && onSubmit()
            setChangeDetails((prevState)=>!prevState)}}>

            
            {changeDetails ? 'done':'change'}
          </button>

        </div>

      </div>

      <div className="mt-4">
        
        <p className="font-bold text-gray-700 mb-2 text-sm">Name</p>
        <label className="input input-bordered flex items-center gap-2 border-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="green" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
         <input type="text" className="grow" placeholder="Username" id="name" value={name} onChange={onChange} disabled={!changeDetails} />
        </label>

      </div>

      <div className="mt-4">
        
        <p className="font-bold text-gray-700 mb-2 text-sm">Email</p>
        <label className="input input-bordered border-green-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="green" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input type="text" className="grow" placeholder="Email" id="email" value={email} onChange={onChange} disabled />
        </label>

      </div>
      
      
    
       
    </div>
  )
}

export default Profile
