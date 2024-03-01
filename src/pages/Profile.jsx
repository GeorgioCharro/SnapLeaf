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

    }
    } catch (error) {
      toast.error('Could not update profile details')
    }
    
  }
  const onChange = (e)=>{

    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value

    }))

  }


  




  return (
    <div>
      <button type="button" className="" onClick={onLogout}>LogOut</button>
    </div>
  )
}

export default Profile
