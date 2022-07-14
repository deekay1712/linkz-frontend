import React from 'react'
import { useRef, useContext } from 'react'
import { loginCall } from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const emailRef = useRef()
    const passwordRef = useRef()
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLoginSubmit = async(e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const res=await loginCall({email, password}, dispatch)
        if(res){
            navigate('/')
        }
        if(res.message==='Verify again'){
            navigate(`/verify/${res.userId}`)
        }
    }
  return (
    <div className='authFormWrapper'>
        <div className='authFormContainer'>
            <div className="authFormContainerLeft">
                <img src={PF+"formImg.jpg"} alt="" />
            </div>
            <div className="authFormContainerRight">
                <form className='authForm' onSubmit={handleLoginSubmit}>
                    {/* <label className='authFormLabel'>Email</label> */}
                    <input className='authFormInput' type='email' placeholder='Email' ref={emailRef} />
                    {/* <label className='authFormLabel'>Password</label> */}
                    <input className='authFormInput' type='password' placeholder='Password' ref={passwordRef} />
                    <button className='authFormButton'>Login</button>
                </form>
                <p>Don't have an account?
                    <Link to='/signup'> Sign Up</Link>
                </p>
                <p>Forget password?
                    <Link to='/forget-password'> Reset</Link>
                </p>
            </div>
        </div>
    </div>
  )
}
