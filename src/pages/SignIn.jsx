import OAuth from '../components/OAuth';
import {toast} from 'react-toastify'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate,Link} from 'react-router-dom'
import { useState } from "react"
function SignIn() {
  

  const[formData,setFormData]=useState({

    email:'',
    password:''
  })

  const {email,password}=formData
  const navigate=useNavigate()


  const onChange = (e)=>{

    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value

    }))

  }

  const onSubmit = async(e)=>{
    e.preventDefault()

    try {
      const auth=getAuth()

    const userCredential= await signInWithEmailAndPassword(auth,email,password)

    if(userCredential.user){
      navigate('/')
    }
    } catch (error) {
      toast.error('Bad User Credentials!')
      
    }
    

  }                                                                                                                             





  return (
    <>
      <div className="bg-[#F9FAFB]   flex items-center mb-32">
        
  <div className="h-max mx-auto flex flex-col items-center">
    <form onSubmit={onSubmit} >
    <img className="h-[40px] w-[47px] mb-5" src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600" alt="" />
    <h1 className="text-xl font-bold text-center pb-10">Sign in to your account</h1>
    <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
      
      
      <div>
        <label className="text-gray-600 font-bold inline-block pb-2" htmlFor="email">Email</label>
        <input className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" onChange={onChange} id='email' type="email" name="email" value={email} placeholder="giocharro@hotmail.com" />
      </div>
      <div>
        <label className="text-gray-600 font-bold inline-block pb-2" htmlFor="password">Password</label>
        <input className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" onChange={onChange} id='password' type="password" name="password" value={password} placeholder="******" />
      </div>
      <div className="flex">
        
        <div className="w-1/2">
          <Link to='/forgot-password' className="font-bold text-green-600">Forgot password ?</Link>
        </div>
      </div>
      <div>
        
        <button className="bg-green-500 hover:bg-green-600 w-full py-2 rounded-md text-white font-bold cursor-pointer " type="submit" onSubmit={onSubmit}>Login</button>
      </div>
      <div>
        <p className="text-center">Or continue with</p>
      </div>
        <OAuth />
       
        
        
    </div>
    <Link to='/sign-up' className=" text-[#45eb77] font-bold registerLink text-sm mt-10">Sign Up Instead</Link>
  </form></div>
  
</div>
    </>
  );
}

export default SignIn;