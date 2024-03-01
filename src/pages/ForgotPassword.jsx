import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { getAuth,sendPasswordResetEmail } from 'firebase/auth'
function ForgotPassword() {
  const [email,setEmail]=useState('')

  const onChange= (e)=>{
    setEmail(e.target.value)
  }

  const onSubmit= async (e)=>{
    e.preventDefault()
    try {
      const auth = getAuth()

      await sendPasswordResetEmail(auth,email)
      toast.success('Email was sent')
      setEmail('')
    } catch (error) {
      toast.error('Could not send reset email')
    }

  }


  return (
    <>
      <div className="bg-[#F9FAFB] h-screen w-screen flex items-center">
  <div className="h-max mx-auto flex flex-col items-center">
    <img className="h-[40px] w-[47px] mb-5" src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600" alt="" />
    <h1 className="text-xl font-bold text-center pb-10">Sign in to your account</h1>
    <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
      
      
      <div>
        <label className="text-gray-600 font-bold inline-block pb-2" htmlFor="email">Email</label>
        <input  onChange={onChange} className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"  id='email' type="email" name="email" placeholder="Enter registered email adress" />
      </div>
      
      
      <div>
        <button onClick={onSubmit} className="bg-[#45eb77] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#45eb77]" type="submit">Send Email </button>
      </div>
      
        
       
        
        
    </div>
    
  </div>
</div>
    </>
  )
}

export default ForgotPassword
