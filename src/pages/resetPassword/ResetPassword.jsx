import React from 'react'
import { useRef, useContext } from 'react'
import { resetPasswordCall } from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        let res
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if (password === confirmPassword) {
            res = await resetPasswordCall({ email, password })
        }
        if (res) {
            alert("Password changed successfully")
            navigate('/login')
        }
        else{
            alert("Password does not match")
        }
    }


  return (
    <div className='authFormWrapper'>
        <div className='authFormContainer'>
            <div className="authFormContainerLeft">
                <img src={PF+"formImg.jpg"} alt="" />
            </div>
            <div className="authFormContainerRight">
                <form className='authForm' onSubmit={handleSubmit}>
                    <input className='authFormInput' type='email' placeholder='Email' ref={emailRef} />
                    <input className='authFormInput' type='password' placeholder='Password' ref={passwordRef} />
                    <input className='authFormInput' type='password' placeholder='Confirm Password' ref={confirmPasswordRef}/>
                    <button className='authFormButton'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}
