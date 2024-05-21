import OAuth from '../components/OAuth';

import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db } from "../firebase.config"
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { toast } from 'react-toastify';
function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    expert: false
  });

  const { email, password, name } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
        console.log(error)
      toast.error(' Not Able to Register ')
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
        <label className="text-gray-600 font-bold inline-block pb-2" htmlFor="name">Name</label>
        <input className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" onChange={onChange} id='name' type="text" name="name" value={name} placeholder="Georgio Charro" />
      </div>
      <div>
        <label className="text-gray-600 font-bold inline-block pb-2" htmlFor="email">Email</label>
        <input className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" onChange={onChange} id='email' type="email" name="email" value={email} placeholder="giocharro@hotmail.com" />
      </div>
      <div>
        <label className="text-gray-600 font-bold inline-block pb-2" htmlFor="password">Password</label>
        <input className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" onChange={onChange} id='password' type="password" name="password" value={password} placeholder="******" />
      </div>
      
      <div>
        
        <button className="bg-green-500 hover:bg-green-600 w-full py-2 rounded-md text-white font-bold cursor-pointer " type="submit" onSubmit={onSubmit}>Sign Up</button>
      </div>
      <div>
        <p className="text-center">Or continue with</p>
      </div>
        <OAuth />
       
        
        
    </div>
    <Link to='/sign-up' className=" text-[#45eb77] font-bold registerLink text-sm mt-10">Sign In Instead</Link>
    
  </form></div>
  
</div>
    </>
  );
}

export default SignUp