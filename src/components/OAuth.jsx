
import google from '../assets/png/google.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { doc } from 'firebase/firestore'
import { getDoc,setDoc,serverTimestamp } from 'firebase/firestore'
function OAuth() {
const navigate=useNavigate()
const location=useLocation()
  const onGoogleClick = async()=>{

    try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth,provider)
        const user= result.user

        //Check for User
        const docRef=doc(db,'users',user.uid)
        const docSnap = await getDoc(docRef)
        // If user, doesn't exist, create user
        if(!docSnap.exists()){
            await setDoc(doc(db,'users',user.uid),{
                name:user.displayName,
                email:user.email,
                timestamp:serverTimestamp()
            })
        }
        navigate('/')

    } catch (error) {
        toast.error('Could not authorize with google')
        console.log(error)
    }

}

    
  return (
    <div>
      <hr className="my-6 border-gray-300 w-full" />

    <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
  <div className="flex items-center justify-center" onClick={onGoogleClick}>
    <img src={google}  alt="google" width='24px' height='24px'/>
    <span className="ml-4">
    Sign {location.pathname === '/sign-in' ? 'In' : 'Up'} with Google
    </span>
  </div>
</button>
    </div>
  )
}

export default OAuth
